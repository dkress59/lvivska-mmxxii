FROM node:16 as install
WORKDIR /lvivska

COPY . .
RUN rm -r cms .env

RUN yarn

EXPOSE 3000


FROM install as dev-image

CMD yarn dev


FROM install as prod-image

RUN yarn build

CMD yarn start
