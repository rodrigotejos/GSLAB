FROM node:12-slim

# set deployment directory
WORKDIR /front

COPY . ./

RUN npm install 

EXPOSE 3000

# run the container
CMD ["npm", "start"]