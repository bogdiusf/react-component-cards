import React, { useState } from 'react'
import { generate } from 'shortid'
import '../style.css'

export default function Main() {


    // declaring states used for storing needed data
    const [info, setInfo] = useState([]);
    const [sw, setSw] = useState(false);
    const [id, setId] = useState()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [index, setIndex] = useState(null)

    // creating a function that clears inputs, since inputs are binded to the following states
    const emptyInputs = () => {
        setFirstName('')
        setLastName('')
        setAge('')
        setAddress('')
    }

    // function that removes a card(along with array data) based on id
    const removeCard = (id) => {

        // creating new arr with returned data from filter
        const newArr = info.filter((item) => item.id !== id)
        setInfo(newArr)
        setSw(false) // setting switch to false
    }


    // function to add inputs values to info
    const addCard = () => {

        setId(generate)   // generate = imported function that generates a random id
        const obj = {  // creating an object with values from inputs
            id: id,
            firstName: firstName,
            lastName: lastName,
            age: age,
            address: address
        }
        setInfo([...info, obj]); // updating info with the new obj
        emptyInputs() // clearing inputs
    }


    // function to update card info when edited
    const updateCard = () => {

        // updating array[calledIndex] with new values
        info[index].firstName = firstName
        info[index].lastName = lastName
        info[index].age = age
        info[index].address = address

        setSw(false)
        emptyInputs()
    }


    // function to get all values from card drawn back into inputs
    const editCard = (item) => {

        // setId(id)
        setFirstName(item.firstName);
        setLastName(item.lastName);
        setAge(item.age);
        setAddress(item.address)
        setSw(true)
    }

    return (
        <>
            <div className="infoWrapper">
                <div>
                    <h1>Please fill info</h1>
                    <button onClick={addCard} style={{ marginRight: '15px' }}>Add card</button>
                    {(editCard && sw === true) ?   // show update button only when Edit is clicked
                        <button onClick={() => updateCard()}>Update card</button> : ''}
                </div>
                <div className="labelWrapper">
                    <label>Name</label>
                    <label>Surname</label>
                    <label>Age</label>
                    <label>School</label>
                </div>
                <div className="inputWrapper">
                    {/* asigning input values to states */}
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)}></input>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                </div>
            </div>

            <div>

                <div className="cardsWrapper" >
                    {info.length > 0 ?
                        info.map((item, index) => ( // parse array of objects and display information card for each
                            <div className="card" key={item.id}>
                                <h1>{item.firstName + ' ' + item.lastName}</h1>
                                <h2>{item.age}</h2>
                                <h3>{item.address}</h3>
                                <button style={{ marginRight: '15px' }} onClick={() => { editCard(item); setIndex(index) }}>Edit</button>
                                <button onClick={() => removeCard(item.id)}>Delete</button>
                            </div>)) :
                        <div className="card">No info to show</div>}

                </div>

            </div>


        </>
    )
}