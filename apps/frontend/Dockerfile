FROM nginx:alpine

COPY ../../nginx.conf /etc/nginx/nginx.conf
#ENV PORT 80

EXPOSE 80

WORKDIR /usr/share/nginx/html
COPY ../../dist/apps/frontend .
