import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import router as tasks_router
from azure.monitor.opentelemetry import configure_azure_monitor
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

print("AI CONNECTION:", os.getenv("APPLICATIONINSIGHTS_CONNECTION_STRING"))

configure_azure_monitor(
    connection_string=os.environ["APPLICATIONINSIGHTS_CONNECTION_STRING"]
)

app = FastAPI()
FastAPIInstrumentor.instrument_app(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router)


@app.get("/")
def read_root() -> dict:
    return {
        "message": "Welcome to the To-Do App API",
        "version": "v0.1.2-beta",
        "endpoints": {
            "/tasks": "Retrieve all tasks",
            "/tasks/{id}": "Retrieve, update, or delete a specific task by ID",
            "/tasks/reorder": "Reorder tasks",
            "/tasks/{task_id}/title": "Update task title"
        },
        "documentation": "https://github.com/e-Nicko/todo-app"
    }
