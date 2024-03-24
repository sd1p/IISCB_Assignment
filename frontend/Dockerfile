# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container at /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container at /app
COPY . .

# Build the Next.js application for production
RUN npm run build

# Expose port 3000 to allow communication to/from server
EXPOSE 3000

# Command to run the Next.js application
CMD ["npm", "start"]
