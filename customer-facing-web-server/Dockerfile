FROM python:3.8-slim

WORKDIR /app

# Copy requirements.txt into the image
COPY requirements.txt .

# Update pip and install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Command to run the application
CMD ["python", "app.py"]
