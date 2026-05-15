import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { Header } from '../../Components/Header';

export function RegisterPage({ cart }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { register } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		// Validation
		if (!email || !password || !name || !confirmPassword) {
			setError('Please fill in all fields');
			return;
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		if (password.length < 6) {
			setError('Password must be at least 6 characters');
			return;
		}

		try {
			setLoading(true);
			await register(email, password, name);
			navigate('/');
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<title>Register - Ecommerce Project</title>
			<Header cart={cart} />
			<div className='mt-15 min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md bg-white rounded-lg shadow-md p-8'>
					<h2 className='text-2xl font-bold text-center mb-6 text-gray-900'>Create Account</h2>

					{error && (
						<div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
								Full Name
							</label>
							<input
								id='name'
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
								placeholder='Enter your full name'
							/>
						</div>

						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
								Email
							</label>
							<input
								id='email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
								placeholder='Enter your email'
							/>
						</div>

						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
								Password
							</label>
							<input
								id='password'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
								placeholder='Enter your password'
							/>
						</div>

						<div>
							<label
								htmlFor='confirmPassword'
								className='block text-sm font-medium text-gray-700 mb-1'
							>
								Confirm Password
							</label>
							<input
								id='confirmPassword'
								type='password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
								placeholder='Confirm your password'
							/>
						</div>

						<button
							type='submit'
							disabled={loading}
							className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{loading ? 'Creating Account...' : 'Register'}
						</button>
					</form>

					<p className='mt-6 text-center text-sm text-gray-600'>
						Already have an account?{' '}
						<Link to='/login' className='text-blue-500 hover:text-blue-700 font-medium'>
							Login here
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
