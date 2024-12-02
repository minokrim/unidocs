FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./public ./public

RUN npm install \
    && npm install -g serve \
    && npm run build \
    && rm -fr node_modules

ENV PORT=8080

EXPOSE 8080

CMD [ "npm","start" ]