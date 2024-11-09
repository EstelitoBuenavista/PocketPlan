# # Stage 1: Build the Next.js app
# FROM node:18-alpine AS deps

# WORKDIR /app
# # Copy package files and install dependencies
# COPY pocketplan/package*.json ./
# # WORKDIR /app/pocketplan
# RUN npm install


# # Copy the rest of the application code
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY pocketplan .
# # WORKDIR /app/pocketplan
# RUN npm install

# COPY --from=deps /app/node_modules ./node_modules
# # Build the Next.js app
# RUN npm run build

# # Stage 2: Run the Next.js app
# FROM node:18-alpine

# WORKDIR /app/pocketplan
# ENV NODE_ENV development
# # RUN npm install -g serve

# WORKDIR /app
# # Copy the build from the previous stage
# # COPY --from=build /app/dist ./dist 

# COPY --from=builder /app/pocketplan/public ./public
# COPY --from=builder /app/pocketplan/.next ./.next
# COPY --from=builder /app/pocketplan/node_modules ./node_modules
# COPY --from=builder /app/pocketplan/package.json ./package.json
# # Expose port 3000
# EXPOSE 3000

# # Start the app
# # CMD ["npm", "start"]
# # CMD ["serve", "-s", "dist"]
# CMD [ "npm", "run", "dev" ]

# Use Node.js 18 as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app/pocketplan

# Copy only package files first for caching dependencies
COPY pocketplan/package*.json ./

# Install dependencies
RUN npm install

# Copy all the project files (use volumes for local development)
COPY pocketplan ./

# Set the environment to development
ENV NODE_ENV=development

# Expose the port for the application
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev"]