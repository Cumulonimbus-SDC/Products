FROM node:12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app
# COPY package*.json ./

RUN npm install


EXPOSE 7000

CMD ["npm", "run", "start"]