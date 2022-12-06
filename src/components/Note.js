import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../context/NoteContext';
import NoteItem from './NoteItem';
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';


const Note = () => {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    let { notes, fetchNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", etag: "", edescription: "" });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        console.log("Update Called with note : ", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (currentNote) => {
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    return (
        <>
            <AddNote />

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3' onSubmit={handleClick}>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input minLength="3" type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input minLength="5" type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input minLength="3" type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                                </div>
                                <button type="button" data-bs-dismiss="modal" className=" btn btn-primary">Save changes</button>
                                <button type="button" className="mx-3 btn btn-secondary" data-bs-dismiss="modal">Close</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row mx-2'>
                {
                    notes.length === 0 ? <h3 className='text-center'>No Notes To Display</h3> :
                        notes.map((note) => {
                            return (
                                <NoteItem key={note._id} updateNote={updateNote} note={note} />
                            )
                        })
                }
            </div>
        </>
    )
}

export default Note