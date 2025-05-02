import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Modal from '../../../../../shared/presentation/components/Modal';
import './FormCard.scss';

const FormCard = ({ isEdit = false, defaultValues = {}, onSave }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues, mode: 'onChange' });

	const onSubmit = (data) => {
		const formattedData = {
			...data,
			tags: data.tags.split(',').map((tag) => tag.trim()),
		};
		onSave(formattedData);
	};

	return (
		<Modal isOpen={true}>
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

				<button type="submit" className="btn-save">
					{isEdit ? 'Edit' : 'Save'}
				</button>
			</form>
		</Modal>
	);
};
FormCard.propTypes = {
	isEdit: PropTypes.bool,
	defaultValues: PropTypes.object,
	onSave: PropTypes.func.isRequired,
};

export default FormCard;
