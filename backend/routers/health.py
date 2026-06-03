from fastapi import APIRouter, HTTPException
from sqlalchemy import text
import logging

from models import engine

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/health",
    tags=["health"]
)

@router.get("/live")
def live():
    return {
        "status": "healthy"
    }

@router.get("/ready")
def ready():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception as ex:
        logger.exception("Database health check failed")
        
        raise HTTPException(
            status_code=503,
            detail=f"Database unavailable: {str(ex)}"
        )