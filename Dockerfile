FROM node:14-alpine

WORKDIR /usr/src/app


COPY server/package*.json ./server/

WORKDIR /usr/src/app/server/

RUN npm install 

RUN ls

COPY server .

EXPOSE 3000


CMD ["npm" ,"start"]