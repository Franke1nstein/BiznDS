import { Product } from './Product';

export function ProductsGrid({ products, loadCart }) {
	return (
		<>
			<div className='grid mapping-product'>
				{products.map((product) => {
					return <Product key={product.id} product={product} loadCart={loadCart} />;
				})}
			</div>
		</>
	);
}
