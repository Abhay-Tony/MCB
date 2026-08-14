function ContactDetails({ contact, onDeleteContact }) {
    if (!contact) {
        return (
            <div className="contact-details empty-details">
                <h2>Select a contact</h2>
                <p>Choose a contact from the list to view their details.</p>
            </div>
        );
    }

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
            <div className="details-header">
                <h2>{contact.name}</h2>

                <button
                    className="delete-button"
                    onClick={handleDelete}
                >
                    Delete Contact
                </button>
            </div>

            <div className="details-list">
                <div className="detail-item">
                    <span>Email</span>
                    <strong>
                        {contact.email || 'Not provided'}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>Phone</span>
                    <strong>
                        {contact.phone || 'Not provided'}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>Company</span>
                    <strong>
                        {contact.company || 'Not provided'}
                    </strong>
                </div>
            </div>
        </div>
    );
}

export default ContactDetails;