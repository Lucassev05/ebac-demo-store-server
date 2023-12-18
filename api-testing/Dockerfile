FROM node:latest

WORKDIR /home/api-testing/

COPY . /home/api-testing/

RUN npm install

CMD ["npm", "run", "test:healthCheck"]

