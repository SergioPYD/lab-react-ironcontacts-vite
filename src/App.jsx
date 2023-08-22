import { useState } from "react";
import "./App.css";
import allContacts from "./contacts.json";
import { Table } from 'react-bootstrap';


function App() {
  const fiveContacts = allContacts.slice(0, 5)
  const [contacts, setContacts] = useState(fiveContacts);

  const handleAddContact = () => {
    if (contacts.length === allContacts.length) {
      return;
    }

    let randomContact =
      allContacts[Math.floor(Math.random() * allContacts.length)];

    let repeatedContact = contacts.find((eachContact) => {
      if (eachContact.id === randomContact.id) {
        return true;
      }
    });

    if (repeatedContact !== undefined) {
      handleAddContact();
      return;
    }

    const contactClone = JSON.parse(JSON.stringify(contacts));
    contactClone.unshift(randomContact);
    setContacts(contactClone);
  };

  const handleSortName = () => {
    const contactClone = JSON.parse(JSON.stringify(contacts));
    contactClone.sort((one,two)=>{

      return one.name > two.name ? 1 : -1;
    })
    setContacts(contactClone)
  };

  const handleSortPopularity = () => {
    const contactClone = JSON.parse(JSON.stringify(contacts));
    contactClone.sort((one,two)=>{

      return one.popularity < two.popularity ? 1 : -1;
    })
    setContacts(contactClone)
  };

  const handleDeleteContact = (id)=>{
   let filteredArr = contacts.filter((eachContact)=>{
    return eachContact.id === id ? false : true;
   })
   setContacts(filteredArr)
  }

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <div>
        <button onClick={handleAddContact}>Agregar Contacto Aleatorio</button>
        <button onClick={handleSortName}>Ordenar por Nombre</button>
        <button onClick={handleSortPopularity}>Ordenar por Popularidad</button>
      </div>
      <table className="table table-hover">
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Actions</th>
        </tr>
        {contacts.map((eachContact, i) => {
          const { name, pictureUrl, popularity, id, wonOscar, wonEmmy } =
            eachContact;
          const popularityFixed = popularity.toFixed(2);
          return (
            <tr key={i}>
              <td>
                <img src={pictureUrl} alt={name} width="100px" />
              </td>
              <td>{name}</td>
              <td>{popularityFixed}</td>
              <td>{wonOscar === true && "🏆"} </td>
              <td>{wonEmmy === true && "🌟"}</td>
              <td><button onClick={()=>handleDeleteContact(id)}>Eliminar</button></td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
