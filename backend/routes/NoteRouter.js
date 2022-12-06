const express = require('express');
const router = express.Router();
const noteModal = require('../models/NoteModal');
const fetchUser = require('../middlewares/FetchUser');
const { body, validationResult } = require('express-validator');


// To get all notes
router.get('/', fetchUser, async (req, res) => {
    const userID = req.user.id;
    const notes = await noteModal.find({ user : userID });
    // console.log(notes);
    try {
        if (notes) {
            res.json({
                msg: "Note fetched sucesfully",
                data: notes
            })
        } else {
            res.json({
                msg: "Sorry no note found",
            })
        }
    } catch (error) {
        res.json({
            msg: error.message
        })
    }
});

// To add note
router.post('/addnote', [
    body('title', "Enter a valid email").isLength({ min: 5 }),
    body('description', "Password cannot be blank").isLength({ min: 5 })
], fetchUser, async (req, res) => {

    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {

        try {
            let note = new noteModal({
                title, description, tag, user: req.user.id,
            });
            note = await noteModal.create({
                user: req.user.id,
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag
            });
            res.json({
                msg: "Note Created Succesully",
                note: note
            })
        } catch (error) {
            res.json({
                msg: "Internal Sever Error",
                error: error.message
            })
        }
    }
});

// To Update Notes
router.patch('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    let newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    console.log("Ataka raha hai");

    // Find the note to be updated and update it
    try {
        let noteToBeDeleted = await noteModal.findById(req.params.id);
        console.log("Note To Be Updated" , noteToBeDeleted.id);
        if (!noteToBeDeleted) {
            res.status(404).json({
                msg: "Note Not Found"
            })
        }

        // console.log(req.params.id == noteToBeDeleted.id);
        console.log("User Id" , req.user.id);
        console.log("User Belongs ID " , noteToBeDeleted.user);
        if (noteToBeDeleted.user.toString() != req.user.id) {
            res.status(401).json({
                msg: "Unauthorised Access"
            })
        } else {
            note = await noteModal.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({
                msg: "Note Updated Succesfully"
            })
        }
    } catch (error) {

        res.status(401).json({
            msg: "unauthorised access",
            error: error.message
        })
    }

});
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    // Find the note to be updated and update it
    try {
        let noteToBeDeleted = await noteModal.findById(req.params.id);
        console.log("Note To Be Updated" , noteToBeDeleted.id);
        if (!noteToBeDeleted) {
            res.status(404).json({
                msg: "Note Not Found"
            })
        }

        // console.log(req.params.id == noteToBeDeleted.id);
        // console.log("User Id" , req.user.id);
        console.log("User Belongs ID " , noteToBeDeleted.user);
        if (noteToBeDeleted.user.toString() != req.user.id) {
            res.status(401).json({
                msg: "Unauthorised Access"
            })
        } else {
            note = await noteModal.findByIdAndDelete(req.params.id);
            res.json({
                msg: "Note Delete Succesfully"
            })
        }
    } catch (error) {

        res.json({
            msg: "unauthorised access",
            error: error.message
        })
    }

});

module.exports = router;