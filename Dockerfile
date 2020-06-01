#Getting base image from CentOS 7
FROM centos:7

# MAINTAINER myself <arunpk811@mail.com>

# LABEL Remarks="This is a Dockerfile for CentOS System"

#Update Software Repository
# RUN yum -y install epel-release
RUN yum -y install wget
RUN wget https://nginx.org/packages/rhel/7/x86_64/RPMS/nginx-1.8.1-1.el7.ngx.x86_64.rpm --no-check-certificate
RUN yum -y install nginx-1.8.1-1.el7.ngx.x86_64.rpm

COPY docker/default.conf /etc/nginx/conf.d/
COPY dist/pfa-client var/www

RUN chown -R nginx:nginx /var/www

ENTRYPOINT ["nginx", "-g", "daemon off;"]