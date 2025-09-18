# 🚗 Station Service System

## 📖 Description
**Station Service System** is a web application designed to manage the fuel purchases of each customer at a gas station.  
It also includes a dashboard section for authorized staff to view statistics and sales information.

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository
```
git clone https://github.com/your-username/station-service-system.git
cd station-service-system
```
### 2. Create environment files
You need three `.env` files:

* **Backend** (`/backend/.env`) → contains database credentials and the JWT secret:
    ```
    DB_HOST=db
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=servicestationdb
    DB_PORT=3306
    JWT_SECRET=your_jwt_secret
    ```

* **Frontend** (`/frontend/.env`) → defines the API endpoint:
    ```
    VITE_API_URL=http://localhost:3000/server
    ```

* **Database** (`.env` at the project root) → used by Docker Compose:
    ```
    DB_ROOT_PASSWORD=yourpassword
    DB_NAME=servicestationdb
    DB_USER=root
    DB_PASSWORD=yourpassword
    ```
⚠️ **Make sure the passwords and database names match across all `.env` files.**

---

### 3. Run the system with Docker
From the root folder, start the containers:

```bash
docker compose up --build
