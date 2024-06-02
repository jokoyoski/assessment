FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Install `serve` to serve the built app
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 8080

CMD ["npm", "run", "serve"]
