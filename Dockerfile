FROM node:9 as alias
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=alias /usr/src/app/public /usr/share/nginx/html
