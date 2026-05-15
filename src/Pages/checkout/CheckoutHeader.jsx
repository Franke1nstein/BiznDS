import { Link } from 'react-router';

export function CheckoutHeader({ cart }) {
	let totalQuantity = 0;
	cart.forEach((cartItem) => {
		totalQuantity += cartItem.quantity;
	});
	return (
		<div
			className='fixed flex-center pl-4 pr-4 text-white top-0 left-0 right-0 h-15 bg-[rgb(0,125,255)]
		max-[800px]:w-auto'
		>
			<div className='w-52 flex items-center justify-between max-[800px]:w-auto '>
				<Link
					to='/'
					className='text-white px-2 py-1 rounded-sm cursor-pointer no-underline flex items-center highlight-link transition-colors max-[800px]:'
				>
					<img className='h-10.5 mt-px max-md:hidden' src='images/logo-white.jpg' alt='Logo' />
					<span className='text-white text-[25px] px-1.5 ml-2.5'>Home</span>
				</Link>
			</div>

			<div className='flex-1 shrink-0 text-center text-[22px] font-medium flex justify-center'>
				Checkout (
				<Link className='text-primary-blue hover:underline ml-1 mr-1 text-black' to='/'>
					{totalQuantity} item(s)
				</Link>
				)
			</div>

			<div className='w-45 shrink-0 flex justify-end'>
				<Link
					className='text-white px-1.5 py-2.5 rounded-sm cursor-pointer no-underline highlight-link transition-colors'
					to='/orders'
				>
					<span className='text-sm font-bold'>Orders</span>
				</Link>
			</div>
		</div>
	);
}
