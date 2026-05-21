FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY . .

ENV MONGODB_URI=mongodb://db:27017/PokemonDB
ENV PORT=8080

EXPOSE 8080

CMD ["node", "index.js"]