import os
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
from dotenv import load_dotenv
from typing import Generator
from sqlalchemy.orm import DeclarativeBase

load_dotenv()

POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "localhost")
POSTGRES_USER: str = os.getenv("POSTGRES_USER", "user")
POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "password")
POSTGRES_DB: str = os.getenv("POSTGRES_DB", "database")

DATABASE_URL: str = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DB}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    completed = Column(Boolean, default=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    position = Column(Integer)

# Create the tables in the database
Base.metadata.create_all(bind=engine)

def get_db() -> Generator[Session, None, None]:
    """
    Dependency to get the database session.

    Yields:
        db (Session): Database session.
    """
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
