FROM node:22-alpine

WORKDIR /usr/src/app

RUN npm install -g @angular/cli

CMD [ "/bin/sh" ]
