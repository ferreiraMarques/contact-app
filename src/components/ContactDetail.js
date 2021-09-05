import React from 'react'
import { Link } from "react-router-dom";

export default function ContactDetail(props) {
    const contact = props.location.state.contact;

    return (
        <div className="main" style={{ padding: "2rem", }}>
            <div className="ui card centered">
                <div className="content">
                    <div className="header">{contact.name}</div>
                    <div className="description">{contact.email}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to="/">
                    <button className="ui button blue center">Back to Contact List</button>
                </Link>
            </div>
        </div>
    )
}
