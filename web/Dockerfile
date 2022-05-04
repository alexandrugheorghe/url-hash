# pull official base image
FROM node:18-buster

# set working directory
WORKDIR /web

# install app dependencies
COPY package.json ./
RUN yarn

# add app
COPY . ./

# start app
CMD ["yarn", "start"]
