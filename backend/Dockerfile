FROM python:3.11-slim

WORKDIR /app/backend

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies (lean set that works on public PyPI)
COPY requirements-local.txt .
RUN pip install --no-cache-dir -r requirements-local.txt

# Copy application code
COPY . .

EXPOSE 8001

# --reload is handy for local development
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]
