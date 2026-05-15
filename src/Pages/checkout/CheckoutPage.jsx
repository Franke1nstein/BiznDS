import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSumary';
import { PaymentSummary } from './PaymentSummary';
window.axios = axios;
export function CheckoutPage({ cart, loadCart }) {
	const [deliveryOptions, setDeliveryOptions] = useState([]);
	const [paymentSummary, setPaymentSummary] = useState(null);

	useEffect(() => {
		const fetchCheckoutData = async () => {
			const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
			setDeliveryOptions(response.data);
		};
		fetchCheckoutData();
	}, []);

	useEffect(() => {
		const fecthPaymentSummary = async () => {
			const response = await await axios.get('/api/payment-summary');
			setPaymentSummary(response.data);
		};
		fecthPaymentSummary();
	}, [cart]);
	return (
		<>
			<title>Checkout</title>
			<link rel='icon' href='logo.jpg' />
			<CheckoutHeader cart={cart} />
			<div className='checkout-page max-w-275 px-7.5 mt-35 mb-25 mx-auto'>
				<div className='page-title text-[22px] font-bold mb-4.5'>Review your order</div>

				<div className='checkout-grid grid grid-cols-[1fr_350px] gap-x-3 items-start justify-end '>
					<OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

					<PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
				</div>
			</div>
		</>
	);
}
