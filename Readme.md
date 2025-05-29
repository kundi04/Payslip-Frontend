# Payslip Distribution System

A modern web application built with React + Vite for managing and distributing employee payslips with role-based access control.

## Features

### Admin Dashboard
- Complete employee management system
- Employee data visualization
- Access control management
- System settings configuration
- Interactive data tables with sorting and filtering

### Employee Dashboard
- View and download monthly payslips
- Personal account management 
- Secure authentication system
- Password management
- Profile settings

### Super User Dashboard
- System-wide access control
- User role management
- System health monitoring
- Database administration
- Configuration management

## Tech Stack
- React 19
- Vite 6
- React Bootstrap 2.10
- React Router 7
- TsParticles
- Lucide React Icons
- Framer Motion
- React Hot Toast
- Axios

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

## Project Structure
```
src/
├── api/
│   └── api.js              # API configuration and services
├── components/
│   ├── ArrowAnimation.jsx
│   ├── Background.jsx
│   ├── EmployeeSidebar.jsx
│   ├── Layout.jsx
│   ├── Logout.jsx
│   ├── Navbar.jsx
│   ├── PageWrapper.jsx
│   ├── Particles.jsx
│   ├── Sidebar.jsx
│   └── SuperUserSidebar.jsx
├── pages/
│   ├── AdminDashboard.jsx
│   ├── AdminSettings.jsx
│   ├── EmployeeDashboard.jsx
│   ├── Employees.jsx
│   ├── ForgotPassword.jsx
│   ├── Login.jsx
│   ├── Settings.jsx
│   ├── SuperUser.jsx
│   └── UserSettings.jsx
└── App.jsx
```

## Authentication

The system supports three user roles:
- Super User: Complete system access
- Admin: Employee and payslip management
- Employee: Personal payslip access

## Features in Development
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile responsive design
- [ ] Automated payslip generation
- [ ] Email notifications
- [ ] Audit logging
```