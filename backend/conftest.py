import os
import sys
from unittest.mock import MagicMock, patch
from dotenv import load_dotenv

import pytest


# Set environment variables EARLY
os.environ["DATABASE_URL"] = "sqlite:///test.db"
os.environ["APPLICATIONINSIGHTS_CONNECTION_STRING"] = "InstrumentationKey=test-key"
os.environ["POSTGRES_HOST"] = "localhost"
os.environ["POSTGRES_USER"] = "test_user"
os.environ["POSTGRES_PASSWORD"] = "test_password"  
os.environ["POSTGRES_DB"] = "test_db"
os.environ["POSTGRES_PORT"] = "5432"

# Mock Azure and OpenTelemetry modules BEFORE any imports
sys.modules['azure'] = MagicMock()
sys.modules['azure.monitor'] = MagicMock()
sys.modules['azure.monitor.opentelemetry'] = MagicMock()
sys.modules['opentelemetry'] = MagicMock()
sys.modules['opentelemetry.instrumentation'] = MagicMock()
sys.modules['opentelemetry.instrumentation.fastapi'] = MagicMock()


@pytest.fixture(scope="session", autouse=True)
def setup_test_environment():
    """Set up test environment before running tests"""
    yield


@pytest.fixture
def mock_env_vars(monkeypatch):
    """Mock environment variables for each test"""
    monkeypatch.setenv("APPLICATIONINSIGHTS_CONNECTION_STRING", "InstrumentationKey=test-key-12345")
    monkeypatch.setenv("DATABASE_URL", "sqlite:///test.db")
