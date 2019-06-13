FROM node:12-alpine

WORKDIR /usr/src/app

COPY ../../package.json .
COPY . .
RUN npm install

EXPOSE 3333
CMD ["npm", "run", "start:prod"]
