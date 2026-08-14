function ContactList({
    contacts,
    selectedContact,
    onSelectContact,
}) {
    return (
        <div className="contact-list">
            {contacts.length === 0 ? (
                <p className="empty-list">No contacts found.</p>
            ) : (
                contacts.map((contact) => (
                    <button
                        key={contact.id}
                        className={`contact-item ${
                            selectedContact?.id === contact.id
                                ? 'selected'
                                : ''
                        }`}
                        onClick={() => onSelectContact(contact)}
                    >
                        <strong>{contact.name}</strong>
                        <span>{contact.company || 'No company'}</span>
                    </button>
                ))
            )}
        </div>
    );
}

export default ContactList;