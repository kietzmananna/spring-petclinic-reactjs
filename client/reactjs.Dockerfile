FROM node:20-alpine
WORKDIR /app
COPY package.json .
COPY tslint.json .
COPY typings.json .
#all json files
RUN npm install
COPY . .
ENV PORT 4444
RUN npm run build:prod
CMD ["npm" , "run", "start"]