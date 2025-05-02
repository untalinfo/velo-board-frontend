import React from 'react';
import { PropTypes } from 'prop-types';
import './AdminLayout.scss';
import Header from '../../components/Header';

const AdminLayout = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
};

AdminLayout.propTypes = {
	children: PropTypes.node,
};

export default AdminLayout;
