import { Header } from '../../Components/Header';
import api from '../../api';
import { useState, useEffect, Fragment } from 'react';
import { OrdersGrid } from './OrdersGrid';
import { useAuth } from '../../contexts/AuthContext.jsx';

export function OrdersPage({ cart, loadCart }) {
	const [orders, setOrders] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		const getOrders = async () => {
			const token = localStorage.getItem('authToken');

			if (!token || !isAuthenticated) {
				setIsFetching(false);
				return;
			}
			try {
				const response = await api.get('/api/orders?expand=products', {
					headers: { Authorization: `Bearer ${token}` },
				});
				setOrders(response.data);
			} catch (err) {
				console.error('Error fetching orders:', err);
			} finally {
				setIsFetching(false);
			}
		};

		getOrders();
	}, [isAuthenticated]);
	return (
		<>
			<Header cart={cart} />

			<div className='orders-page max-w-212.5 mt-22.5 mb-25 px-5 mx-auto'>
				<div className='page-title font-bold text-[26px] mb-6.25'>Your Orders</div>

				{!isAuthenticated ?
					<div className='text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed'>
						<p className='text-gray-600 mb-4'>Please log in to view your order history.</p>
						<a href='/login' className='bg-blue-500 text-white px-6 py-2 rounded-full'>
							Login
						</a>
					</div>
				: isFetching ?
					<div className='text-center py-10'>
						<div className='animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full'></div>
						<p className='mt-2 text-gray-500'>Loading your orders...</p>
					</div>
				: orders.length === 0 ?
					<div className='text-center py-10'>
						<p className='text-gray-500'>You haven't placed any orders yet.</p>
						<a href='/' className='text-blue-500 underline'>
							Start shopping
						</a>
					</div>
				:	<OrdersGrid orders={orders} loadCart={loadCart} />}
			</div>
		</>
	);
}
