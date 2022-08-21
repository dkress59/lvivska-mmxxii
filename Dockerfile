FROM node:16 as install
WORKDIR /lvivska

COPY . .
RUN rm -r cms .env

RUN yarn

EXPOSE 3000


FROM install as development

CMD yarn dev


FROM install as production

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_CMS_URL
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_STRIPE_PUBLIC_KEY

RUN yarn build

CMD yarn start
