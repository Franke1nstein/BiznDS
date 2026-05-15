import { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import dayjs from 'dayjs';
import { useAuth } from '../../contexts/AuthContext.jsx';
export function OrderDetailsGrid({ order, loadCart }) {
	const { isAuthenticated } = useAuth(); // 2. Get Auth status
	const [addingId, setAddingId] = useState(null);
	return (
		<div className='order-details-grid group'>
			{order.products.map((orderProduct) => {
				const productId = orderProduct.product.id;
				const handleBuyAgain = async () => {
					if (!isAuthenticated) {
						alert('Please log in to add items to your cart.');
						return;
					}

					setAddingId(productId);
					try {
						await axios.post('/api/cart-items', {
							productId: productId,
							quantity: 1,
						});
						await loadCart();
					} catch (err) {
						console.error('Failed to add item', err);
					} finally {
						setAddingId(null);
					}
				};

				return (
					<Fragment key={orderProduct.product.id}>
						<div className='product-image-container text-center max-[450px]:mb-6.25'>
							<img
								src={orderProduct.product.image}
								className='max-w-27.5 max-h-27.5 mx-auto max-[450px]:max-w-37.5 max-[450px]:max-h-37.5'
							/>
						</div>
						<div className='product-details group'>
							<div className='product-name font-bold mb-1.25 max-[450px]:mb-2.5'>
								{orderProduct.product.name}
							</div>
							<div className='product-delivery-date mb-0.75'>
								Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
							</div>
							<div className='product-quantity mb-2 max-[450px]:mb-3.75'>
								Quantity: {orderProduct.quantity}
							</div>
							<button
								className={`buy-again-button flex items-center justify-center transition-all
                           ${!isAuthenticated ? 'opacity-50 cursor-not-allowed bg-gray-200' : ''}
                           ${addingId === productId ? 'brightness-90' : ''}`}
								onClick={handleBuyAgain}
								disabled={addingId === productId || !isAuthenticated}
							>
								<img
									className={`buy-again-icon w-5 mr-2.5 ${addingId === productId ? 'animate-spin' : ''}`}
									src={
										addingId === productId ?
											'images/icons/Loading_icon.gif'
										:	'images/icons/buy-again.png'
									}
								/>
								<span className='buy-again-message'>
									{addingId === productId ? 'Adding...' : 'Buy it again'}
								</span>
							</button>
						</div>
						<div
							className='product-actions self-start max-[800px]:col-start-2 max-[800px]:mb-7.5 
              max-[450px]:col-auto max-[450px]:mb-17.5 '
						>
							<Link to={`/tracking/${order.id}/${orderProduct.productId}`}>
								<button className='track-package-button '>Track package</button>
							</Link>
						</div>
					</Fragment>
				);
			})}
		</div>
	);
}
