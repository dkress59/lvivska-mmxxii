FROM php:8.0-fpm-alpine as  php

RUN apk upgrade && apk add --update --no-cache \
    curl-dev imagemagick imagemagick-dev libcap libmemcached-dev libpng-dev libzip-dev \
    freetype-dev jpeg-dev libjpeg-turbo-dev libjpeg-turbo-utils libwebp libwebp-tools gifsicle optipng \
    autoconf build-base nginx supervisor git subversion

RUN pecl install imagick && docker-php-ext-enable imagick

RUN docker-php-ext-configure gd \
		--with-freetype \
		--with-jpeg \
    && docker-php-ext-install -j$(nproc) gd
RUN docker-php-ext-install curl exif mysqli opcache zip
RUN docker-php-ext-enable gd curl exif mysqli opcache zip

# Allow nginx to bind to ports <1024 despite being run as non-root # https://unix.stackexchange.com/a/10737
RUN setcap 'cap_net_bind_service=+ep' /usr/sbin/nginx
RUN mkdir -p /var/lib/nginx /var/log/nginx
RUN mkdir -p /var/www/html && chown nginx:nginx /var/www/html

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/php.ini /usr/local/etc/php/php.ini
COPY conf/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /var/www/html
USER nginx
EXPOSE 80
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]


FROM php as composer
ARG COMPOSER_VERSION="2.3.10"

RUN set -ex; \
    curl -o composer.sha256sum -fSL "https://getcomposer.org/download/${COMPOSER_VERSION}/composer.phar.sha256sum"; \
    export COMPOSER_SHA256=$(sed 's/\scomposer.phar$//' composer.sha256sum); \
    curl -o composer.phar -fSl "https://getcomposer.org/download/${COMPOSER_VERSION}/composer.phar"; \
    echo "$COMPOSER_SHA256 ./composer.phar" | sha256sum -c -; \
    chmod +x composer.phar;
RUN set -ex; \
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar; \
    chmod +x wp-cli.phar

USER root
RUN set -ex; \
    mv composer.phar /usr/bin/composer; \
    mv wp-cli.phar /usr/bin/wp
USER nginx


FROM composer as wordpress
ARG WORDPRESS_LOCALE="de_DE"
ARG WORDPRESS_VERSION=6.0.1
ARG ACF_PRO_VERSION=5.12.3
ENV ACF_PRO_VERSION=${ACF_PRO_VERSION}
ARG ACF_PRO_LICENSE=${ACF_PRO_LICENSE}
ENV ACF_PRO_LICENSE=${ACF_PRO_LICENSE}

RUN set -ex; \
    wp core download --version=$WORDPRESS_VERSION --locale=$WORDPRESS_LOCALE --skip-content; \
    wp core verify-checksums

RUN mkdir -p wp-content/uploads
RUN chmod 0755 wp-content
RUN chmod -R 0777 wp-content/uploads
RUN chown -R nginx:nginx wp-content

COPY ./conf/composer.json ./
COPY ./conf/composer.json /home/nginx/.composer/composer.json
RUN set -ex; \
    sed -i "s/ACF_PRO_LICENSE/${ACF_PRO_LICENSE}/g" composer.json; \
    sed -i "s/ACF_PRO_VERSION/${ACF_PRO_VERSION}/g" composer.json
RUN composer update --no-interaction -vvv
RUN rm composer.json composer.lock

COPY ./wp-theme/ ./wp-content/themes/lvivska-dus-theme/
COPY ./wp-plugin/ ./wp-content/plugins/lvivska-dus-plugin/

COPY ./conf/wp-config.php ./

# run supervisord as root
USER root
RUN chown -R root:nginx wp-content

