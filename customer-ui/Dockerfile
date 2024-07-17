# Use a lighter base image for building the application (to avoid long processing times)
FROM node:14-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use a lighter base image for the runtime
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]