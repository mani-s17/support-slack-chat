### Name this docker - support-slack-api
FROM mhart/alpine-node

COPY package.json /support-slack-api/
COPY src /support-slack-api/src/

WORKDIR /support-slack-api/
RUN npm install

EXPOSE 8080

CMD ["npm", "start"]