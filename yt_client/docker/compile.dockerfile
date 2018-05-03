FROM node

COPY package.json /client/package.json
WORKDIR /client
RUN npm install
RUN npm install -g gulp-cli
ENV NODE_ENV production
COPY . /client

RUN npm run build
RUN gulp build --version=v4
