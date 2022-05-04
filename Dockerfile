FROM node:18-alpine

WORKDIR /backend

COPY package.json ./

RUN yarn

COPY . ./

CMD ["yarn", "start"]
