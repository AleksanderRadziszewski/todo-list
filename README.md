# 📝✅ "To-Do App" by Python, Fast API Postgre, React
[![Python](https://img.shields.io/badge/python-3.12.3-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/fastapi-0.111.0-green.svg)](https://fastapi.tiangolo.com/)
[![SQLAlchemy](https://img.shields.io/badge/sqlalchemy-2.0.30-c02726.svg)]([https://fastapi.tiangolo.com/](https://www.sqlalchemy.org/))<br>
[![Vite](https://img.shields.io/badge/vite-5.2.11-A750FE.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-18.2.66-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-7.2.0-blue.svg)](https://www.typescriptlang.org/)
[![FramerMotion](https://img.shields.io/badge/framer‐motion-11.2.10-fc0091.svg)]([https://vitejs.dev/](https://www.framer.com/motion/))


This "To-Do" application was developed as an educational project to demonstrate the interaction between a Python/FastAPI backend and a React/TypeScript frontend.
The project provide a simple, functional demo of a to-do application that allows users to add, delete, and mark tasks as complete.
The frontend design is intentionally kept minimal with basic CSS styles to ensure clarity and ease of understanding for educational purposes.

<img src="screenshots/todo-app-v0.1.1.gif" width="100%">


## ⚙️ Technology Stack


### Backend

- **Python** - one of the most promising programming languages for building API services, ranking 1st by [TIOBE](https://www.tiobe.com/tiobe-index/) and [Google Trends](https://trends.google.com/trends/explore?date=now%201-d&geo=RU&q=python,C,Java,JavaScript,Go&hl=en).
- **FastAPI** - a modern, fast, and high-performance web framework for building APIs with Python.
- **uvicorn** - an asynchronous server for running FastAPI applications.
- **PostgreSQL** - a popular relational database.
- **SQLAlchemy** - a Python library for database interaction, providing an abstraction layer between the code and the database.

### Frontend

- **React** - a popular JavaScript library for building user interfaces.
- **TypeScript** - a statically-typed superset of JavaScript.
- **Vite** - a modern build tool for creating and developing web applications with hot-reloading and more.


<br/>

## 🗄️ Database table `tasks`

| Column      | Type                       | Collation | Nullable | Default                          |
|-------------|----------------------------|-----------|----------|----------------------------------|
| `id`        | integer                    |           | not null | nextval('tasks_id_seq'::regclass)|
| `title`     | character varying          |           |          |                                  |
| `completed` | boolean                    |           |          |                                  |
| `createdAt` | timestamp without time zone|           |          | CURRENT_TIMESTAMP                |



#### Indexes

- "tasks_pkey" PRIMARY KEY, btree (id)
- "ix_tasks_id" btree (id)
- "ix_tasks_title" btree (title)



<br/>

## ▶️ Running the Project

### Running the Backend

1.    Create database in [PostgreSQL](https://www.postgresql.org/) and make `.env` file in `backend` directory with your database connection constants:
        ```bash
        DB_HOST=localhost
        DB_USER=todo_user
        DB_PASSWORD=123
        DB_NAME=todo_db
        ```
        *This constants will be used in `models.py` file for connecting to database.*<br>
        *For making `.env` you can simply rename template `.env.example`

3.    Activate the Python virtual environment (if used):
        ```bash
        .\venv\Scripts\activate   # Windows
        source venv/bin/activate  # Unix/macOS
        ```
        *When you finish the development session, you can deactivate the virtual environment using the `deactivate` command in the terminal where the environment was activated. This will return you to the global Python environment.*

2.    Start the server:
        ```bash
            uvicorn main:app --reload
        ```
      *The backend will be running and available at: http://127.0.0.1:8000/*

### Running the Frontend

1. Install dependencies:

        npm install

2. Start the local development server:

        npm run dev

    Or use the command for Vite::

        npx vite


    The frontend will be running and available at: http://127.0.0.1:5173

<br/>

<hr>

## Alternative way to start app
In the root of project directory run:

 -   Windows: start `start.ps1`
     ```
        .\start.ps1
     ```

 -   Linux:
     Make the script executable: `chmod +x start.sh` and then start:
     ```
        .\start.sh
     ```

### Docker Setup

1. Ensure Docker is installed on your system.

2. Build the backend image:
    ```bash
    docker build -f backend/Dockerfile -t todo-app-backend .
    ```

3. Build the frontend image:
    ```bash
    docker build -f frontend/Dockerfile -t todo-app-frontend .
    ```

4. Run the containers:
    ```bash
    docker run -p 8000:8000 --env-file backend/.env todo-app-backend
    docker run -p 5173:5173 todo-app-frontend
    ```

5. Access the application:
    - Backend API: http://localhost:8000
    - Frontend: http://localhost:5173

Alternatively, use Docker Compose for simplified orchestration by creating a `docker-compose.yml` file in the project root.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
