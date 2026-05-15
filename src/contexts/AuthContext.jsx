import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Check if user is already logged in on app load
	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			verifyToken(token);
		} else {
			setLoading(false);
		}
	}, []);

	const verifyToken = async (token) => {
		try {
			// Attach token for verification call
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			const response = await axios.post('/api/auth/verify');
			setUser(response.data.user);
		} catch (err) {
			localStorage.removeItem('authToken');
			setUser(null);
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const register = async (email, password, name) => {
		setError(null);
		try {
			const response = await axios.post('/api/auth/register', {
				email,
				password,
				name,
			});
			localStorage.setItem('authToken', response.data.token);
			// set default header for subsequent requests
			axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
			setUser(response.data.user);
			return response.data;
		} catch (err) {
			const errorMessage = err.response?.data?.error || 'Registration failed';
			setError(errorMessage);
			throw new Error(errorMessage);
		}
	};

	const login = async (email, password) => {
		setError(null);
		try {
			const response = await axios.post('/api/auth/login', {
				email,
				password,
			});
			localStorage.setItem('authToken', response.data.token);
			// set default header for subsequent requests
			axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
			setUser(response.data.user);
			return response.data;
		} catch (err) {
			const errorMessage = err.response?.data?.error || 'Login failed';
			setError(errorMessage);
			throw new Error(errorMessage);
		}
	};

	const logout = () => {
		localStorage.removeItem('authToken');
		// remove default header
		delete axios.defaults.headers.common['Authorization'];
		setUser(null);
		setError(null);
	};

	const value = {
		user,
		loading,
		error,
		register,
		login,
		logout,
		isAuthenticated: !!user,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
}
