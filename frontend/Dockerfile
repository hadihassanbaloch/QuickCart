# ---------- Build Stage ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
