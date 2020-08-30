const fs = require('fs')
const chalk = require('chalk')

const fileName = 'notes.json'

const addNote = (title, body) => {
    const notes = loadNotes()

    // const duplicateNotes = notes.filter(function(note) {
    //     return note.title === title
    // })
    // const duplicateNotes = notes.filter((note) => note.title === title)

    // Using find stops at the first true value whereas filter runs through every entry
    // this can have performance impact depending on the size of the array
    const duplicateNote = notes.find((note) => note.title === title)

    // debugging
    // use console.log
    // debugger statement
    // run "node inspect" not just "node" to trigger the debugger
    // then open up "chrome://inspect" in chrome
    // wait a second, connect to the process 
    // use the chrome debugger
    // debugger 

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.inverse('New title added'))
    
    } else {
        console.log(chalk.red.inverse('Note title taken'))
    }
}

const removeNote = (title) => {

    const notes = loadNotes() 

    // const remainingNotes = notes.filter(function(note) {
    //     return note.title !== title 
    // })
    // const remainingNotes = notes.filter((note) => {
    //     return note.title !== title 
    // })
    const remainingNotes = notes.filter((note) => note.title !== title)

    if(notes.length === remainingNotes.length) {
        // Nothing removed
        console.log(chalk.red.inverse('No note found!'))
    } else {
        // an item removed
        saveNotes(remainingNotes)
        console.log(chalk.green.inverse('Note removed!'))
    }

}

const listNotes = () => {
    console.log(chalk.inverse("Your notes"))

    const notes = loadNotes() 
    notes.forEach(note => {
        console.log(note.title)
    });
}

const readNote = (title) => {

    // Load the notes
    const notes = loadNotes()

    // Find the note that has the same title as the one I am searching for
    const foundNote = notes.find((note) => note.title === title)

    if(foundNote) {
        console.log(chalk.inverse(foundNote.title))
        console.log(foundNote.body)
    } else {
        console.log(chalk.red('No note with that name found'))
    }
}

///////////////////////////
// Supporting functions  //
///////////////////////////
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(fileName)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

// const saveNotes = function(notes) {
//     const dataJSON = JSON.stringify(notes)
//     fs.writeFileSync(fileName, dataJSON)
// }
// const saveNotes = (notes) => fs.writeFileSync(fileName, JSON.stringify(notes))
 const saveNotes = (notes) => {
     const dataJSON = JSON.stringify(notes)
     //fs.writeFileSync(fileName, dataJSON)
     fs.writeFileSync(fileName, dataJSON)
 }

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
