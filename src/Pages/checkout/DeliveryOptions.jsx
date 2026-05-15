import { formatMoney } from '../../utils/money';
import axios from 'axios';
import dayjs from 'dayjs';
export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
	return (
		<div className='delivery-options lg:col-span-2'>
			<div className='delivery-options-title font-bold mb-2.5'>Choose a delivery option:</div>
			{deliveryOptions.map((deliveryOption) => {
				let priceString = 'FREE Shiping';

				if (deliveryOption.priceCents > 0) {
					priceString = `${formatMoney(deliveryOption.priceCents)}- Shipping`;
				}
				const updateDeliveryOption = async () => {
					await axios.put(`/api/cart-items/${cartItem.productId}`, {
						deliveryOptionId: deliveryOption.id,
					});
					await loadCart();
				};
				return (
					<div
						key={deliveryOption.id}
						className='delivery-option grid grid-cols-[24px_1fr] mb-3 cursor-pointer'
						onClick={updateDeliveryOption}
					>
						<input
							type='radio'
							checked={deliveryOption.id === cartItem.deliveryOptionId}
							onChange={() => {}}
							className='delivery-option-input mt-0.75 mr-1.25 mb-0 ml-0 cursor-pointer'
							name={`delivery-option-${cartItem.productId}`}
						/>
						<div>
							<div className='delivery-option-date font-medium mb-0.75'>
								{dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd,MMMM D')}
							</div>
							<div className='delivery-option-price text-[#787878] text-[15px]'>{priceString}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
