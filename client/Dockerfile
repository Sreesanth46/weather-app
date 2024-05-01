FROM node:alpine AS build
WORKDIR /client
COPY package*.json .
RUN npm ci
COPY . .

ARG VITE_RAPID_API_KEY
ARG VITE_BACKEND_URL

ENV VITE_RAPID_API_KEY $VITE_RAPID_API_KEY
ENV VITE_BACKEND_URL $VITE_BACKEND_URL

RUN ["npm", "run", "build"]

FROM nginx:alpine
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /client/build/ /usr/share/nginx/html