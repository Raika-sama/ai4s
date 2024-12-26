FROM node:18-alpine

ENV JWT_SECRET=""
ENV JWT_EXPIRES_IN=24h
ENV TOKEN_PREFIX=Bearer

# Install the exact packages needed for bcrypt compilation
RUN apk add --no-cache python3 make gcc g++ libc-dev linux-headers

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Rebuild bcrypt to ensure compatibility with alpine
RUN npm rebuild bcrypt --build-from-source

EXPOSE 5000

CMD ["node", "app.js"]