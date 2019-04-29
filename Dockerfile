FROM httpd:alpine

MAINTAINER "HMCTS Team <https://github.com/hmcts>"
LABEL maintainer = "HMCTS Team <https://github.com/hmcts>"

COPY ./dist/rpx-exui/ /usr/local/apache2/htdocs/
COPY ./docker/.htaccess /usr/local/apache2/htdocs/
COPY ./docker/httpd.conf /usr/local/apache2/conf/httpd.conf

RUN chmod -R 755 /usr/local/apache2/htdocs/
RUN mkdir /var/log/httpd
RUN mkdir /var/log/apache2

EXPOSE 8090