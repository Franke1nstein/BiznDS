import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import api from './api';
import { HomePage } from './Pages/home/HomePage';
import { CheckoutPage } from './Pages/checkout/CheckoutPage';
import { LoginPage } from './Pages/auth/LoginPage';
import { RegisterPage } from './Pages/auth/RegisterPage';
import { TrackingPage } from './Pages/TrackingPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { OrdersPage } from './Pages//orders/OrdersPage';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
	const [cart, setCart] = useState([]);
	const { isAuthenticated, loading } = useAuth();

	const loadCart = async () => {
		const response = await api.get('/api/cart-items?expand=product');
		setCart(response.data);
	};

	useEffect(() => {
		// Wait until auth status is resolved before attempting to load user cart.
		if (loading) return;
		if (!isAuthenticated) return;
		// Defer the load to avoid synchronous setState inside effect (linter rule).
		Promise.resolve().then(() => {
			loadCart();
		});
	}, [loading, isAuthenticated]);
	return (
		<Routes>
			<Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
			<Route path='login' element={<LoginPage cart={cart} />} />
			<Route path='register' element={<RegisterPage cart={cart} />} />
			<Route
				path='checkout'
				element={
					<ProtectedRoute>
						<CheckoutPage cart={cart} loadCart={loadCart} />
					</ProtectedRoute>
				}
			/>
			<Route
				path='orders'
				element={
					<ProtectedRoute>
						<OrdersPage cart={cart} loadCart={loadCart} />
					</ProtectedRoute>
				}
			/>
			<Route path='tracking/:orderId/:productId' element={<TrackingPage cart={cart} />} />
			<Route path='*' element={<NotFoundPage cart={cart} />} />
		</Routes>
	);
}

export default App;
