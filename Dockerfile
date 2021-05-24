FROM node:latest as build

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:stable-alpine

RUN adduser -D alex

WORKDIR /app

RUN mkdir -p /var/run/nginx /var/tmp/nginx \
&& chown -R alex:alex /usr/share/nginx/ /var/run/ /var/tmp/nginx /etc/nginx 

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

COPY nginx/default.conf /etc/nginx/conf.d/
COPY  nginx/nginx.conf /etc/nginx/nginx.conf

USER alex

COPY --from=build ./build ./

RUN ls

CMD ["nginx", "-g", "daemon off;"]