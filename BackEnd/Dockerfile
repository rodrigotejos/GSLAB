FROM node:12-slim

# set deployment directory
WORKDIR /BackEnd

COPY . ./

RUN npm install

EXPOSE 8080

# run the container
CMD ["npm", "start"]