# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Vite inlines VITE_* vars at build time; set as a Build Variable in Coolify
ARG VITE_CONTACT_ENDPOINT=""
ENV VITE_CONTACT_ENDPOINT=$VITE_CONTACT_ENDPOINT
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
