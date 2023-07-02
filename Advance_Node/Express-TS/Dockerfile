FROM node:20-alpine3.17

WORKDIR /app
RUN npm install -g nodemon
RUN npm install -g typescript

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build
CMD ["npm","run","dev"]