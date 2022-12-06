import { useState } from "react";
import NoteContext from "./NoteContext";
const host = "http://localhost:5000";

const NoteState = (props) => {

    const [notes, setNotes] = useState([]);

    // Fetch All Notes
    const fetchNotes = async () => {

        const response = await fetch(`${host}/user/notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiODNkNmYwN2FhYzI5NjFkZTc4MTY2In0sImlhdCI6MTY1NjI3MTMyMH0.u0pyRXbO1SARI0LeSKVvORwGOLJNMvw5XTGkRHgFCJ8'
                'auth-token' : localStorage.getItem('token')
            },
            // body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json.data)
        setNotes(json.data)
        // setNotes(json)
    }

    // Add Note
    const addNote = async (title, description, tag) => {
        // API CAlls 
        const response = await fetch(`${host}/user/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiODNkNmYwN2FhYzI5NjFkZTc4MTY2In0sImlhdCI6MTY1NjI3MTMyMH0.u0pyRXbO1SARI0LeSKVvORwGOLJNMvw5XTGkRHgFCJ8'
                'auth-token': localStorage.getItem('token')

            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log("Adding a new note");
        // console.log(json.note);
    
        setNotes(notes.concat(json.note))
    }
    // Delete Note
    const deleteNote = async (id) => {
        // API Calls
        const response = await fetch(`${host}/user/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiODNkNmYwN2FhYzI5NjFkZTc4MTY2In0sImlhdCI6MTY1NjI3MTMyMH0.u0pyRXbO1SARI0LeSKVvORwGOLJNMvw5XTGkRHgFCJ8'
                'auth-token': localStorage.getItem('token')

            },
            // body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        // Logic
        console.log("Deleting The Note");
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }
    // Update Note
    const editNote = async (id, title, description, tag) => {
        // API Calls
        console.log("edIT cALLED" , tag);
        const response = await fetch(`${host}/user/notes/updatenote/${id}`, { 
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiODNkNmYwN2FhYzI5NjFkZTc4MTY2In0sImlhdCI6MTY1NjI3MTMyMH0.u0pyRXbO1SARI0LeSKVvORwGOLJNMvw5XTGkRHgFCJ8'
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));

        // Logic
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];

            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].tag = tag;
                newNotes[index].description = description;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;

