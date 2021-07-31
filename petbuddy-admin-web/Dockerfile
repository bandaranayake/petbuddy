FROM node:8

RUN mkdir /app

WORKDIR /app

COPY package.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm","start"]