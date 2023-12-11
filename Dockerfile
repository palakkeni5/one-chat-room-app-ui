FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY . .

RUN npm config set legacy-peer-deps true
RUN npm install
RUN npm run build
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]
# CMD ["npm" , "start"]