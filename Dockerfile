# ---- builder stage ----
FROM node:22-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install              # includes `prisma` devDependency, needed for prisma.config.js to resolve

COPY prisma.config.js ./
COPY prisma ./prisma/
RUN npx prisma generate

# ---- runtime stage ----
FROM node:22-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /usr/src/app/src/generated/prisma ./src/generated/prisma
COPY . .

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]