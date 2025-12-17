# Garden Manager Monorepo

A full-stack garden management application with a React Native/Expo mobile app and a NestJS backend.

## 📱 Mobile App (`@garden-manager/mobile`)

A cross-platform mobile application built with Expo, React Native, and NativeWind.

### Key Features
- **Expo Router** for file-based routing
- **Internationalization** with Lingui.js and AI-powered translation via `po-missing`
- **Type-safe API** with OpenAPI client generation
- **UI Components** from `@rn-primitives` library
- **State Management** with TanStack Query
- **Form Handling** with React Hook Form + Zod validation
- **Styling** with NativeWind (Tailwind CSS for React Native)

### Prerequisites
- Node.js 18+ and pnpm
- Expo CLI (`npm install -g expo-cli`)
- iOS: Xcode 15+ (for iOS development)
- Android: Android Studio (for Android development)
- **Required External Tool**: `po-missing` for AI-powered translation management

### ⚙️ Installing `po-missing`
The mobile app's i18n workflow depends on the Rust tool `po-missing` from the repository [elcoosp/po-missing](https://github.com/elcoosp/po-missing). You must install it using Cargo.

**Prerequisites**: Ensure you have [Rust and Cargo](https://www.rust-lang.org/tools/install) installed on your system.

**Installation**:
```bash
git clone https://github.com/elcoosp/po-missing
cd po-missing
cargo install --path .
```

### Available Scripts
```bash
# Development
pnpm dev          # Start Expo development server
pnpm android      # Android emulator
pnpm ios          # iOS simulator
pnpm web          # Web version

# TypeScript
pnpm type-check   # Type check without emitting

# API
pnpm openapi:gen  # Generate TypeScript types from OpenAPI spec

# Internationalization
pnpm i18n:extract # Extract messages from source code
pnpm i18n:compile # Compile translation catalogs
pnpm i18n         # Full i18n workflow (extract + AI translate + compile)

# Maintenance
pnpm clean        # Clean node_modules and .expo
```

### I18N Workflow
The project uses an AI-powered translation pipeline:
1. **Extract**: Pull translatable strings from source code
2. **AI Translate**: Uses `po-missing` with Qwen3-Coder model to generate translations
3. **Compile**: Convert `.po` files to runtime-optimized format

## 🖥️ Backend (`@garden-manager/backend`)

A NestJS REST API with SQLite database, JWT authentication, and OpenAPI documentation.

### Key Features
- **NestJS Framework** with TypeScript
- **SQLite Database** with TypeORM
- **JWT Authentication** with Passport
- **OpenAPI/Swagger** documentation
- **Ollama Integration** for AI features
- **Validation** with class-validator

### Available Scripts
```bash
# Development
pnpm start:dev    # Development mode with watch
pnpm start:debug  # Debug mode

# Building
pnpm build        # Compile TypeScript
pnpm start:prod   # Run production build

# Testing
pnpm test         # Run unit tests
pnpm test:e2e     # Run end-to-end tests
pnpm test:cov     # Test coverage

# Code Quality
pnpm lint         # ESLint with auto-fix
pnpm format       # Prettier formatting
```

## 🏗️ Project Structure

```
garden-manager/
├── apps/
│   ├── mobile/          # Expo React Native app
│   │   ├── app/         # Expo Router pages
│   │   ├── components/  # React components
│   │   ├── lib/         # Utilities, API client, i18n
│   │   └── locales/     # Translation files
│   └── backend/         # NestJS API
│       ├── src/         # Source code
│       ├── test/        # Tests
│       └── swagger/     # OpenAPI specification
├── packages/            # Shared packages (if any)
├── package.json         # Root package.json
└── README.md           # This file
```

## 🚀 Getting Started

### 1. Clone and Install
```bash
git clone <repository-url>
cd garden-manager
pnpm install
```

### 2. Set Up Mobile App
```bash
cd apps/mobile

# Install external i18n tool
pip install po-missing

# Start development
pnpm dev
```

### 3. Set Up Backend
```bash
cd apps/backend

# Start database and API
pnpm start:dev
```

### 4. Environment Configuration
Create necessary `.env` files in each app directory. See `.env.example` files for required variables.

## 📦 Dependencies

### Mobile App Highlights
- **Expo 54** with React Native 0.81
- **NativeWind 4** for Tailwind CSS styling
- **@rn-primitives** for unstyled UI primitives
- **Lingui.js 5** for internationalization
- **TanStack Query 5** for data fetching

### Backend Highlights
- **NestJS 11** with Express
- **TypeORM 0.3** with SQLite
- **Ollama 0.6** for local AI models
- **Passport JWT** for authentication

## 🔧 Development Notes

### Code Quality
- TypeScript strict mode enabled
- ESLint and Prettier configured
- Husky git hooks (if configured)

### Database
The backend uses SQLite for simplicity. Migrations are handled by TypeORM synchronize in development (configure for production).

### AI Integration
- Mobile: Uses `po-missing` with Qwen3-Coder model for translations
- Backend: Integrates with Ollama for garden management AI features

## 📄 License

UNLICENSED - Proprietary software
