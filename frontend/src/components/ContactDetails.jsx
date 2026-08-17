function ContactDetails({ contact, onDeleteContact }) {
    if (!contact) {
        return (
            <div className="contact-details empty-details">
                <h2>Select a contact</h2>
                <p>
                    Choose a contact from the list to view their details.
                </p>
            </div>
        );
    }

    const getInitials = (name) => {
        return name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0].toUpperCase())
            .join('');
    };

    const handleDelete = () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${contact.name}?`
        );

        if (confirmed) {
            onDeleteContact(contact.id);
        }
    };

    return (
        <div className="contact-details">

            <div className="profile-section">

                <div className="contact-avatar">
                    {getInitials(contact.name)}
                </div>

                <div>
                    <h2>{contact.name}</h2>

                    <p className="company-name">
                        {contact.company || 'No company'}
                    </p>
                </div>

            </div>

            <div className="details-list">

                <div className="detail-item">
                    <span>Email</span>

                    {contact.email ? (
                        <a
                            href={`mailto:${contact.email}`}
                        >
                            {contact.email}
                        </a>
                    ) : (
                        <strong>Not provided</strong>
                    )}
                </div>

                <div className="detail-item">
                    <span>Phone</span>

                    {contact.phone ? (
                        <a
                            href={`tel:${contact.phone}`}
                        >
                            {contact.phone}
                        </a>
                    ) : (
                        <strong>Not provided</strong>
                    )}
                </div>

            </div>

            <button
                className="delete-button"
                onClick={handleDelete}
            >
                Delete Contact
            </button>

        </div>
    );
}

export default ContactDetails;