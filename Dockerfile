FROM node:14.16-alpine3.13

WORKDIR /app

# needed by api to scrape
RUN apk add --no-cache curl

# copy package files
COPY web/package.json ./web/
COPY api/package.json ./api/
COPY package.json \
  yarn.lock \
  ./

# install all dependencies in all workspaces
RUN yarn --no-progress --non-interactive --frozen-lockfile

# copy everything
COPY . .

# overwrite redwood.toml
RUN cp docker-redwood.toml redwood.toml

# change db to sqlite
RUN sed -i -e 's/mysql/sqlite/g' /app/api/prisma/schema.prisma
