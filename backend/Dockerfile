# Dockerfile for Node Express Backend

# Use a specific Node.js version as the base image
FROM node:14-alpine

# Create App Directory
WORKDIR /server/app

# Set specific environment variable for MongoDB URL
ENV MONGO_URL=mongodb+srv://mwaqasakhtar101:uT8yu7UHJJhRmkCb@cluster0.wg4on3p.mongodb.net/IntEcom

# Install Dependencies for both development and production
COPY package*.json ./

# Install dependencies for production
RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 3001

# Use node to run the app in production
CMD ["npm", "start"]
