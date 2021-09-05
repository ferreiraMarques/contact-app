import './App.css';

import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import ContactDetail from "./components/ContactDetail";
import EditContact from "./components/EditContact";

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import contacts_api from "./api/contacts";

function App() {

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retriveContacts = async () => {
    const response = await contacts_api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: contacts.length + 1,
      ...contact
    };
    const response = await contacts_api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  }

  const removeContactHandler = async (id) => {
    await contacts_api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  const updateContactHandler = async (contact) => {
    const response = await contacts_api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;

    setContacts(contacts.map((contact) => {
      return contact.id === id ? { ...response.data } : contact;
    }))
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object
          .values(contact)
          .join(" ")
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  }

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    }

    getAllContacts();
  }, []);



  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Switch>

          <Route path="/" exact
            render={(props) => <ContactList
              {...props}
              contacts={searchTerm.length < 1 ? contacts : searchResults}
              getContactId={removeContactHandler}
              term={searchTerm}
              searchKeyWord={searchHandler}
            />} />

          <Route path="/add"
            render={(props) => <AddContact {...props} addContactHandler={addContactHandler} />} />

          <Route path="/contact/:id" component={ContactDetail} />

          <Route path="/edit"
            render={(props) => <EditContact {...props} updateContactHandler={updateContactHandler} />} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
