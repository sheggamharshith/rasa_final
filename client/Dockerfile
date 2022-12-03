FROM node:14-alpine
WORKDIR /client
COPY package*.json /client/
RUN npm install

ADD . .
EXPOSE 80
RUN export PORT=80
WORKDIR /client/client
CMD [ "npm","start"]