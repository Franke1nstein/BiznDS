import { useState } from 'react';
import { formatMoney } from '../../utils/money';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Product({ product, loadCart }) {
	const { isAuthenticated } = useAuth();
	const [quantity, setQuantity] = useState(1);
	const [showAddedMessage, setShowAddedMessage] = useState(false);
	const navigate = useNavigate();
	const redirectToLogin = () => {
		navigate('/login');
	};
	const addToCart = async () => {
		if (!isAuthenticated) {
			redirectToLogin();
			return;
		}
		await axios.post('/api/cart-items', {
			productId: product.id,
			quantity: quantity,
		});
		await loadCart();
		setShowAddedMessage(true);

		setTimeout(() => {
			setShowAddedMessage(false);
		}, 2000);
	};
	const selectedQuantity = (event) => {
		const quantitySelected = Number(event.target.value);
		setQuantity(quantitySelected);
	};

	return (
		<div
			className='flex flex-col pt-10 pb-6 pl-6 pr-6 group hover:highlight-product'
			data-testid='product-container'
		>
			<div className='flex justify-center items-center h-45 mb-5'>
				<img
					className='max-w-full max-h-full rounded'
					src={product.image}
					data-testid='product-image'
				/>
			</div>

			<div className='h-10 mb-1.5 limit-text-to-2-lines'>{product.name}</div>

			<div className='flex items-center mb-2.5'>
				<img
					className='w-[80%] mr-1.5 pt-1.5'
					data-testid='product-rating-stars-image'
					src={`images/ratings/rating-${product.rating.stars * 10}.png`}
				/>
				<div className='text-[rgb(25, 135, 84)] cursor-auto mt-0.75 link-primary '>
					{product.rating.count}
				</div>
			</div>

			<div className='text-[20px] mb-2.5'>{formatMoney(product.priceCents)}</div>

			<div className='mb-4'>
				<select
					value={quantity}
					onChange={selectedQuantity}
					data-testid='product-quantity-selector'
				>
					<option value='1'>1</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
					<option value='4'>4</option>
					<option value='5'>5</option>
					<option value='6'>6</option>
					<option value='7'>7</option>
					<option value='8'>8</option>
					<option value='9'>9</option>
					<option value='10'>10</option>
				</select>
			</div>

			<div className='flex-1'></div>

			<div
				className='flex items-center mb-2 text-[#198754] text-[16px] opacity-0'
				style={{
					opacity: showAddedMessage ? 1 : 0,
				}}
			>
				<img src='images/icons/checkmark.png' className='h-5 mr-1.5' />
				Added
			</div>

			<button
				className={`w-full h-8 mt-px rounded-full transition-all duration-200 
               ${
									!isAuthenticated ?
										'bg-gray-300 opacity-50 cursor-pointer group-hover:bg-gray-600 group-hover:opacity-100'
									:	'bg-[#198754] text-white cursor-pointer opacity-0 group-hover:opacity-100'
								}`}
				onClick={!isAuthenticated ? redirectToLogin : addToCart}
				data-testid='add-to-cart-button'
			>
				{isAuthenticated ? 'Add to Cart' : 'Log in to Buy'}
			</button>
		</div>
	);
}
