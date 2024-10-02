import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
}

// For Debug (easy access from console)
window.noteService = noteService
console.log('noteService is available:', window.noteService)

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.title))
            }
            if (filterBy.minDate) {
                notes = notes.filter(note => note.publishedDate >= filterBy.minDate)
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => _setNextPrevNoteId(note))
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(title = '', publishedDate = Date.now()) {
    return { title, publishedDate }
}

function getDefaultFilter() {
    return {
        txt: '',
        minDate: '',
    }
}

// Local Functions

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY) || []

    if (notes && notes.length) return

    notes = [
        {
            id: 'n101',
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#00d'
            },
            info: {
                txt: 'Fullstack Me Baby!'
            }
        },
        {
            id: 'n102',
            createdAt: Date.now(),
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: 'http://some-img/me',
                title: 'Bobi and Me'
            },
            style: {
                backgroundColor: '#00d'
            }
        },
        {
            id: 'n103',
            createdAt: Date.now(),
            type: 'NoteTodos',
            isPinned: false,
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        }
    ]
    utilService.saveToStorage(NOTE_KEY, notes)
}

// function _createNotes() {
//     const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
//     const notes = utilService.loadFromStorage(NOTE_KEY) || []

//     if (notes && notes.length) return

//     for (let i = 0; i < 20; i++) {
//         const note = {
//             id: utilService.makeId(),
//             title: utilService.makeLorem(2),
//             subtitle: utilService.makeLorem(4),
//             authors: [
//                 utilService.makeLorem(1)
//             ],
//             publishedDate: utilService.getRandomIntInclusive(1950, 2024),
//             description: utilService.makeLorem(20),
//             pageCount: utilService.getRandomIntInclusive(20, 600),
//             categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
//             thumbnail: `/assets/notesImages/${i + 1}.jpg`,
//             language: "en",
//             listPrice: {
//                 amount: utilService.getRandomIntInclusive(80, 500),
//                 currencyCode: "EUR",
//                 isOnSale: Math.random() > 0.7
//             },
//             reviews: []
//         }
//         notes.push(note)
//     }
//     utilService.saveToStorage(NOTE_KEY, notes)
// }

function _setNextPrevNoteId(note) {
    return query().then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}