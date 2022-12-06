// import React from 'react';
import React, { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';



const AddNote = () => {
    const context = useContext(NoteContext);
    let { addNote } = context;

    const [note, setNote] = useState({ title: "", tag: "", description: "" })

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", tag: "", description: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container">
                <h2 className='my-3'>Add a note : </h2>

                <form className='my-3' onSubmit={handleClick}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input minLength="3" value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input minLength="5" value={note.description} type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input minLength="3" value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <h3>Your Notes : </h3>
        </>
    )
}

export default AddNote