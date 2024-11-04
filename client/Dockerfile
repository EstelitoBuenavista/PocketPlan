# Stage 1: Build the Next.js app
FROM node:16-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY pocketplan/package*.json ./
# WORKDIR /app/pocketplan
RUN npm install


# Copy the rest of the application code
COPY pocketplan .
WORKDIR /app/pocketplan
# Build the Next.js app
RUN npm run build

# Stage 2: Run the Next.js app
FROM node:16-alpine

# WORKDIR /app/pocketplan

RUN npm install -g serve

WORKDIR /app
# Copy the build from the previous stage
COPY --from=build /app/dist ./dist 

# Expose port 3000
EXPOSE 3000

# Start the app
# CMD ["npm", "start"]
CMD ["serve", "-s", "dist"]