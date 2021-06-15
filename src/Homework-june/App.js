import React, { useState } from 'react';
import './style.css';
import { generate } from 'shortid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button'

export default function App() {

    const [info, setInfo] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [isInputEdited, setIsInputEdited] = useState(false);

    const [titleAux, setTitleAux] = useState('');
    const [descriptionAux, setDescriptionAux] = useState('');
    // const [titleEditable, setTitleEditable] = useState('');
    // const [descriptionEditable, setDescriptionEditable] = useState('');

    // creating a function that clears inputs, since inputs are binded to the following states
    const emptyInputs = () => {
        setTitle('')
        setDescription('')
    }

    // function that removes a card(along with array data) based on id
    const removeCard = (id) => {

        // creating new arr with returned data from filter
        const newArr = info.filter((item) => item.id !== id)
        setInfo(newArr)
    }


    // function to add inputs values to info
    const addCard = () => {

        const obj = {  // creating an object with values from inputs
            id: generate(), // generate = imported function that generates a random id
            title: title,
            description: description,
            isEditable: false,
        }
        if (title === '' && description === '')
            return
        setInfo([...info, obj]); // updating info with the new obj
        emptyInputs() // clearing inputs

    }

    // function to update card info when edited
    const updateCard = (id) => {

        // updating array[calledIndex] with new values
        const infoUpdated = [...info];
        const itemToEditIndex = infoUpdated.findIndex((item) => item.id === id)
        infoUpdated[itemToEditIndex].isEditable = false;
        infoUpdated[itemToEditIndex].title = titleAux;
        infoUpdated[itemToEditIndex].description = descriptionAux;
        setInfo(infoUpdated);
        setIsInputEdited(false)
    }


    // function to get all values from card drawn back into inputs
    const editCard = (id) => {

        const infoUpdated = [...info];
        const itemToEditIndex = infoUpdated.findIndex((item) => item.id === id)
        infoUpdated[itemToEditIndex].isEditable = true;
        setTitleAux(infoUpdated[itemToEditIndex].title)
        setDescriptionAux(infoUpdated[itemToEditIndex].description)
        setInfo(infoUpdated);
        console.log('clicked on edit')
    }

    const cancelEdit = (id) => {
        const infoUpdated = [...info];
        const itemToEditIndex = infoUpdated.findIndex((item) => item.id === id)
        infoUpdated[itemToEditIndex].isEditable = false;
        setInfo(infoUpdated);
        console.log('clicked on cancel')
    }

    return (
        <div>
            <h1>Card App</h1>
            <div className="inputsWrapper">
                <InputLabel>Please fill in info</InputLabel>
                <TextField helperText='Must be filled' required multiline={true} label="Title" variant="outlined" className="materialInputs" value={title} onChange={(e) => setTitle(e.target.value)}></TextField>
                <TextField helperText='Must be filled' required multiline={true} label="Description" variant="outlined" className="materialInputs" value={description} onChange={(e) => setDescription(e.target.value)} style={{width:'70%'}}></TextField>
                <Button onClick={addCard} variant="contained" className="addBtn" style={{ backgroundColor: 'rgba(0,255,0,0.4' }}>Add card</Button>
            </div>

            <div className="cardsWrapper" >
                {info.length > 0 ?
                    info.map((item) => ( // parse array of objects and display information card for each
                        <div className="card" key={item.id}>
                            <div>
                                {item.isEditable ?
                                    <div className="cardsInfoWrapperEditable">
                                        <TextField multiline={true} label="Title" variant="outlined" value={titleAux} onChange={(e) => titleAux!==e.target.value ? (setTitleAux(e.target.value), setIsInputEdited(true)) : ''} style={{ width: 'fit-content' }}></TextField>
                                        <TextField multiline={true} label="Description" variant="outlined" value={descriptionAux} onChange={(e) => descriptionAux!==e.target.value ? (setDescriptionAux(e.target.value), setIsInputEdited(true)) : ''} style={{ width: 'fit-content' }}></TextField>
                                    </div>
                                    :
                                    <div className="cardsInfoWrapper">
                                        <h3>{item.title}</h3>
                                        <div>{item.description}</div>
                                    </div>
                                }

                                <div className="cardsButtonsWrapper">
                                    {item.isEditable ?
                                        <div>
                                            { isInputEdited ? <Button onClick={() => updateCard(item.id)} variant="contained" style={{ backgroundColor: 'rgba(0,255,0,0.4' }}>Update card</Button> : ''}
                                            <Button onClick={() => cancelEdit(item.id)} variant="contained" style={{ backgroundColor: 'rgba(255,0,0,0.9' }}>Cancel</Button>
                                        </div>
                                        :
                                        <div>
                                            <Button onClick={() => editCard(item.id)} variant="contained" style={{ backgroundColor: 'rgba(255,100,0,0.9' }}>Edit</Button>
                                            <Button onClick={() => removeCard(item.id)} variant="contained" style={{ backgroundColor: 'rgba(255,0,0,0.9' }}>Delete</Button>
                                        </div>}
                                </div>
                            </div>
                        </div>)) :
                    <div className="card">No info to show</div>}
            </div>
        </div>
    )

}