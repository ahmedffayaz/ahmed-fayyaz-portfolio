FROM node:22-alpine

ENV NODE_ENV=production
ENV PORT=10000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node src ./src

USER node

EXPOSE 10000

CMD ["npm", "start"]
