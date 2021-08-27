import React, {useState, useEffect}from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { uuid } from "uuidv4";
import './App.css';
import api from '../api/contacts';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

//useState is hook which we use to build the functionality of the website
// Components has it's own functionality
// this is JSX not an HTML file 

// this is REACT JSX not HTML file

function App() {
  const Local_Storage_Key= "contacts";
    // 2nd Step- Building the functionality of the website using useState
   const [contacts, setContacts]=useState([])
   const [searchTerm, setSearchTerm] = useState("")
   const [searchResults, setSearchResults ] = useState([])

    //RetrieveContact
    const retriveContacts = async() => {
      const response = await api.get ("/contacts")
      return response.data;
    }
  // CREATE - CRUD - 'C' Part
   const addContactHandler= async(contact)=>{
     console.log(contact)
     const request = { 
       id: uuid(),
       ...contact 
     }
     const response = await api.post ("/contacts", request)
     setContacts([...contacts,response.data]) 
     };

     //UPDATE Contact Part

     const updateContactHandler= async (contact) => {
       const response = await api.put(`/contacts/${contact.id}`, contact )
       const { id, name, email } = response.data
       setContacts(contacts.map((contact) => {
        return contact.id === id ? {...response.data}: contact ;
       })
       )
      }
      //DELETE Part
     const removeContactHandler = async(id)=>{
       await api.delete(`/contacts/${id}`);

       const newContactList = contacts.filter((contact)=> {
         return contact.id !== id;
       })

       setContacts(newContactList);
     }
    const searchHandler = (searchTerm) => {

  
    setSearchTerm(searchTerm)
    if (searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      })
      setSearchResults(newContactList)
    }else
    setSearchResults(contacts)
    }

     useEffect(()=> {
      //  const retriveContacts = JSON.parse(localStorage.getItem(Local_Storage_Key))
      //  if  (retriveContacts) setContacts(retriveContacts)
      const getAllContacts = async () => {
        const allContacts = await retriveContacts();
        if (allContacts) setContacts (allContacts)
      };

      getAllContacts();
     },[])


    useEffect(()=> {
    // localStorage.setItem(Local_Storage_Key, JSON.stringify(contacts))
     }, [contacts])
  // Now, How to render a list in React 
  // const contacts =[
  //   { 
  //     id:"1",
  //     name: "Dipesh",
  //     email: "malvia@gmail.com",
  //   },
  //   {
  //     id:"2",
  //     name: "Nikesh",
  //     email:"nick@gmail.com",
  //   }
  // ]
  return (
    <div className="ui container">
    <Router>
    <Header />
    <Switch>
    <Route path="/" exact 
    render = { (props) => 
      (<ContactList
      {...props} 
      contacts={searchTerm.length < 1 ? contacts: searchResults} 
      getContactId={removeContactHandler}
      term = {searchTerm}
      searchKeyword={searchHandler}/>
    )}
    />

    <Route path="/add"
    render= { (props) => 
      (<AddContact {...props}
        addContactHandler={addContactHandler}
      />)
    
    } 
    />
     <Route path="/edit"
    render= { (props) => 
      (<EditContact {...props}
        updateContactHandler={updateContactHandler}
      />)
    
    } 
    />

    <Route path="/contact/:id" component={ContactDetail}></Route>
    </Switch>
    {/* Passing Data from Parent to Child in order to access it from another page 
    is ny naming contacts in Contacts as PROPS then as follows*/}
    
    </Router>
    </div>
  );
}

export default App;
