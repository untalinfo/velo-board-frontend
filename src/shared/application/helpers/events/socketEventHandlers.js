import { addNotification } from '../../slices/notifications';

export const handleAnyEvent = (eventName, eventData, dispatch) => {
	// Crear un mensaje base
	let message = `Evento '${eventName}' recibido.`;

	switch (eventName) {
		case 'column:created':
			message = `New column created: ${eventData?.title || '(no name)'}`;
			break;
		case 'column:deleted':
			message = `A deleted column: ${eventData?.title || '(no name)'}`;
			break;
		case 'column:moved':
			message = `Column moved to position ${eventData?.targetPosition || '?'}`;
			break;
		case 'column:updated':
			message = `Column updated: ${eventData?.title || '(no name)'}`;
			break;
		case 'card:updated':
			message = `Card updated: ${eventData?.title || '(no name)'}`;
			break;
		case 'card:created':
			message = `New card creared: ${eventData?.title || '(no name)'}`;
			break;
		case 'card:moved':
			message = `Tarjeta movida a columna ${eventData?.targetColumnId?.slice(-4) || '?'}`;
			break;
		case 'card:deleted':
			message = `A deleted card`;
			break;
		default:
			break;
	}

	// Crear el objeto de notificación
	const newNotification = {
		id: eventData?._id || eventData?.id || Date.now(),
		eventName,
		message,
		data: eventData,
		timestamp: Date.now(),
	};

	// Actualizar las notificaciones
	dispatch(addNotification(newNotification));
};

export default {};
