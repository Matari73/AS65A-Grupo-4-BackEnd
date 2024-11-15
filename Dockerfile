# imagem Node.js
FROM node:16

# diretório de trabalho
WORKDIR /usr/src/app

# copiando os arquivos de package.json e package-lock.json
COPY package*.json ./

# instalando as dependências
RUN npm install

# copiando o restante dos arquivos da aplicação
COPY . .

# porta da aplicação
EXPOSE 3002

# rodar a aplicação
CMD ["npm", "run", "dev"]