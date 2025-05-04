import AdminLayout from '../../../../shared/presentation/layouts/AdminLayout';
import BoardPage from '../../presentation/pages/BoardPage';
import { boardRoute } from './routes';
import { UnauthenticatedRoute } from '../../../../shared/presentation/redirect-route';

const boardRouter = {
	layout: AdminLayout,
	router: [
		{
			path: boardRoute,
			page: BoardPage,
			routeComponent: UnauthenticatedRoute,
		},
	],
};

export default boardRouter;
