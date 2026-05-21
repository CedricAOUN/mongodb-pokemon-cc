FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev
RUN npm install -g nodemon

COPY . .

ENV MONGODB_URI=mongodb://db:27017/PokemonDB
ENV PORT=3000

EXPOSE 3000

CMD ["nodemon", "index.js"]