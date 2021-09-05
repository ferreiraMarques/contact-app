import React, { useRef } from 'react'
import ContactCard from './ContactCard'
import { Link } from "react-router-dom";

export default function ContactList(props) {

    const inputEle = useRef("")

    const deleteHandler = (id) => {
        props.getContactId(id);
    }

    const getSearchTerm = () => {
        props.searchKeyWord(inputEle.current.value);
    }

    const contactList = props.contacts.map((contact) => {
        return (
            <ContactCard
                contact={contact}
                clickHandler={deleteHandler}
                key={contact.id} />
        )
    });

    return (
        <div className="main" style={{ padding: "2rem", }}>
            <h2>
                Contact list
                <Link to="/add">
                    <button className="ui right floated button blue">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui fluid icon input">
                    <input ref={inputEle} type="text" placeholder="Search contact" className="prompt"
                        value={props.term} onChange={getSearchTerm} />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {contactList.length > 0 ? contactList : "No contacts available"}
            </div>
        </div>
    )
}
