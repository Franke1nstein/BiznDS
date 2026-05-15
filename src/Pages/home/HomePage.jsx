import axios from 'axios';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Header } from '../../Components/Header';
import { ProductsGrid } from './productsGrid';

export function HomePage({ cart, loadCart }) {
	const [products, setProducts] = useState([]);
	const [searchParams] = useSearchParams();
	const search = searchParams.get('search');

	useEffect(() => {
		const getHomeData = async () => {
			const urlPath = search ? `/api/products?search=${search}` : '/api/products';
			const response = await axios.get(urlPath);
			setProducts(response.data);
		};
		getHomeData();
	}, [search]);

	return (
		<>
			<title>Ecommerce Project</title>
			<link rel='icon' href='logo.jpg' />
			<Header cart={cart} />
			<div className='mt-15'>
				<ProductsGrid products={products} loadCart={loadCart} />
			</div>
		</>
	);
}
