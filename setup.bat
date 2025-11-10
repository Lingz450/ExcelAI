@echo off
echo ========================================
echo    ExcelAI Setup Script for Windows
echo ========================================
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

echo Node.js found: 
node --version
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed!
    echo Please install Python 3.9+ from https://python.org
    pause
    exit /b 1
)

echo Python found:
python --version
echo.

REM Install Node dependencies
echo Installing Node.js dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install Node.js dependencies
    pause
    exit /b 1
)
echo Node.js dependencies installed successfully!
echo.

REM Install Python dependencies
echo Installing Python dependencies...
cd backend
python -m pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    cd ..
    pause
    exit /b 1
)
cd ..
echo Python dependencies installed successfully!
echo.

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo Creating .env.local file...
    copy .env.example .env.local
    echo Please edit .env.local with your configuration
)

REM Create uploads directory
if not exist uploads (
    echo Creating uploads directory...
    mkdir uploads
)

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Edit .env.local with your configuration
echo   2. Run: npm run dev
echo   3. Open: http://localhost:3000
echo.
echo For detailed setup instructions, see QUICK_START.md
echo.
pause

