import { OrderHeader } from './OrderHeader';
import { OrderDetailsGrid } from './OrderDetailsGrid';
import { useAuth } from '../../contexts/AuthContext';

export function OrdersGrid({ orders, loadCart }) {
	const { user, isAuthenticated } = useAuth();
	const userOrders = orders.filter((order) => order.userId === user?.id);
	if (!isAuthenticated) {
		return <div className='text-center mt-10'>Please log in to view your orders.</div>;
	}
	if (userOrders === 0) {
		return <div className='text-center mt-10'>You have no orders yet.</div>;
	}
	return (
		<div className='orders-grid'>
			{userOrders.map((order) => {
				return (
					<div
						key={order.id}
						className='order-container border border-gray-200 rounded-lg overflow-hidden'
					>
						<OrderHeader order={order} />

						<OrderDetailsGrid order={order} loadCart={loadCart} />
					</div>
				);
			})}
		</div>
	);
}
