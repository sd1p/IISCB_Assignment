# Use the official Python image as the base image
FROM python:3.10

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file into the container at /app
ADD ./requirements.txt /app/requirements.txt

# Install system dependencies
RUN apt-get update && apt-get install -y libgl1-mesa-glx

# Install Python dependencies
RUN pip install --upgrade pip \
    && pip install torch==2.0.0 --index-url https://download.pytorch.org/whl/cpu \
    && pip install -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app

# Expose port 5000 to allow communication to/from server
EXPOSE 5000

# Command to run the Flask application
CMD ["python", "app.py"]
