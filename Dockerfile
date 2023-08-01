#
# Usage:
#
# ```
# $ docker build . -t nestjs-demo
# ```
#
################################################################################
# Build base
################################################################################
FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

################################################################################
# Runtime
################################################################################
FROM node:18-alpine AS runtime

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000:3000
CMD [ "node", "dist/main.js" ]
