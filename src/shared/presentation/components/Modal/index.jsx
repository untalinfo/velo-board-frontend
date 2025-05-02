import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import { CLOSE_ICON } from '../../../application/constants/icons';

const Modal = ({
	appId,
	isOpen = false,
	onClose,
	contentStyle,
	overlayStyle,
	closeStyle,
	closeTime,
	closeClassName,
	showClose,
	children,
	className,
}) => {
	useEffect(() => {
		const rootElement = document.getElementById('root');
		rootElement && ReactModal.setAppElement(rootElement);
	}, [appId]);

	useEffect(() => {
		let closeTimeout;
		if (closeTime && isOpen) {
			closeTimeout = setTimeout(() => {
				onClose && onClose();
			}, closeTime);
		}

		return () => {
			closeTimeout && clearTimeout(closeTimeout);
		};
	}, [closeTime, isOpen, onClose]);

	const styles = {
		overlay: {
			backgroundColor: 'rgba(0, 0, 0, 0.7)',
			zIndex: 10,
			...overlayStyle,
		},
		content: {
			backgroundColor: '#38383a',
			maxWidth: '300px',
			maxHeight: 'max-content',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			padding: '30px 20px',
			border: 'none',
			borderRadius: '20px',
			...contentStyle,
		},
	};

	const libraryCloseStyles = {
		position: 'absolute',
		top: '10px',
		right: '10px',
		cursor: 'pointer',
		fontSize: '2rem',
		...closeStyle,
	};

	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onClose}
			style={styles}
			contentLabel="Example Modal"
			className={className}
		>
			<React.Fragment>
				{showClose && <i className={`${CLOSE_ICON} ${closeClassName}`} onClick={onClose} style={libraryCloseStyles}></i>}
				{children}
			</React.Fragment>
		</ReactModal>
	);
};

Modal.defaultProps = {
	appId: 'root',
	isOpen: false,
	overlayStyles: {},
	contentStyles: {},
	closeStyle: {},
	closeClassName: '',
	closeTime: 0,
	showClose: true,
};

Modal.propTypes = {
	appId: PropTypes.string,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	contentStyle: PropTypes.object,
	overlayStyle: PropTypes.object,
	closeStyle: PropTypes.object,
	closeTime: PropTypes.number,
	closeClassName: PropTypes.string,
	showClose: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default Modal;
