FROM node

COPY package.json /admin/package.json
WORKDIR /admin
RUN npm install

RUN npm install -g gulp-cli
ENV NODE_ENV production
COPY . /admin

RUN npm run build
RUN gulp build --version=v4
