FROM node:11.9.0 AS build-env
RUN mkdir -p /app/swagger-ui
ADD . /app/swagger-ui

WORKDIR /app/swagger-ui
RUN npm config set strict-ssl false
RUN npm install

FROM gcr.io/distroless/nodejs
COPY --from=build-env /app /app
WORKDIR /app/swagger-ui
CMD ["index.js"]