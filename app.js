const yargs = require('yargs') // npm i yargs@12.0.2
// Make sure to run `npm init` as a first step
// const chalk = require('chalk') // npm i chalk@2.4.1
// const validator = require('validator') // npm i chalk@10.18.5
// nodemon (global) 1.18.5 // npm i nodemon@1.18.5 -g
//
// nodemon needs a couple of powershell commands to work on my home pc
// https://stackoverflow.com/questions/16460163/ps1-cannot-be-loaded-because-the-execution-of-scripts-is-disabled-on-this-syste
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
// nodemon app.js

// Debugging
// cd to the directory
// run `node inspect $filename` 
// the debugger will start
// Open up Google Chrome web browser 
// Navigate to 
// chrome://inspect/#devices
// wait a minute then click "inspect" on the program we want to debug
// the debugger opens
// click the "+" below filesystem in the top left and navigate to the folder the files are in
// make sure to "allow" access
// escape toggles the console at the bottom of the new window
// can type variables directly into the console window for the output to be displayed
// also can refer to array locatoins using square brackets
// can use "restart" in the windows below to trigger another execution of the program
// typing control-C twice exits the debugger
const notes = require('./notes.js')

yargs.version('1.0.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true, 
            type: 'string'
        }
    },
    // handler: function(argv) {
    //     notes.addNote(argv.title, argv.body)
    // }
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, 
            type: 'string'
        }
    },
    // handler: function(argv) {
    //     notes.removeNote(argv.title) 
    // }
    handler(argv) {
        notes.removeNote(argv.title) 
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler(argv) {
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()
