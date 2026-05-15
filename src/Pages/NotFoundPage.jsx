import { Header } from '../Components/Header';

export function NotFoundPage({ cart }) {
	return (
		<>
			<title>404 Page Not Found</title>
			<link rel='icon' type='image/svg+xml' href='home-favicon.png' />

			<Header cart={cart} />

			<div className='mt-37.5 text-center text-[48px] text-black'>Sorry! Page not found.</div>
		</>
	);
}
