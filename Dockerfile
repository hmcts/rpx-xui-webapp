FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/rpx-exui/ .