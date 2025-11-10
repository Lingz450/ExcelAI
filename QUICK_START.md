# Quick Start Guide

Get ExcelAI running on your local machine in 5 minutes.

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- npm or yarn
- Python 3.9+ ([Download](https://python.org))

## Step-by-Step Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/excelai.git
cd excelai

# Install dependencies
npm install
```

### 2. Set Up Python Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

cd ..
```

### 3. Configure Environment

```bash
# Copy environment example
cp .env.example .env.local
```

Edit `.env.local` (minimal config for local dev):
```env
# Just need this for local development
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-dev-secret-key-change-in-production"
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## What's Working Out of the Box

✅ **Home Page** - Beautiful landing page with features
✅ **Workspace** - File upload and command input (UI only)
✅ **Formula Atlas** - Browse 50+ Excel formulas with examples
✅ **Recipe Gallery** - 12+ pre-built Excel automation recipes
✅ **Dark/Light Mode** - Automatic theme switching

## What Needs Setup (Optional)

For full functionality, configure:

### Database (PostgreSQL)
```bash
# Install and start PostgreSQL
# Then update .env.local:
DATABASE_URL="postgresql://user:password@localhost:5432/excelai"
```

### OpenAI Integration (for AI features)
```env
OPENAI_API_KEY="your-api-key"
```

### OAuth Providers (for authentication)
```env
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

## Testing the App

### 1. Browse Formulas
- Go to `/formulas`
- Search for "XLOOKUP"
- Click to see detailed examples

### 2. Explore Recipes
- Go to `/recipes`
- Filter by category
- Click "Use This Recipe"

### 3. Try the Workspace (UI Demo)
- Go to `/workspace`
- Upload a test Excel file
- Type a command like "Remove duplicates and clean data"
- See the execution plan (mock data for now)

## Next Steps

### Connect Backend Processing

The Python backend in `/backend/excel_processor.py` is ready but needs integration:

1. **Option A: FastAPI Server**
```bash
cd backend
pip install fastapi uvicorn
uvicorn api:app --reload
```

2. **Option B: Direct Python Calls**
Update Next.js API routes to call Python scripts directly

### Add Database

1. Install Prisma
```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

2. Update schema (see DEPLOYMENT.md)
3. Run migrations
```bash
npx prisma migrate dev
```

### Enable Authentication

1. Get OAuth credentials
   - [Google Console](https://console.cloud.google.com)
   - [Microsoft Azure](https://portal.azure.com)

2. Update `.env.local` with your credentials

3. Authentication will work automatically

## Common Issues

### Port 3000 in Use
```bash
# Kill the process
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Python Import Errors
```bash
# Make sure virtual environment is activated
# Then reinstall dependencies
pip install -r backend/requirements.txt
```

## Project Structure Quick Reference

```
excelai/
├── app/                    # Next.js pages
│   ├── page.tsx           # Home (landing)
│   ├── workspace/         # Main workspace
│   ├── formulas/          # Formula atlas
│   └── recipes/           # Recipe gallery
├── components/            # React components
├── lib/                   # Data and utilities
├── backend/               # Python Excel processor
└── public/               # Static files
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Getting Help

- 📖 [Full Documentation](README.md)
- 🚀 [Deployment Guide](DEPLOYMENT.md)
- 🤝 [Contributing Guide](CONTRIBUTING.md)
- 💬 [Discord Community](https://discord.gg/excelai)

## What to Build Next

Some ideas:
1. Connect the Python backend to API routes
2. Add actual file processing
3. Integrate OpenAI for smart request parsing
4. Build user authentication flow
5. Create job queue system
6. Add file storage (S3 or local)

Happy coding! 🎉

