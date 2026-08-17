import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(username, password);

    if (result.success) {
        navigate('/dashboard');
    } else {
        setError(result.error);
    }
    };

    return (
    <div className="auth-page">
        <div className="auth-card">

            <div className="auth-brand">
                <h1>Contact Book</h1>
                <p>Welcome back. Sign in to your contacts.</p>
            </div>

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >
                <input
                    className="auth-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <button
                    className="auth-button"
                    type="submit"
                >
                    Login
                </button>
            </form>

            <p className="auth-link">
                Don't have an account?{' '}
                <Link to="/register">
                    Create an account
                </Link>
            </p>

        </div>
    </div>
    );
}

export default Login;