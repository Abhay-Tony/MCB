import { useEffect, useState } from 'react';
import api from '../services/api';

function ContactForm({
    selectedContact,
    onContactAdded,
    onContactUpdated,
    onCancelEdit,
}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedContact) {
            setFormData({
                name: selectedContact.name || '',
                email: selectedContact.email || '',
                phone: selectedContact.phone || '',
                company: selectedContact.company || '',
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
            });
        }

        setError('');
    }, [selectedContact]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Name validation
        if (!formData.name.trim()) {
            setError('Name is required.');
            return;
        }

        // Email validation
        if (formData.email.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(formData.email.trim())) {
                setError('Please enter a valid email address.');
                return;
            }
        }

        // Phone validation
        const phonePattern = /^\d{10}$/;

        if (formData.phone.trim()) {
            if (!phonePattern.test(formData.phone.trim())) {
                setError('Phone number must contain exactly 10 digits.');
                return;
            }
        }

        const cleanedData = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            company: formData.company.trim(),
        };

        try {
            if (selectedContact) {
                const response = await api.put(
                    `contacts/${selectedContact.id}/`,
                    cleanedData
                );

                onContactUpdated(response.data);
            } else {
                const response = await api.post(
                    'contacts/',
                    cleanedData
                );

                onContactAdded(response.data);

                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                });
            }
        } catch (error) {
            console.error('Failed to save contact:', error);

            if (error.response?.data) {
                const errors = error.response.data;

                if (errors.name) {
                    setError(errors.name[0]);
                } else if (errors.email) {
                    setError(errors.email[0]);
                } else if (errors.phone) {
                    setError(errors.phone[0]);
                } else {
                    setError('Failed to save contact.');
                }
            } else {
                setError('Unable to connect to the server.');
            }
        }
    };

    return (
        <div className="contact-form">
            <h2>
                {selectedContact ? 'Edit Contact' : 'Add Contact'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-buttons">
                    <button
                        type="submit"
                        className="primary-button"
                    >
                        {selectedContact
                            ? 'Update Contact'
                            : 'Add Contact'}
                    </button>

                    {selectedContact && (
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onCancelEdit}
                        >
                            Cancel
                        </button>
                    )}
                </div>

                {error && (
                    <p className="form-error">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}

export default ContactForm;