FROM node:12
LABEL maintainer="Jongchan Kim <8eatles@siliconcube.co.kr>"

WORKDIR /app

# Install pm2
# RUN npm install pm2 -g
# RUN npm install yarn -g

# Bundle APP files
COPY . .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

EXPOSE 80 443 43554

# CMD [ "pm2-runtime", "start", "pm2.json" ]

CMD ["npm", "start"]
