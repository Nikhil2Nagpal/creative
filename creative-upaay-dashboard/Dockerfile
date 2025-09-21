# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the app
RUN npm run build

# Install serve to serve static files
RUN npm install -g serve

# Expose port
EXPOSE 80

# Start the app
CMD ["serve", "-s", "dist", "-l", "80"]