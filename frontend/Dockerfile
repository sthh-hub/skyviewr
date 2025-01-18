# Use Node.js base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application code
COPY . .

# Build React app
RUN npm run build

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]