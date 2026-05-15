import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import api from '../api';
import dayjs from 'dayjs';
import { Header } from '../Components/Header';

export function TrackingPage({ cart }) {
	const { orderId, productId } = useParams();

	const [order, setOrder] = useState(null);

	useEffect(() => {
		const fetchTrackingData = async () => {
			const response = await api.get(`/api/orders/${orderId}?expand=products`);

			setOrder(response.data);
		};
		fetchTrackingData();
	}, [orderId]);

	if (!order) {
		return null;
	}
	const orderProduct = order.products.find((orderProduct) => {
		return orderProduct.productId === productId;
	});
	const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
	const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

	let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
	if (deliveryPercent > 100) {
		deliveryPercent = 100;
	}

	const isPreparing = deliveryPercent < 33;
	const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
	const isDelivered = deliveryPercent === 100;

	return (
		<>
			<title>Tracking</title>
			<Header cart={cart} />
			<div className='tracking-page max-w-212.5 mt-22.5 mb-25 px-7.5 mx-auto'>
				<div className='order-tracking'>
					<Link
						className='back-to-orders-link inline-block mb-7.5 text-blue-600 cursor-pointer'
						to='/orders'
					>
						Back to Orders
					</Link>

					<div className='delivery-date text-[25px] font-bold mb-2.5'>
						Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
					</div>

					<div className='order-id mb-1'>Order ID: #{orderId}</div>
					<div className='product-info mb-6'>Product: {orderProduct.product.name}</div>

					<img
						className='product-image max-w-37.5 max-h-37.5 mt-6 mb-12'
						src={orderProduct.product.image}
					/>

					{/* Progress Bar */}
					<div className='space-y-4'>
						<div className='flex justify-between text-xl font-medium sm:text-base'>
							<span className={isPreparing ? 'text-dark-green' : ''}>Preparing</span>
							<span className={isShipped ? 'text-dark-green' : ''}>Shipped</span>
							<span className={isDelivered ? 'text-dark-green' : ''}>Delivered</span>
						</div>

						<div className='h-6.25 w-full border medium-gray rounded-full overflow-hidden'>
							<div
								className='h-full primary-blue rounded-full'
								style={{
									width: `${deliveryPercent}%`,
								}}
							></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
