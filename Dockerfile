FROM node:bullseye  

WORKDIR /app

COPY . .
COPY ./entrypoint.sh .

EXPOSE 5678

RUN npm install

RUN chmod a+x ./entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]



