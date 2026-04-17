# official Debian slim image
FROM debian:stable-slim

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm installpa

# Copy application code
COPY . .

# Expose port (e.g., 8086)
EXPOSE 8086

# Run the development server
CMD ["npm", "run", "start"]   