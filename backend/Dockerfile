FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Copy .env file
COPY .env .env

EXPOSE 3000
CMD ["npm", "start"]
