
FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --force

COPY . ./

RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]




# FROM node:16 

# WORKDIR /app

# COPY package.json .

# RUN npm install --only=production

# COPY --from=build /app/dist ./dist
# CMD npm run start:prod
