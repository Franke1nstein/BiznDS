import api from '../../api';
import { useNavigate } from 'react-router';
import { formatMoney } from '../../utils/money';
export function PaymentSummary({ paymentSummary, loadCart }) {
	const navigate = useNavigate();
	const createOrder = async () => {
		await api.post('/api/orders');
		await loadCart();
		navigate('/orders');
	};

	return (
		<div className='payment-summary border border-[#dedede] rounded-sm p-4.5 pb-1.25 lg:row-start-1 lg:mb-3'>
			<div className='payment-summary-title font-bold text-[18px] mb-3'>Payment Summary</div>
			{paymentSummary && (
				<>
					<div className='payment-summary-row show-price'>
						<div>Items ({paymentSummary.totalItems}):</div>
						<div className='payment-summary-money text-right'>
							{formatMoney(paymentSummary.productCostCents)}
						</div>
					</div>

					<div className='payment-summary-row show-price'>
						<div>Shipping &amp; handling:</div>
						<div className='payment-summary-money text-right'>
							{formatMoney(paymentSummary.shippingCostCents)}
						</div>
					</div>

					<div className='payment-summary-row subtotal-row pt-2.25 show-price'>
						<div>Total before tax:</div>
						<div className='payment-summary-money text-right'>
							{formatMoney(paymentSummary.totalCostBeforeTaxCents)}
						</div>
					</div>

					<div className='payment-summary-row show-price'>
						<div>Estimated tax (10%):</div>
						<div className='payment-summary-money text-right'>
							{formatMoney(paymentSummary.taxCents)}
						</div>
					</div>

					<div className='payment-summary-row show-price total-row text-[#198754] font-bold text-[18px] border-t border-[#dedede] pt-4.5'>
						<div>Order total:</div>
						<div className='payment-summary-money text-right'>
							{formatMoney(paymentSummary.totalCostCents)}
						</div>
					</div>

					<button
						className='place-order-button w-full mt-5 mb-4.75 h-8 bg-green-600 rounded-full cursor-pointer'
						onClick={createOrder}
					>
						Place your order
					</button>
				</>
			)}
		</div>
	);
}
