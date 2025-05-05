import { io } from 'socket.io-client';
import { URL_PROD } from '../../application/constants/env';

const socket = io(URL_PROD, {
	transports: ['websocket'],
});

socket.on('connect', () => {
	console.log('✅ Conectado al servidor Socket.io desde el frontend');
});

socket.on('disconnect', () => {
	console.log('❌ Desconectado del servidor Socket.io desde el frontend');
});

export default socket;
