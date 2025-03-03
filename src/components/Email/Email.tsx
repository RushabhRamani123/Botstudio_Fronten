import { useState } from 'react';
import { Send, UserCircle, ChevronDown, Search, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const ContactEmailPage = () => {
  const [contacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', avatar: null },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', avatar: null },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Manager', avatar: null },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Product Owner', avatar: null },
    { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'Developer', avatar: null },
  ]);
  
  const [emailTemplates] = useState([
    {
      id: 1,
      name: 'Meeting Invitation',
      subject: 'Meeting Invitation: Project Update',
      body: 'Hi {name},\n\nI hope this email finds you well. I would like to schedule a meeting to discuss project updates.\n\nBest regards',
    },
    {
      id: 2,
      name: 'Follow Up',
      subject: 'Following up on our conversation',
      body: 'Hi {name},\n\nI wanted to follow up on our previous conversation regarding...\n\nBest regards',
    },
  ]);

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allFilteredSelected = filteredContacts.every(contact => 
    selectedContacts.some(c => c.id === contact.id)
  );

  const handleSelectAll = () => {
    if (allFilteredSelected) {
      setSelectedContacts(prev => 
        prev.filter(contact => 
          !filteredContacts.some(fc => fc.id === contact.id)
        )
      );
    } else {
      const newContacts = filteredContacts.filter(contact => 
        !selectedContacts.some(c => c.id === contact.id)
      );
      setSelectedContacts(prev => [...prev, ...newContacts]);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setEmailSubject(template.subject);
    setEmailBody(template.body);
  };

  const handleContactToggle = (contact) => {
    setSelectedContacts(prev => 
      prev.includes(contact) 
        ? prev.filter(c => c.id !== contact.id)
        : [...prev, contact]
    );
  };

  const removeContact = (contactToRemove) => {
    setSelectedContacts(prev => prev.filter(contact => contact.id !== contactToRemove.id));
  };

  const handleSendEmail = () => {
    console.log('Sending email to:', selectedContacts);
    console.log('Subject:', emailSubject);
    console.log('Body:', emailBody);
    alert('Email sent successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Email Composer</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact List */}
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Select Recipients</CardTitle>
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {allFilteredSelected ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {filteredContacts.map(contact => (
                  <div 
                    key={contact.id}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedContacts.includes(contact) ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleContactToggle(contact)}
                  >
                    <div className="bg-blue-100 rounded-full p-2 mr-4">
                      <UserCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{contact.email}</p>
                      <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full mt-1">
                        {contact.role}
                      </span>
                    </div>
                    <input 
                      type="checkbox"
                      checked={selectedContacts.includes(contact)}
                      onChange={() => {}}
                      className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Email Composition */}
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="text-lg font-semibold">Compose Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              {/* Template Selection */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Template</label>
                <div className="relative">
                  <select 
                    className="w-full p-2.5 border rounded-lg appearance-none bg-white pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => handleTemplateSelect(emailTemplates[e.target.value])}
                  >
                    <option value="">Choose a template...</option>
                    {emailTemplates.map((template, index) => (
                      <option key={template.id} value={index}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                <div className="p-3 border rounded-lg min-h-12 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  {selectedContacts.length === 0 ? (
                    <span className="text-gray-400">No recipients selected</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedContacts.map(contact => (
                        <span 
                          key={contact.id} 
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {contact.name}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeContact(contact);
                            }}
                            className="ml-2 hover:text-blue-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Enter email subject..."
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email Body */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={8}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full p-2.5 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your message here..."
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendEmail}
                disabled={selectedContacts.length === 0 || !emailSubject || !emailBody}
                className="w-full bg-blue-600 text-white p-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Send className="h-4 w-4" />
                Send Email
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactEmailPage;