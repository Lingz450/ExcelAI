"""
FastAPI Server for Excel Processing
Connects the Python Excel engine to the Next.js frontend
"""

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from excel_processor import ExcelProcessor, ActionPlanner
from typing import List, Dict, Any
import os
import json
import uuid
from datetime import datetime, timedelta
import shutil

app = FastAPI(title="ExcelAI Processing API", version="1.0.0")

# CORS middleware for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# File storage configuration
UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB

# Ensure directories exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)


@app.get("/")
async def root():
    return {
        "service": "ExcelAI Processing API",
        "status": "running",
        "version": "1.0.0",
        "endpoints": {
            "upload": "/api/upload",
            "process": "/api/process",
            "preview": "/api/preview",
            "download": "/api/download/{job_id}",
        },
    }


@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload an Excel file and return file metadata
    """
    try:
        # Validate file type
        if not file.filename.endswith(('.xlsx', '.xlsm', '.xls')):
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Only .xlsx, .xlsm, and .xls files are allowed."
            )
        
        # Generate unique file ID
        file_id = str(uuid.uuid4())
        file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Get file size
        file_size = os.path.getsize(file_path)
        
        if file_size > MAX_FILE_SIZE:
            os.remove(file_path)
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Maximum size is {MAX_FILE_SIZE / (1024*1024)}MB."
            )
        
        # Get basic file info
        try:
            processor = ExcelProcessor(file_path)
            metadata = {
                "sheets": processor.workbook.sheetnames,
                "sheetCount": len(processor.workbook.sheetnames),
            }
        except Exception as e:
            metadata = {}
        
        return {
            "success": True,
            "fileId": file_id,
            "filename": file.filename,
            "fileSize": file_size,
            "storagePath": file_path,
            "metadata": metadata,
            "uploadedAt": datetime.now().isoformat(),
            "expiresAt": (datetime.now() + timedelta(hours=24)).isoformat(),
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@app.post("/api/preview")
async def preview_file(file_id: str = Form(...)):
    """
    Generate a preview of the first 10 rows of each sheet
    """
    try:
        # Find file
        file_path = None
        for filename in os.listdir(UPLOAD_DIR):
            if filename.startswith(file_id):
                file_path = os.path.join(UPLOAD_DIR, filename)
                break
        
        if not file_path:
            raise HTTPException(status_code=404, detail="File not found")
        
        # Load workbook
        processor = ExcelProcessor(file_path)
        
        # Get preview data for first sheet
        sheet = processor.workbook[processor.workbook.sheetnames[0]]
        
        # Extract headers
        headers = []
        for cell in list(sheet.iter_rows(min_row=1, max_row=1, values_only=True))[0]:
            headers.append(str(cell) if cell else "")
        
        # Extract first 10 rows
        rows = []
        for row in list(sheet.iter_rows(min_row=2, max_row=11, values_only=True)):
            rows.append([str(cell) if cell is not None else "" for cell in row])
        
        # Detect data quality issues
        issues = []
        
        # Check for blank headers
        if "" in headers:
            issues.append(f"{headers.count('')} blank column headers")
        
        # Count rows
        total_rows = sheet.max_row - 1  # Exclude header
        
        return {
            "success": True,
            "preview": {
                "sheets": processor.workbook.sheetnames,
                "activeSheet": processor.workbook.sheetnames[0],
                "headers": headers,
                "rows": rows,
                "totalRows": total_rows,
                "totalColumns": sheet.max_column,
                "issues": issues,
            },
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Preview failed: {str(e)}")


@app.post("/api/process")
async def process_file(
    file_id: str = Form(...),
    request_text: str = Form(...),
):
    """
    Process an Excel file based on natural language request
    """
    try:
        # Find uploaded file
        file_path = None
        for filename in os.listdir(UPLOAD_DIR):
            if filename.startswith(file_id):
                file_path = os.path.join(UPLOAD_DIR, filename)
                break
        
        if not file_path:
            raise HTTPException(status_code=404, detail="File not found")
        
        # Parse request into action plan
        plan = ActionPlanner.parse_request(request_text)
        
        if not plan:
            raise HTTPException(
                status_code=400,
                detail="Could not understand your request. Please be more specific."
            )
        
        # Execute plan
        processor = ExcelProcessor(file_path)
        start_time = datetime.now()
        
        results = processor.execute_plan(plan)
        
        # Save output
        job_id = str(uuid.uuid4())
        output_filename = f"{job_id}_output.xlsx"
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        processor.save(output_path)
        
        execution_time = (datetime.now() - start_time).total_seconds() * 1000
        
        # Get diff summary
        diff_summary = processor.get_diff_summary()
        
        return {
            "success": True,
            "jobId": job_id,
            "status": "completed" if results["success"] else "failed",
            "plan": plan,
            "results": results,
            "diffSummary": diff_summary,
            "outputPath": output_path,
            "executionTimeMs": int(execution_time),
            "completedAt": datetime.now().isoformat(),
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")


@app.get("/api/download/{job_id}")
async def download_result(job_id: str):
    """
    Download processed Excel file
    """
    try:
        output_filename = f"{job_id}_output.xlsx"
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        
        if not os.path.exists(output_path):
            raise HTTPException(status_code=404, detail="Result file not found")
        
        return FileResponse(
            path=output_path,
            filename=output_filename,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Download failed: {str(e)}")


@app.post("/api/parse")
async def parse_request(request_text: str = Form(...)):
    """
    Parse natural language request into action plan
    (for preview before execution)
    """
    try:
        plan = ActionPlanner.parse_request(request_text)
        
        return {
            "success": True,
            "plan": plan,
            "summary": f"Will perform {len(plan)} action(s)",
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Parse failed: {str(e)}")


@app.delete("/api/cleanup")
async def cleanup_old_files():
    """
    Clean up expired files (run periodically with cron)
    """
    try:
        now = datetime.now()
        deleted_count = 0
        
        # Clean uploads older than 24 hours
        for filename in os.listdir(UPLOAD_DIR):
            file_path = os.path.join(UPLOAD_DIR, filename)
            file_age = now - datetime.fromtimestamp(os.path.getctime(file_path))
            
            if file_age.total_seconds() > 24 * 3600:  # 24 hours
                os.remove(file_path)
                deleted_count += 1
        
        # Clean outputs older than 48 hours
        for filename in os.listdir(OUTPUT_DIR):
            file_path = os.path.join(OUTPUT_DIR, filename)
            file_age = now - datetime.fromtimestamp(os.path.getctime(file_path))
            
            if file_age.total_seconds() > 48 * 3600:  # 48 hours
                os.remove(file_path)
                deleted_count += 1
        
        return {
            "success": True,
            "deletedFiles": deleted_count,
            "timestamp": now.isoformat(),
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cleanup failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

