# Use official Node.js image as the base image
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Install dependencies (copy package.json first to leverage Docker cache)
COPY package*.json ./

# Install dependencies (including dev dependencies like typescript and next.js)
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js app (this will compile TypeScript and prepare the app for production)
RUN npm run build

# Create a new image from a smaller Node.js image for production
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the builder stage (dist, node_modules, etc.)
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the default Next.js port (3000)
EXPOSE 3000

# Command to run the Next.js app in production mode
CMD ["npm", "run", "start"]
