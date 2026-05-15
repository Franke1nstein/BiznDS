import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';
export function OrderSummary({ deliveryOptions, cart, loadCart }) {
	return (
		<div className='order-summary lg:row-start-1'>
			{deliveryOptions.length > 0 &&
				cart.map((cartItem) => {
					return (
						<div
							key={cartItem.productId}
							className='cart-item-container border border-[#dedede] rounded-sm p-4.5 mb-3'
						>
							<DeliveryDate deliveryOptions={deliveryOptions} cartItem={cartItem} />

							<div className='cart-item-details-grid grid grid-cols-[100px_1fr_1fr] gap-x-6.25 lg:grid-cols-[100px_1fr] lg:gap-y-7.5'>
								<CartItemDetails cartItem={cartItem} loadCart={loadCart} />

								<DeliveryOptions
									cartItem={cartItem}
									deliveryOptions={deliveryOptions}
									loadCart={loadCart}
								/>
							</div>
						</div>
					);
				})}
		</div>
	);
}
