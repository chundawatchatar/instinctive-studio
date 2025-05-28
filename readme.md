# Instinctive Studio B2B Marketplace (MERN)

A modern full-stack B2B marketplace prototype built with the MERN stack. Features dynamic category-specific attributes, a smart filterable search API with pagination, and a beautiful, responsive Next.js frontend.

---

## Project Structure - Monorepo using pnpm workspaces

```
├── apps/                  # apps
│   ├── api/               # API routes
│   ├── web/               # web app
├── packages/              # other packages
├── scripts/               # Database seeding scripts
└── .gitignore             # gitignore
└── docker-compose.yml     # Docker services
└── package.json           # Docker services
└── pnpm-workspace.yaml    # pnpm workspaces
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [PNPM](https://pnpm.io/) (v10+)
- [Docker + Docker Compose](https://www.docker.com/)

---

## 🚀 Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/chundawatchatar/instinctive-studio.git
cd instinctive-studio
```

### 2. Install dependencies
```sh
pnpm install
```

### 3. Setup environment variables
Copy the example env files and update as needed:
```sh
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

### 4. Run the project
Start everything (frontend, backend, MongoDB) with:
```sh
pnpm dev
```

This will:
- Spin up MongoDB and Mongo Express using Docker
- Run backend (apps/api)
- Run frontend (apps/web)

Visit the app at: [http://localhost:3000](http://localhost:3000)

---

## 📬 API Overview

The backend provides a paginated, filterable `/api/v1/search` endpoint supporting:
- `q`: Search query
- `category`: Category slug
- `filters`: Encoded JSON object of selected filters
- `page`: Page number
- `limit`: Results per page

**Example:**
```
GET /api/v1/search?q=electronics&category=laptop&filters=%7B%22brand%22%3A%5B%22Dell%22%5D%7D&page=1&limit=10
```

---

## 🧰 Dev Improvements & Suggestions

- ✅ Monorepo using PNPM Workspaces
- ✅ Common tsconfig
- ✅ Pre-configured ESLint + Prettier
- ✅ Pre-commit hook with lint-staged + husky
- ✅ Environment isolation per app

---

## 📄 License

MIT

---

*Let me know if you want it adjusted for a private repo, test instructions, or deployment!*