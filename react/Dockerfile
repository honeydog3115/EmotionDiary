FROM node:20

WORKDIR /react

ENV REACT_APP_API_URL=http://emotion_diary_flask_test3:5000

COPY ./ .
COPY ./package.json .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]