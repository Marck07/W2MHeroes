FROM node:12.16.2 AS build-env

WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build

EXPOSE 8080

FROM nginx:1.13.9-alpine

COPY --from=build-env /app/dist/W2MHeroes/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
