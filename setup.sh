#!/bin/bash

echo "========================================"
echo "   ExcelAI Setup Script for Unix/Mac"
echo "========================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "Node.js found:"
node --version
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python is not installed!"
    echo "Please install Python 3.9+ from https://python.org"
    exit 1
fi

echo "Python found:"
python3 --version
echo ""

# Install Node dependencies
echo "Installing Node.js dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Node.js dependencies"
    exit 1
fi
echo "Node.js dependencies installed successfully!"
echo ""

# Install Python dependencies
echo "Installing Python dependencies..."
cd backend
python3 -m pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Python dependencies"
    cd ..
    exit 1
fi
cd ..
echo "Python dependencies installed successfully!"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    cp .env.example .env.local
    echo "Please edit .env.local with your configuration"
fi

# Create uploads directory
if [ ! -d uploads ]; then
    echo "Creating uploads directory..."
    mkdir uploads
fi

echo ""
echo "========================================"
echo "    Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "  1. Edit .env.local with your configuration"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:3000"
echo ""
echo "For detailed setup instructions, see QUICK_START.md"
echo ""

