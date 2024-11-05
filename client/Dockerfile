# Stage 1: Build the Next.js app
FROM node:18-alpine AS deps

WORKDIR /app
# Copy package files and install dependencies
COPY pocketplan/package*.json ./
# WORKDIR /app/pocketplan
RUN npm install


# Copy the rest of the application code
FROM node:18-alpine AS builder
WORKDIR /app
COPY pocketplan .
# WORKDIR /app/pocketplan
COPY --from=deps /app/node_modules ./node_modules
# Build the Next.js app
RUN npm run build

# Stage 2: Run the Next.js app
FROM node:18-alpine

WORKDIR /app/pocketplan
ENV NODE_ENV production
# RUN npm install -g serve

WORKDIR /app
# Copy the build from the previous stage
# COPY --from=build /app/dist ./dist 

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
# CMD ["serve", "-s", "dist"]