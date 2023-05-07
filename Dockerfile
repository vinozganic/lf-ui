FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

ENV NODE_ENV=production

CMD ["nginx", "-g", "daemon off;"]
