FROM    node:16-alpine

WORKDIR /app

ENV 	CHOKIDAR_USEPOLLING=true

COPY    package.json \
        package-lock.json\
        ./
RUN     npm ci

COPY    tsconfig.json \
        ./
COPY    public \
        public
COPY    src \
        src
CMD     npm run start
