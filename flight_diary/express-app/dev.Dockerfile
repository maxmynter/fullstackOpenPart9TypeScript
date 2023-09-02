FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm i

USER node
CMD [ "npm", "run" ,"dev"]