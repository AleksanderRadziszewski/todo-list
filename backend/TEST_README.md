# Testy dla main.py

## Instalacja zależności testowych

```bash
pip install -r requirements-dev.txt
```

Lub zainstaluj pojedyncze pakiety:

```bash
pip install pytest pytest-asyncio httpx
```

## Uruchamianie testów

```bash
# Uruchom wszystkie testy
pytest test_main.py -v

# Uruchom z szczegółową informacją o błędach
pytest test_main.py -v --tb=long

# Uruchom testy z pokryciem kodu
pytest test_main.py --cov=main --cov-report=html
```

## Struktura testów

### TestRootEndpoint

Testy dla endpointa GET `/`:

- `test_read_root_status_code` - Sprawdza kod HTTP 200
- `test_read_root_response_structure` - Sprawdza strukturę odpowiedzi JSON
- `test_read_root_message` - Sprawdza wiadomość powitania
- `test_read_root_version` - Sprawdza wersję API
- `test_read_root_endpoints` - Sprawdza dostępne endpointy
- `test_read_root_documentation` - Sprawdza link do dokumentacji

### TestCORSMiddleware

Testy dla konfiguracji CORS:

- `test_cors_headers_present` - Sprawdza obecność nagłówków CORS
- `test_cors_allow_origin_header` - Sprawdza nagłówek Allow-Origin

### TestAppConfiguration

Testy dla konfiguracji aplikacji:

- `test_app_is_fastapi_instance` - Sprawdza typ aplikacji
- `test_azure_monitor_configured` - Sprawdza konfigurację Azure Monitor
- `test_environment_variable_used` - Sprawdza zmienne środowiskowe

### TestResponseFormat

Testy dla formatu odpowiedzi:

- `test_response_is_json` - Sprawdza czy odpowiedź jest JSON
- `test_all_fields_are_strings` - Sprawdza typy danych
- `test_endpoints_dict_values_are_strings` - Sprawdza typy słownika endpointów

### TestHTTPMethods

Testy dla obsługi metod HTTP:

- `test_get_method_allowed` - Sprawdza GET jest dozwolony
- `test_post_method_not_allowed` - Sprawdza POST nie jest dozwolony
- `test_put_method_not_allowed` - Sprawdza PUT nie jest dozwolony
- `test_delete_method_not_allowed` - Sprawdza DELETE nie jest dozwolony

## Pokrycie kodu

Testy pokrywają:

- Inicjalizację aplikacji FastAPI
- Konfigurację middleware CORS
- Endpoint GET `/`
- Strukturę i format odpowiedzi
- Obsługę metod HTTP

## Mocking

Testy używają mockowania dla:

- `azure.monitor.opentelemetry.configure_azure_monitor` - Aby uniknąć rzeczywistych połączeń
- `FastAPIInstrumentor` - Aby izolować testy od instrumentacji
- Zmienne środowiskowe - Przez pytest fixtures

## Wymagania

- Python 3.8+
- FastAPI
- pytest
- httpx
