import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import car from '../../assets/images/car-evaluation-background.jpg';
import './login.css';
import { api } from "../../api/constant"

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch(`${api}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    // Validation errors
                    setErrors(data.errors || {});
                } else if (response.status === 401) {
                    setErrors({ general: 'Invalid email or password' });
                } else {
                    throw new Error(data.message || 'Login failed');
                }
                return;
            }

            // Login successful - store token and redirect
            localStorage.setItem('authToken', data.token);
            navigate('/home')

        } catch (error) {
            console.error('Login error:', error);
            setErrors({ general: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${car})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: '80px'
        }}>
            <form className="form" onSubmit={handleSubmit}>
                <span className="input-span mt-3">
                    <label htmlFor="email" className="label">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email[0]}</span>}
                </span>
                <span className="input-span">
                    <label htmlFor="password" className="label">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="error">{errors.password[0]}</span>}
                </span>
                {errors.general && <div className="error-message">{errors.general}</div>}
                <span className="span">Forgot password?</span>
                <button
                    className="submit"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Logging in...' : 'Log in'}
                </button>
                <span className="span mb-4">Don't have an account? <Link to="/sign-up">Sign up</Link></span>
            </form>
        </div>
    );
};

export default Login;