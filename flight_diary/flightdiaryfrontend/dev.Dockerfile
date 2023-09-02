FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci --legacy-peer-deps

USER node
CMD [ "npm", "run" ,"start"]