import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import car from '../../assets/images/car-evaluation-background.jpg';
import { api } from "../../api/constant"

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
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
            const response = await fetch(`${api}/auth/register`, {
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
                } else {
                    throw new Error(data.message || 'Registration failed');
                }
                return;
            }

            // Registration successful
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
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
                <div className='d-flex gap-2 mt-2' style={{ width: "400px" }}>
                    <span className="input-span">
                        <label htmlFor="name" className="label">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error">{errors.name[0]}</span>}
                    </span>
                    <span className="input-span">
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
                </div>
                <span className="input-span">
                    <label htmlFor="phone" className="label">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <span className="error">{errors.phone[0]}</span>}
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
                <span className="input-span">
                    <label htmlFor="password_confirmation" className="label">Password Confirmation</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                    />
                </span>
                {errors.general && <div className="error-message">{errors.general}</div>}
                <button
                    className="submit"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
                <span className="span mb-4">Do you have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    );
};

export default SignUp;