# Etapa 1: Construir a aplicação
FROM node:18.20.5 AS builder

WORKDIR /home/app
COPY ./package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Gerar os arquivos do Prisma
RUN npx prisma generate

# Construir a aplicação (ajuste de acordo com o comando correto para o seu projeto)
RUN npm run build

# Etapa 2: Preparar a imagem de produção
FROM node:18.20.5 AS production

WORKDIR /app

# Copiar apenas os arquivos necessários para produção
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Criar o usuário e grupo 'node' (se ainda não existirem)
RUN addgroup -S node && adduser -S -G node node

# Definir o usuário e grupo para evitar problemas de permissão
USER node

# Expor a porta do container
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
