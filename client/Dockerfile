FROM node:alpine as builder
WORKDIR '/app'
COPY package-lock.json .
COPY package.json .
RUN npm config set fetch-retry-mintimeout 2000000
RUN npm config set fetch-retry-maxtimeout 12000000
RUN npm ci
ARG REACT_APP_FIREBASE_KEY
ENV REACT_APP_FIREBASE_KEY=${REACT_APP_FIREBASE_KEY}
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html