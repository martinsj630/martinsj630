FROM node:10-alpine
RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app
COPY package*.json ./
USER node
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "node", "server.js" ]
