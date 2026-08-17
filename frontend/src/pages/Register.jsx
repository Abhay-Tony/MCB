import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/auth.css';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        // Check passwords before sending request
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        try {
            await api.post('register/', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            setSuccess(
                'Registration successful! Redirecting to login...'
            );

            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            console.error('Registration failed:', error);

            if (error.response?.data) {
                const errors = error.response.data;

                if (errors.username) {
                    setError(errors.username[0]);
                } else if (errors.email) {
                    setError(errors.email[0]);
                } else if (errors.password) {
                    setError(errors.password[0]);
                } else {
                    setError('Registration failed.');
                }
            } else {
                setError('Unable to connect to the server.');
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-brand">
                    <h1>Create Account</h1>
                    <p>
                        Create your account to start managing contacts.
                    </p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="auth-input"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="auth-input"
                        type="email"
                        name="email"
                        placeholder="Email (optional)"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        className="auth-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="auth-input"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="auth-success">
                            {success}
                        </div>
                    )}

                    <button
                        className="auth-button"
                        type="submit"
                    >
                        Create Account
                    </button>
                </form>

                <p className="auth-link">
                    Already have an account?{' '}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;