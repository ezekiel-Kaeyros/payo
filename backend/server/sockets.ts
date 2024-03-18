import { Server } from 'socket.io';
import { Events } from './constants';
const users = {};


export default (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.use((socket: any, next) => {
   
  });

  io.on('connection', (socket: any) => {
    console.log('Socket connection. socket.connected: ', socket.connected);
    

    /**
     * Notifications.
     */
    socket.on(Events.CREATE_NOTIFICATION, (data: any) => {
     
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      
    });
  });
};
