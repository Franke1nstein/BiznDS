import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function Header({ cart }) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { user, logout, loading, isAuthenticated } = useAuth();

	const searchText = searchParams.get('search');
	const [search, setSearch] = useState(searchText || '');

	const updateSearchInput = (event) => {
		setSearch(event.target.value);
	};

	const searchProducts = () => {
		navigate(`/?search=${search}`);
	};

	let totalQuantity = 0;
	if (cart) {
		cart.forEach((cartItem) => {
			totalQuantity += cartItem.quantity;
		});
	}

	return (
		<header className='fixed top-0 left-0 right-0 h-15 bg-[rgb(0,125,255)] pl-3.75 pr-3.75 flex items-center justify-between z-50'>
			{/* Logo et Home */}
			<div className='w-auto flex items-center justify-between'>
				<img src='images/logo.jpg' alt='Logo' className='h-10.5 md:block hidden' />
				<Link
					to='/'
					className='text-white text-[25px] ml-2.5 items-center cursor-pointer highlight-link px-1.5'
				>
					Home
				</Link>
			</div>

			{/* Barre de recherche */}
			<div className='flex-1 max-w-210 ml-2.5 mr-2.5 flex align-middle'>
				<input
					type='text'
					className='flex-1 text-base h-10 pl-3.75 bg-white rounded-tl-[5px] rounded-bl-[5px]'
					placeholder='Search'
					value={search}
					onChange={updateSearchInput}
				/>
				<button
					className='bg-[#198754] w-11.25 h-10 rounded-tr-[5px] rounded-br-[5px] shrink-0 highlight-link cursor-pointer'
					onClick={searchProducts}
				>
					<img src='images/icons/search-icon.png' alt='Search' className='h-5 ml-2.5 mt-0.75' />
				</button>
			</div>

			{/* Navigation utilisateur et Panier */}
			<div className='w-auto shrink flex items-center'>
				{!loading &&
					(isAuthenticated && user ?
						<>
							<div className='text-black flex items-center px-1.5 py-2.5'>
								<span className='text-sm font-bold'>Hello, {user.name}</span>
							</div>
							<button
								className='text-black text-sm font-bold cursor-pointer no-underline highlight-link px-1.5 py-2.5'
								onClick={() => {
									logout();
									navigate('/');
								}}
							>
								<img
									src='/images/icons/logOut.jpg'
									alt='Logout'
									className='w-8 bg-[rgb(0,125,255)] rounded-full object-contain'
								/>
							</button>
						</>
					:	<>
							<Link
								className='text-white inline-block text-sm font-bold cursor-pointer no-underline highlight-link px-1.5 py-2.5'
								to='/login'
							>
								Login
							</Link>
							<Link
								className='text-white inline-block text-sm font-bold cursor-pointer no-underline highlight-link px-1.5 py-2.5'
								to='/register'
							>
								Register
							</Link>
						</>)}

				{user && (
					<Link
						className='text-white inline-block text-sm font-bold cursor-pointer no-underline highlight-link px-1.5 py-2.5'
						to='/orders'
					>
						Orders
					</Link>
				)}

				<Link
					className='text-white flex items-center relative cursor-pointer px-1.5 py-1 highlight-link'
					to='/checkout'
				>
					<img src='images/icons/cart-icon.png' alt='Cart' className='w-9.5' />
					<span className='ml-1.25 text-sm font-bold'>Cart</span>
					<span className='text-[rgb(8,79,45)] text-sm font-bold absolute pb-3 pl-2 right-11.5 w-6.5 text-center'>
						{totalQuantity}
					</span>
				</Link>
			</div>
		</header>
	);
}
