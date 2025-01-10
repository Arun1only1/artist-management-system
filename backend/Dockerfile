# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the NestJS app
RUN npm run build


# Stage 2: Run the application
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Expose the port the app will run on
EXPOSE 8080

# Command to run your app
CMD ["npm", "run", "start:prod"]