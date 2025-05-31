FROM node:22 AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_STATIC
ENV NEXT_PUBLIC_STATIC=$NEXT_PUBLIC_STATIC

RUN npm run build

FROM node:22
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./

ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "start"]