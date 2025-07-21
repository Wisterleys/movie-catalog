# Imagem oficial do Node.js (LTS) com Alpine (leve)
FROM node:20-alpine

WORKDIR /app

RUN npm install -g npm@latest && \
    npm install -g @vue/cli vite && \
    npm install -g npm-check-updates && \
    npm cache clean --force


EXPOSE 8080

CMD ["tail", "-f", "/dev/null"]