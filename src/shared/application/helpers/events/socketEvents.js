import socket from '../../../infrastructure/api/socket';

export const registerSocketEvents = (boardId, handleAnyEvent) => {
	const joinRoom = () => {
		if (boardId) {
			socket.emit('joinBoard', boardId);
		}
	};

	// Registrar eventos
	socket.onAny(handleAnyEvent);

	if (socket.connected) {
		joinRoom();
	}

	socket.on('connect', joinRoom);

	// Retornar una función para limpiar los eventos
	return () => {
		socket.offAny(handleAnyEvent);
		socket.off('connect', joinRoom);
	};
};

export default {};
