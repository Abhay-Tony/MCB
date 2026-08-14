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

        try {
            if (selectedContact) {
                const response = await api.put(
                    `contacts/${selectedContact.id}/`,
                    formData
                );

                onContactUpdated(response.data);
            } else {
                const response = await api.post(
                    'contacts/',
                    formData
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
            console.error(error);
            setError('Failed to save contact.');
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
                <button type="submit" className="primary-button">
                    {selectedContact ? 'Update Contact' : 'Add Contact'}
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
                <p className="form-error">{error}</p>
            )}
        </form>
    </div>
);
}

export default ContactForm;