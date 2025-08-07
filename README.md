# Pratik Adhau - Software Engineer Portfolio

[![Portfolio CI/CD](https://github.com/pratik11a/pratik11a/actions/workflows/portfolio-ci.yml/badge.svg)](https://github.com/pratik11a/pratik11a/actions/workflows/portfolio-ci.yml)
[![Tests](https://github.com/pratik11a/pratik11a/actions/workflows/test.yml/badge.svg)](https://github.com/pratik11a/pratik11a/actions/workflows/test.yml)
[![Test Coverage](https://img.shields.io/badge/test%20coverage-100%25-brightgreen)](./tests/)

## 🚀 Personal Portfolio Website

A responsive, modern portfolio website showcasing my experience as a versatile Software Engineer with expertise in distributed systems, microservices architecture, and full-stack development.

### 🌟 Features

- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **⚡ Component-Based Architecture** - Modular JavaScript components for maintainability
- **🎨 Modern UI/UX** - Clean, professional design with smooth interactions
- **♿ Accessibility First** - ARIA labels, semantic HTML, and screen reader support
- **🧪 Comprehensive Testing** - Unit tests with custom testing framework
- **🔄 CI/CD Pipeline** - Automated testing and validation on every commit

### 🛠 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Testing:** Custom lightweight test framework
- **CI/CD:** GitHub Actions
- **Deployment:** Static hosting ready (GitHub Pages, Netlify, Vercel)

### 🏗 Architecture

```
portfolio/
├── assets/
│   ├── css/           # Stylesheets with mobile-first design
│   ├── html/          # Component templates and sections
│   ├── js/            # JavaScript modules and utilities
│   └── images/        # Profile pictures and assets
├── tests/             # Unit tests and testing framework
├── .github/           # CI/CD workflows and automation
└── index.html         # Main entry point
```

### 🧪 Testing

The portfolio includes a comprehensive test suite with **100% pass rate**:

- **12 Unit Tests** covering the CompanyComponent class
- **Custom Test Framework** with describe/it/expect patterns
- **Edge Case Testing** for error handling and data validation
- **Mocking** for external dependencies (fetch API, console methods)

```bash
# Run tests locally
npm test

# Watch mode for development
npm run test:watch

# CI pipeline tests
npm run ci
```

### 📊 Test Coverage

| Component | Tests | Coverage |
|-----------|-------|----------|
| CompanyComponent | 12 | 100% |
| Constructor | 2 | ✅ |
| Template Loading | 2 | ✅ |
| Data Rendering | 4 | ✅ |
| Error Handling | 2 | ✅ |
| Integration | 2 | ✅ |

### 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/pratik11a/pratik11a.git
cd pratik11a

# Install dependencies (for testing)
npm install

# Run tests
npm test

# Start local development server
npm run serve:dev
# Visit http://localhost:8000
```

### 🔧 Development

```bash
# Validate all JavaScript files
npm run validate:js

# Run full validation suite
npm run validate

# CI pipeline simulation
npm run ci
```

### 📱 Responsive Features

- **Mobile-First Design** with breakpoints at 600px
- **Flexible Header Layout** with right-aligned contact info on mobile
- **Collapsible Experience Sections** for better mobile UX
- **Optimized Typography** and spacing for different screen sizes

### 🎯 Key Sections

1. **Profile** - Professional summary highlighting distributed systems expertise
2. **Experience** - Expandable job history with company details
3. **Domains** - Industry expertise (Payments, Tax, Telecom, Advertisement)
4. **Skills** - Technical proficiencies with organized categories
5. **Education** - Academic background
6. **Projects** - Notable work and contributions

### 🌐 Domain Expertise

- **Payments:** PPRO, NI, Lavego - Digital payment systems, fintech solutions
- **Tax:** HMR, State of Guernsey - Tax calculation, compliance software
- **Telecom:** O2 - Telecommunications systems, network infrastructure
- **Advertisement:** Clearchannel - Ad tech platforms, programmatic advertising
- **Manufacturing:** John Deere - Industrial systems, IoT applications

### 📈 CI/CD Pipeline

The portfolio uses GitHub Actions for:

- **Automated Testing** - Unit tests on every push/PR
- **Code Validation** - JavaScript syntax and structure checks
- **Accessibility Testing** - ARIA compliance and semantic HTML validation
- **Security Scanning** - Basic security audit for dependencies
- **Multi-Node Testing** - Compatibility testing across Node.js versions

### 🤝 Contact

- **Email:** [Your Email]
- **GitHub:** [@pratik11a](https://github.com/pratik11a)
- **LinkedIn:** [Your LinkedIn Profile]

---

⭐ **Star this repo if you find it helpful!**

Built with ❤️ and modern web technologies. This portfolio demonstrates clean code practices, comprehensive testing, and professional development workflows.
