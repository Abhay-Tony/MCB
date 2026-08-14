import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ContactList from '../components/ContactList';
import ContactDetails from '../components/ContactDetails';
import ContactForm from '../components/ContactForm';
import '../styles/dashboard.css';


function Dashboard() {

const { logout } = useAuth();
const navigate = useNavigate();
const [contacts, setContacts] = useState([]);
const [selectedContact, setSelectedContact] = useState(null);
const [search, setSearch] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await api.get('contacts/');
                setContacts(response.data);
            } catch (error) {
                console.error('Failed to fetch contacts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
);

    const handleLogout = () => {
    logout();
    navigate('/login');
};

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
    <div className="dashboard">
        <header className="dashboard-header">
            <h1>Contact Book</h1>

            <button 
            className="logout-button" 
            onClick={handleLogout}
            >
                Logout
            </button>
        </header>

        {error && (
            <div className="error-message">
                {error}
            </div>
        )}

        <div className="contact-book">

            {/* LEFT SIDE */}
            <div className="contact-sidebar">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search contacts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <ContactList
                    contacts={filteredContacts}
                    selectedContact={selectedContact}
                    onSelectContact={setSelectedContact}
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="contact-main">

                <ContactForm
                    selectedContact={selectedContact}
                    onContactAdded={(newContact) => {
                        setContacts((prev) =>
                            [...prev, newContact].sort((a, b) =>
                                a.name.localeCompare(b.name)
                            )
                        );
                        setSelectedContact(newContact);
                    }}
                    onContactUpdated={(updatedContact) => {
                        setContacts((prev) =>
                            prev
                                .map((contact) =>
                                    contact.id === updatedContact.id
                                        ? updatedContact
                                        : contact
                                )
                                .sort((a, b) =>
                                    a.name.localeCompare(b.name)
                                )
                        );
                        setSelectedContact(updatedContact);
                    }}
                    onCancelEdit={() => setSelectedContact(null)}
                />

                <ContactDetails
                    contact={selectedContact}
                    onDeleteContact={async (contactId) => {
                        try {
                            await api.delete(`contacts/${contactId}/`);

                            setContacts((prev) =>
                                prev.filter(
                                    (contact) => contact.id !== contactId
                                )
                            );

                            setSelectedContact(null);
                        } catch (error) {
                            console.error(
                                'Failed to delete contact:',
                                error
                            );
                            setError('Failed to delete contact.');
                        }
                    }}
                />

            </div>

        </div>
    </div>
);
}

export default Dashboard;