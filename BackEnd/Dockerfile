FROM node:10-slim

# set deployment directory
WORKDIR /back-end

COPY . ./

RUN npm install && \
    npm run build

EXPOSE 8080

# run the container
CMD ["node", "start"]