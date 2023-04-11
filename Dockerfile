FROM node:bullseye  

WORKDIR /app

COPY . .
COPY ./entrypoint.sh .

RUN npm install

RUN chmod a+x ./entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]




