FROM nginx:alpine

COPY /station/docker/nginx.conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY /station/dist/build/index.html /usr/share/nginx/html/index.html