# Local Development

All commands run from `sub-projects/capability-map/`.

## Starting the dev server

```bash
python scripts/serve.py
```

The app runs at `http://localhost:5000` with Flask's built-in reloader enabled,
so edits to templates and Python files take effect on the next request.

## Stopping the server

Press `Ctrl+C` in the terminal where it is running.

## Testing the password gate

The auth gate is disabled by default. To test it locally:

```bash
APP_PASSWORD=secret python scripts/serve.py
```

## Dependencies

Install into the project's virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r scripts/requirements.txt
```
