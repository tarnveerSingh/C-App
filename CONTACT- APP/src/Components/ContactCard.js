import React from "react";
import user from '../Images/user.png'
import { Link } from "react-router-dom"
const ContactCard=(props)=>{
    // we are going to d e structuring as because we don't have to use props.
    // every time we use props. & here it goes
    const {id,name, email}=props.contact
    return (
        <div className="item">
            <img className="ui avatar image" src={user} alt="user" />
            <div className="content">
                <Link to=
                {
                {pathname:`/contact/${id} `, state:{contact: props.contact}}
                }>
                <div className="header">{name}</div>
                <div>{email}</div>
                </Link>
            </div>
            {/* How to Add inline styling inside a function and inside the function 
            we don't use a - instead we use marginTop */}
        <i className="trash alternate outline icon"
            style={{color: "red", marginTop: "11x" }}
            onClick={()=> props.clickHandler(id)} ></i> 
        <Link to=
                {
                {pathname:`/edit`, state:{contact: props.contact}}
                }>
                    <i className="edit alternate outline icon"
            style={{color: "blue", marginTop: "7px"}}
            ></i> 
                </Link>

        </div>
    )
    

}

export default ContactCard;