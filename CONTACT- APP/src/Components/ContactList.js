import React, {useRef}from 'react';
import { Link } from "react-router-dom"
import ContactCard from './ContactCard';
const ContactList = (props) => {
     const inputEl = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id)
    }
    // Now rendering a ContactList 

    const getSearchTerm = () =>{
        props.searchKeyword(inputEl.current.value)
    }
    const renderContactList = props.contacts.map((contact)=> {
        return <ContactCard contact ={contact} clickHandler={deleteContactHandler} key= {contact.id}></ContactCard>;  
        
    })
    return(
    <div class="main">
        <h2>Contact List
            <Link to="/add">
                <button className="ui button yellow right"> Add Contact</button>
        </Link>
        </h2>
        <div className="ui search">
            <div className="ui icon input">
                <input 
                ref = {inputEl}
                type="text" 
                placeholder="Search Contacts" 
                className="prompt" value = { props.term } 
                onChange={ getSearchTerm }></input>
                <i className="search icon"></i>
            </div>
        </div>
<div className="ui celled list"> {renderContactList.length>0 
? renderContactList
: " No Contacts available"} </div>
</div>    
    )
}

export default ContactList;