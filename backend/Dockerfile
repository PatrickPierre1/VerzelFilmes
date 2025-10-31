FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate dev && npm run dev"]