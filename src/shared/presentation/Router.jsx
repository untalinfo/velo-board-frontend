import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import { importFiles } from '../application/helpers/common-functions';

const importRouter = import.meta.glob('../../domains/**/infrastructure/routing/router.*');

const Router = () => {
	const [routes, setRoutes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadRoutes = async () => {
			try {
				const routerDomain = await importFiles(importRouter);
				const loadedRoutes = routerDomain.map((route) => route.default);
				setRoutes(loadedRoutes);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		loadRoutes();
	}, []);

	const defaultLayout = ({ children }) => <>{children}</>;

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error loading routes: {error.message}</div>;
	}

	return (
		<Switch>
			{routes.map((router) => {
				return router.router.map(({ path, page: Component, routeComponent: Route, exact = true, layout, ...rest }) => (
					<Route
						key={path}
						exact={exact}
						path={path}
						component={Component}
						layout={layout || router.layout || defaultLayout}
						{...rest}
					/>
				));
			})}
		</Switch>
	);
};

export default Router;
