// server.ts
// eslint-disable-next-line linebreak-style
import http from 'http';
import https from 'https';
import { Server } from 'socket.io';
import cors from 'cors';
import app from './app';
import sslOptions from '@config/ssl';
import DataSource from '@database/data-source';
import { MessageRepository } from '@modules/chat/message.repository';
import { CreateMessageDto } from '@modules/chat/dtos/create-message.dto';

const isProduction = process.env.NODE_ENV === 'production';
const server = isProduction ? https.createServer(sslOptions, app) : http.createServer(app);

// Configura o middleware CORS para o express
app.use(cors({
  origin: process.env.APP_URL, // Define a URL do frontend permitida
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Permite cookies
}));

// Inicializa o servidor Socket.IO com as configurações de CORS
const io = new Server(server, {
  cors: {
    origin: process.env.APP_URL, // Define a URL do frontend permitida
    methods: ['GET', 'POST'], // Métodos permitidos
    credentials: true, // Permite cookies
  },
});

// Exporta o io para ser usado nos controladores
export { io };

// Manipula eventos de conexão e desconexão
io.on('connection', (socket) => {
  console.log('Novo cliente conectado ao WebSocket');

  // Envia todas as mensagens armazenadas para o cliente ao conectar
  MessageRepository.getAllMessages().then(messages => {
    socket.emit('allMessages', messages);
  });

  // Evento de envio de mensagem
  socket.on('sendMessage', async(data: CreateMessageDto) => {
    try {
      const message = await MessageRepository.createMessage(data);
      io.emit('newMessage', message); // Envia a nova mensagem para todos os clientes conectados
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error);
    }
  });

  // Evento para limpar mensagens
  socket.on('clearMessages', async() => {
    try {
      await MessageRepository.clearMessages();
      io.emit('messagesCleared'); // Notifica todos os clientes que as mensagens foram limpas
    } catch (error) {
      console.error('Erro ao limpar mensagens:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado do WebSocket');
  });
});

async function start() {
  try {
    // Verifica a conexão com o banco de dados antes de iniciar o servidor.
    await DataSource.$connect();

    server.listen(process.env.PORT, () => {
      console.log('Projeto iniciado com sucesso!');
      console.log(`Documentação da API disponível em ${process.env.APP_URL}/swagger`);
    });

  } catch (err: any) {
    console.log('Erro ao iniciar o projeto!');
    console.log(err);
  }
}

start();
