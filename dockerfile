# Use official Node.js image as base
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app's code
COPY . .

# Expose the port
EXPOSE 3000

# Build and start Next.js app
# CMD ["npm", "run", "build"]
RUN npm run build
CMD ["npm", "run", "start"]
