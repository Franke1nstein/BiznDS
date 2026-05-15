import { it, expect, describe, vi, BeforeEach, beforeEach } from 'vitest';
import { Product } from './Product';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');

describe('Poduct components', () => {
	let product = {
		id: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
		image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
		name: 'Adults Plain Cotton T-Shirt - 2 Pack',
		rating: {
			stars: 4.5,
			count: 56,
		},
		priceCents: 799,
		keywords: ['tshirts', 'apparel', 'mens'],
	};
	let loadCart;
	let user;

	beforeEach(() => {
		product = {
			id: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
			image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
			name: 'Adults Plain Cotton T-Shirt - 2 Pack',
			rating: {
				stars: 4.5,
				count: 56,
			},
			priceCents: 799,
			keywords: ['tshirts', 'apparel', 'mens'],
		};
		loadCart = vi.fn();
		user = userEvent.setup();
	});
	it('display products details correctly', () => {
		render(<Product product={product} loadCart={loadCart} />);
		expect(screen.getByText('Adults Plain Cotton T-Shirt - 2 Pack')).toBeInTheDocument();
		expect(screen.getByText('$7.99')).toBeInTheDocument();
		expect(screen.getByTestId('product-image')).toHaveAttribute(
			'src',
			'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg'
		);
		expect(screen.getByTestId('product-rating-stars-image')).toHaveAttribute(
			'src',
			'images/ratings/rating-45.png'
		);
		expect(screen.getByText('56')).toBeInTheDocument();
	});

	it('add a product to the cart', async () => {
		render(<Product product={product} loadCart={loadCart} />);

		const addToCartButton = screen.getByTestId('add-to-cart-button');
		await user.click(addToCartButton);

		expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
			productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
			quantity: 1,
		});
		expect(loadCart).toHaveBeenCalledWith();
	});
	it('quantity selector test', async () => {
		render(<Product product={product} loadCart={loadCart} />);

		const quantitySelector = screen.getByTestId('product-quantity-selector');
		await user.selectOptions(quantitySelector, '3');

		const addToCartButton = screen.getByTestId('add-to-cart-button');
		await user.click(addToCartButton);

		expect(quantitySelector).toHaveValue('3');
		expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
			productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
			quantity: 3,
		});
		expect(loadCart).toHaveBeenCalledWith();
	});
});
