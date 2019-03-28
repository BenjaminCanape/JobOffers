FROM mhart/alpine-node:11

WORKDIR /server

COPY package*.json /server/
RUN npm install

COPY ./views /server/views/
COPY ./config /server/config/
COPY ./models /server/models/
COPY ./routes /server/routes/

COPY app.js /server/

EXPOSE 5000

CMD npm run server