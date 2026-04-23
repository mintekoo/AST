

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Logging](#logging)
- [Security](#security)
- [Cookie & JWT Utilities](#cookie--jwt-utilities)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- ✅ Express.js API server
- ✅ Modular route structure (`/api/auth`, `/api/books`, etc.)
- ✅ MySQL database connection via Sequelize ORM
- ✅ Auto database creation with utf8mb4 support
- ✅ JWT-based authentication
- ✅ Cookie utilities for secure session management
- ✅ Helmet, CORS, cookie-parser, and other middlewares for security
- ✅ Winston logging integrated with Morgan for HTTP request logs
- ✅ Prettier + ESLint for consistent code style

---

## Project Structure

```
NodeJs Backend/
├── index.js                  # Entry point
├── package.json
├── .env.example              # Environment variables template
├── src/
│   ├── app.js                # Express app setup
│   ├── server.js             # Server & DB initialization
│   ├── config/
│   │   ├── database.js       # Sequelize + MySQL setup
│   │   └── logger.js         # Winston logger configuration
│   ├── routes/
│   │   ├── mainRoutes.js     # API router
│   │   └── authRoutes.js     # Auth feature routes
│   ├── controllers/          # Controllers for route logic
│   ├── models/               # Sequelize models
│   ├── middlewares/          # Custom middlewares
│   ├── services/             # Service layer logic
│   ├── utils/
│   │   └── cookies.js        # Cookie & JWT utilities
│   └── validations/          # Request validations
├── node_modules/
└── README.md
```

---

## Technologies

- Node.js 22+
- Express.js 5.x
- Sequelize ORM
- MySQL 8+
- JWT (jsonwebtoken)
- Winston & Morgan (logging)
- Helmet & CORS (security)
- cookie-parser

---

## Getting Started

### 1. Clone repository

```bash
git clone https://github.com/yourusername/nodejs-backend.git
cd nodejs-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Update:

- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET` (use a strong secret)
- `PORT` (optional, default 3000)

### 4. Run the server

**Development (with auto reload):**

```bash
npm run dev
```

**Production:**

```bash
npm run start
```

---

## Scripts

| Script                 | Description                     |
| ---------------------- | ------------------------------- |
| `npm run start`        | Start server in production mode |
| `npm run dev`          | Start server with nodemon       |
| `npm run lint`         | Run ESLint checks               |
| `npm run lint:fix`     | Automatically fix lint issues   |
| `npm run format`       | Format code with Prettier       |
| `npm run format:check` | Check code formatting           |

---

## Environment Variables

| Key              | Description                                 |
| ---------------- | ------------------------------------------- |
| `PORT`           | Server port (default 3000)                  |
| `NODE_ENV`       | Environment (`development` or `production`) |
| `DB_HOST`        | MySQL host                                  |
| `DB_USER`        | MySQL username                              |
| `DB_PASSWORD`    | MySQL password                              |
| `DB_NAME`        | MySQL database name                         |
| `JWT_SECRET`     | JWT secret key                              |
| `JWT_EXPIRES_IN` | JWT expiration (`1d`, `7d`, etc.)           |
| `CORS_ORIGIN`    | Allowed CORS origin for frontend            |

---

## API Endpoints

**Base:** `/api`

| Endpoint           | Method | Description                     |
| ------------------ | ------ | ------------------------------- |
| `/health`          | GET    | Health check                    |
| `/auth/register`   | POST   | Register a new user             |
| `/auth/login`      | POST   | Login user, return JWT & cookie |
| `/auth/logout`     | POST   | Logout user (clear cookie)      |
| `/books` (example) | GET    | Fetch all books                 |

> Note: You can add feature-specific routes in `/src/routes/` and mount them in `mainRoutes.js`.

---

## Logging

- **Winston** handles application logs
- **Morgan** logs HTTP requests and streams to Winston
- Logs can be configured to save in `/logs` folder

---

## Security

- `helmet()` for HTTP headers security
- `cors()` to control frontend access
- `cookie-parser` for cookie management
- JWT authentication with secure, httpOnly cookies

---

## Cookie & JWT Utilities

```js
import { cookies, jwttoken } from '#utils/cookies.js';

// Set cookie
cookies.set(res, 'token', jwttoken.sign({ userId: 1 }));

// Read cookie
const token = cookies.get(req, 'token');

// Clear cookie
cookies.clear(res, 'token');
```

---

## Contributing

1. Fork repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Feature: add something"`)
4. Push (`git push origin feature-name`)
5. Open a Pull Request

---

## License

MIT License © 2026 Minte Backend

---
