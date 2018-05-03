FROM nginx:alpine

COPY /admin/dist/build/index.html /usr/share/nginx/html/index.html