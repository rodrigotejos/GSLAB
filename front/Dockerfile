FROM node:10-slim

# set deployment directory
WORKDIR /front-end

COPY . ./

RUN npm install && \
    npm run build

EXPOSE 3000

# run the container
CMD ["node", "start"]