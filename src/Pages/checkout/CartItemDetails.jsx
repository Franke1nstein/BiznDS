import axios from 'axios';
import { useState } from 'react';
import { formatMoney } from '../../utils/money';
export function CartItemDetails({ cartItem, loadCart }) {
	const [quantity, setQuantity] = useState(cartItem.quantity);
	const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);

	const deleteCartItem = async () => {
		await axios.delete(`/api/cart-items/${cartItem.productId}`);
		await loadCart();
	};
	const handleQuantityKeyDown = (event) => {
		const keyPressed = event.key;

		if (keyPressed === 'Enter') {
			updateQuantity();
		} else if (keyPressed === 'Escape') {
			setQuantity(cartItem.quantity);
			setIsUpdatingQuantity(false);
		}
	};
	const updateQuantity = async () => {
		if (isUpdatingQuantity) {
			await axios.put(`/api/cart-items/${cartItem.productId}`, {
				quantity: Number(quantity),
			});
			await loadCart();
			setIsUpdatingQuantity(false);
		} else {
			setIsUpdatingQuantity(true);
		}
	};
	const selectedQuantity = (event) => {
		const quantitySelected = Number(event.target.value);
		setQuantity(quantitySelected);
	};

	return (
		<>
			<img className='product-image max-w-full max-h-30 mx-auto' src={cartItem.product.image} />

			<div className='cart-item-details'>
				<div className='product-name font-bold mb-2'>{cartItem.product.name}</div>
				<div className='product-price font-bold mb-1.25'>
					{formatMoney(cartItem.product.priceCents)}
				</div>
				<div className='product-quantity'>
					<span>
						Quantity:{' '}
						{isUpdatingQuantity ?
							<input
								type='text'
								className='quantity-textbox w-12.5'
								onChange={selectedQuantity}
								onKeyDown={handleQuantityKeyDown}
								value={quantity}
							/>
						:	<span className='quantity-label'>{quantity}</span>}
					</span>
					<span
						className='update-quantity-link link-primary ml-0.75 hover:text-[#007dff]'
						onClick={updateQuantity}
					>
						Update
					</span>
					<span
						className='delete-quantity-link link-primary ml-0.75 hover:text-[#007dff]'
						onClick={deleteCartItem}
					>
						Delete
					</span>
				</div>
			</div>
		</>
	);
}
