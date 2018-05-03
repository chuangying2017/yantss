FROM node

COPY package.json /station/package.json
WORKDIR /station
RUN npm install
RUN npm install -g gulp-cli
ENV NODE_ENV production
COPY . /station

RUN npm run build
RUN gulp build --version=v4
