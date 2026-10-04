# 1. Use the official Node.js 22 Alpine Linux image
FROM node:22-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package description files
COPY package*.json ./

# 4. Install production dependencies 
RUN npm install --omit=dev

# 5. Copy your Prisma schema folder so Docker can see it
COPY prisma ./prisma/

# 6. Generate the Prisma Client inside the container for Linux
RUN npx prisma generate

# 7. Copy the remaining backend source code files
COPY . .

# 8. Set production environment configurations
ENV NODE_ENV=production
ENV PORT=8080

# 9. Expose the server port
EXPOSE 8080

# 10. Command to start your application
CMD [ "npm", "start" ]