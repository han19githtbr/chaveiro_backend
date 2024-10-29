# Etapa 1: Construir a aplicação
FROM node:20.10.0 AS builder

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
FROM node:20.10.0 AS production

WORKDIR /home/app

# Copiar apenas os arquivos necessários para produção
COPY --from=builder /home/app/node_modules ./node_modules
COPY --from=builder /home/app/dist ./dist
COPY --from=builder /home/app/prisma ./prisma

# Expor a porta do container
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]

