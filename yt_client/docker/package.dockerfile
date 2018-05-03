FROM nginx:alpine

COPY /client/dist/build/index.html /usr/share/nginx/html/index.html