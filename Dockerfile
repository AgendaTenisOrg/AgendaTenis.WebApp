# Use the official Node.js image as the base image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./agenda-tenis-web-app/package*.json ./

# Install the dependencies
RUN npm ci

# Copy only source files
COPY ./agenda-tenis-web-app/src ./src
COPY ./agenda-tenis-web-app/angular.json .
COPY ./agenda-tenis-web-app/tsconfig.json .
COPY ./agenda-tenis-web-app/tsconfig.app.json .

# Build the Angular application
RUN npm run build --prod

# Use the official NGINX image as the base image for the second stage
FROM nginx:alpine

# Copy the build output to the NGINX html directory
COPY --from=build /app/dist/agenda-tenis-web-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
