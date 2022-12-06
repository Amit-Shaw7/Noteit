import React, { useContext } from 'react';
import NoteContext from '../context/NoteContext';


const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(NoteContext);
    let { deleteNote } = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-between">
                        <i className="fa-solid fa-trash" onClick={() => deleteNote(note._id)}></i>
                        <i className="fa-solid fa-pen-to-square" type="button" data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={()=> updateNote(note)}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem