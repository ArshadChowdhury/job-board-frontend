# JobHub – Frontend

This is the frontend of the JobHub application built with **Next.js** and **Tailwind CSS**. It interacts with a NestJS backend and is deployed via **Vercel CI/CD**.

---

## 🧰 Tech Stack

- Next.js 15
- Tailwind CSS
- TypeScript
- pnpm
- Vercel (for deployment)

---

## ⚙️ Getting Started

### 📦 Prerequisites

- Node.js v18+
- pnpm (install via `npm i -g pnpm`)

### 🛠 Installation

```bash
pnpm install
```

setup environmental variable for backend from .env.example (if you're running the backend of this project locally as well) - 

```
NEXT_PUBLIC_API_URL=http://localhost:3300/api/v1
```

for development server -

```
pnpm dev
```

Then visit - http://localhost:3000/ to see the JobHub app !!

For Production - 

Deployment :
Deployment is handled by Vercel.

CI/CD Pipeline - 
Push to main branch triggers a deployment.
You can also trigger deployments manually from the Vercel dashboard.

