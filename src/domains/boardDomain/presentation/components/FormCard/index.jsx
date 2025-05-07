import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Modal from '../../../../../shared/presentation/components/Modal';
import './FormCard.scss';
import { getBoardSelector } from '../../../application/selectors/board';
import { postCreateCard, putUpdateCard } from '../../../application/slices/cards';

const FormCard = ({ isEdit = false, defaultValues = {}, isOpen, onClose, columnId, cardId }) => {
	const boardId = useSelector(getBoardSelector);
	const dispatch = useDispatch();
	const defaultFormValues = {
		...defaultValues,
		tags: defaultValues?.tags?.join(', ') || '',
	};
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm({ defaultValues: defaultFormValues, mode: 'onChange' });

	const onSubmit = (data) => {
		if (isEdit) {
			const formattedData = {
				...data,
				tags: data.tags.split(',').map((tag) => tag.trim()),
			};
			dispatch(putUpdateCard({ formattedData, cardId }));
			onClose();
		} else {
			const formattedData = {
				...data,
				tags: data.tags.split(',').map((tag) => tag.trim()),
				columnId,
				boardId: boardId?._id,
			};
			dispatch(postCreateCard(formattedData));
			onClose();
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)} className="form-card-container">
				<div className="form-group">
					<input
						id="title"
						className="input-form"
						{...register('title', { required: 'Title is required' })}
						placeholder="Enter title"
					/>
					{errors.title && <span className="error">{errors.title.message}</span>}
				</div>

				<div className="form-group">
					<input
						id="description"
						className="input-form"
						{...register('description', { required: 'Description is required' })}
						placeholder="Enter description"
					/>
					{errors.description && <span className="error">{errors.description.message}</span>}
				</div>

				<div className="form-group">
					<input
						id="tags"
						className="input-form"
						{...register('tags', { required: 'Tags are required' })}
						placeholder="Enter tags (comma separated)"
						onChange={(e) => {
							const { value } = e.target;
							if (value.endsWith(' ')) {
								e.target.value = `${value.trim()}, `;
							}
							// Update the field value and trigger validation
							register('tags').onChange(e);
						}}
					/>
					{errors.tags && <span className="error">{errors.tags.message}</span>}
				</div>

				<button type="submit" className="btn-save" disabled={!isDirty || !isValid}>
					{isEdit ? 'Edit' : 'Save'}
				</button>
			</form>
		</Modal>
	);
};
FormCard.propTypes = {
	isEdit: PropTypes.bool,
	defaultValues: PropTypes.object,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	columnId: PropTypes.string,
	cardId: PropTypes.string,
};

export default FormCard;
