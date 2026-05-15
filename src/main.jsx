import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import api from './api.jsx';

import App from './App.jsx';

// Global axios request interceptor: attach token from localStorage to every request.
// This covers cases where components fire requests before AuthProvider effects run.
api.interceptors.request.use(
	(config) => {
		try {
			const token = localStorage.getItem('authToken');
			if (token) {
				config.headers = config.headers || {};
				config.headers.Authorization = `Bearer ${token}`;
			}
		} catch {
			// ignore localStorage errors
		}
		return config;
	},
	(error) => Promise.reject(error)
);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
