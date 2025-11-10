# 🤖 ExcelAI - Your AI-Powered Excel Assistant

<div align="center">

![ExcelAI Banner](https://img.shields.io/badge/ExcelAI-AI--Powered-217346?style=for-the-badge&logo=microsoftexcel&logoColor=white)

[![Next.js](https://img.shields.io/badge/Next.js-14.0-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Lingz450/ExcelAI?style=social)](https://github.com/Lingz450/ExcelAI/stargazers)

**Excel, but actually friendly.** Type what you need in plain English, upload your file, and let AI handle the complexity.

[🚀 Live Demo](https://excelai.vercel.app) • [📖 Documentation](./QUICK_START.md) • [🎯 Features](#features) • [💡 Examples](#examples)

</div>

---

## ✨ Features

### 🎯 Core Features
- **🗣️ Natural Language Processing** - "Remove duplicates and create pivot by region" - Done!
- **🤖 Multi-AI Integration** - Powered by OpenAI GPT-4, Google Gemini, and more
- **📊 Smart Excel Processing** - Handles .xlsx, .xlsm, .xls files up to 100MB
- **⚡ Real-time Progress Tracking** - See exactly what's happening to your file
- **🔄 One-Click Undo** - Every change is reversible with full audit trail
- **📦 Recipe Gallery** - 22+ pre-built automations for common tasks

### 📚 Formula Database
- **80+ Excel Functions** - Complete reference with examples
- **Real-world Examples** - Practical use cases for each formula
- **Common Pitfalls** - Learn what to avoid
- **Alternative Solutions** - Multiple ways to solve problems

### 🔐 Enterprise Features
- **🔒 End-to-End Encryption** - Your data is always secure
- **👥 OAuth Integration** - Sign in with Google/Microsoft
- **💳 Stripe Payments** - Seamless subscription management
- **📊 Usage Analytics** - Track your automation history
- **🌐 Multi-language Support** - Works globally

### 🎨 User Experience
- **🌓 Dark Mode** - Easy on the eyes
- **📱 Responsive Design** - Works on all devices
- **⚡ Lightning Fast** - Optimized for performance
- **♿ Accessible** - WCAG 2.1 compliant

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/Lingz450/ExcelAI.git
cd ExcelAI

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development servers
npm run dev        # Frontend (http://localhost:3000)
python backend/api.py  # Backend (http://localhost:8000)
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# AI Services
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here

# Authentication (NextAuth.js)
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/excelai

# Stripe (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 💡 Examples

### Example 1: Data Cleaning
```
Input: "Clean all text fields, remove duplicates, and standardize phone numbers to +234 format"
Result: ✅ Cleaned 1,247 cells, removed 23 duplicates, standardized 456 phone numbers
```

### Example 2: Advanced Analysis
```
Input: "Create a pivot table showing sales by region and month, calculate percentage change, and highlight top performers"
Result: ✅ Created pivot table, added 12 calculated fields, applied conditional formatting
```

### Example 3: Data Transformation
```
Input: "Split Full Name into First and Last Name, extract email domains, and create a summary sheet"
Result: ✅ Split 890 names, extracted 890 domains, created summary with charts
```

---

## 📖 Documentation

- **[📍 Start Here](./START_HERE.md)** - Complete getting started guide
- **[⚡ Quick Start](./QUICK_START.md)** - 5-minute setup
- **[🚀 Deployment](./DEPLOYMENT.md)** - Production deployment guide
- **[🏗️ Architecture](./🚀_ENTERPRISE_BLUEPRINT.md)** - System architecture
- **[📚 API Reference](./docs/api-reference.md)** - API documentation
- **[🧪 Testing](./docs/testing.md)** - Testing guide
- **[🤝 Contributing](./CONTRIBUTING.md)** - How to contribute

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Radix UI primitives
- **State Management:** React Hooks + Context API
- **Authentication:** NextAuth.js
- **Payments:** Stripe

### Backend
- **Framework:** FastAPI (Python)
- **Excel Processing:** openpyxl, pandas, xlsxwriter
- **AI Integration:** OpenAI SDK, Google Generative AI
- **Database:** PostgreSQL + Prisma ORM
- **Job Queue:** Bull (Redis-based)
- **File Storage:** Local (dev), S3/R2 (prod)

### DevOps
- **Hosting:** Vercel (Frontend), Railway/Render (Backend)
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry, LogRocket
- **Analytics:** Vercel Analytics

---

## 🎯 Roadmap

### ✅ Completed
- [x] Natural language AI interpreter
- [x] Multi-AI integration (OpenAI, Gemini)
- [x] Formula database (80+ functions)
- [x] Recipe gallery (22+ automations)
- [x] OAuth authentication
- [x] File upload/download
- [x] Progress tracking
- [x] Dark mode

### 🚧 In Progress
- [ ] Real-time collaboration
- [ ] WebAssembly on-device processing
- [ ] Advanced data profiling
- [ ] Version control for workbooks

### 🔮 Future
- [ ] Mobile apps (iOS/Android)
- [ ] Excel add-in
- [ ] API marketplace
- [ ] AI model fine-tuning
- [ ] Enterprise SSO
- [ ] Advanced governance features

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenAI** - GPT-4 API
- **Google** - Gemini AI API
- **Vercel** - Hosting and deployment
- **Next.js Team** - Amazing framework
- **Excel Community** - Inspiration and feedback

---

## 📞 Support

- **📧 Email:** support@excelai.com
- **💬 Discord:** [Join our community](https://discord.gg/excelai)
- **🐛 Issues:** [GitHub Issues](https://github.com/Lingz450/ExcelAI/issues)
- **📖 Docs:** [Documentation](./docs)

---

## 📊 Stats

![GitHub Repo Stars](https://img.shields.io/github/stars/Lingz450/ExcelAI?style=social)
![GitHub Forks](https://img.shields.io/github/forks/Lingz450/ExcelAI?style=social)
![GitHub Issues](https://img.shields.io/github/issues/Lingz450/ExcelAI)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Lingz450/ExcelAI)
![GitHub Last Commit](https://img.shields.io/github/last-commit/Lingz450/ExcelAI)

---

<div align="center">

**Made with ❤️ by [Lingz450](https://github.com/Lingz450)**

⭐ Star us on GitHub — it motivates us a lot!

[Website](https://excelai.com) • [Twitter](https://twitter.com/excelai) • [LinkedIn](https://linkedin.com/company/excelai)

</div>
