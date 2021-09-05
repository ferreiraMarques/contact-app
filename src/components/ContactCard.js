import React from 'react'
import { Link } from "react-router-dom";

export default function ContactCard(props) {
    const { id, name, email } = props.contact;
    
    return (
        <div className="item" key={id} style={{ padding: "2rem", }}>
            <div className="content">
                <Link to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}>
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </Link>

                <i className="trash alternate outline icon right floated"
                    style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
                    onClick={() => props.clickHandler(id)}>
                </i>

                <Link to={{ pathname: `/edit`, state: { contact: props.contact } }}>
                    <i className="edit alternate outline icon right floated"
                        style={{ color: "blue", marginTop: "7px", cursor: "pointer" }}>
                    </i>
                </Link>

            </div>
        </div >
    )
}
