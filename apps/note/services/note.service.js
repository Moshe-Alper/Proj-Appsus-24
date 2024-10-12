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
    getFilterFromSearchParams,
    duplicate,
}

// For Debug (easy access from console)
window.noteService = noteService
console.log('noteService is available:', window.noteService)

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            return _filterNotesBy(notes, filterBy)
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

function getEmptyNote(title = '', txt = '', isPinned = false, backgroundColor = '#fff', type = 'NoteTxt') {
    return {
        id: '',
        createdAt: Date.now(),
        type: type,
        isPinned: isPinned,
        style: {
            backgroundColor
        },
        info: _getInfoByType(type)
    }
}

function getDefaultFilter() {
    return {
        txt: '',
    }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function duplicate(note) {
    const newNote = {
        ...note,
        id: '',
        createdAt: Date.now(),
        isPinned: false
    }
    return save(newNote)
}

// Local Functions

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY) || []

    if (notes && notes.length) return

    notes = [
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: 'rgb(239, 154, 154)'
            },
            info: {
                title: 'We were all so young!',
                txt: '"I suppose at one time in my life I might have had any number of stories, but now there is no other. This is the only story I will ever be able to tell. ',
                imgSrc: '',
                todos: {}
            }
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteImg',
            isPinned: true,
            info: {
                title: 'When Curiosity Meets Determination',
                imgSrc: './assets/img/notes/Solar_opposites_e207_0015.webp',
            },
            style: {
                backgroundColor: 'rgb(178, 235, 242)'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTodos',
            isPinned: false,
            style: {
                backgroundColor: 'rgb(255, 204, 128)'
            },
            info: {
                title: 'Gift Planning & Shopping',
                todos: [
                    { txt: 'Make a gift list for family and friends', doneAt: null },
                    { txt: 'Set a budget for holiday shopping', doneAt: null },
                    { txt: 'Order any personalized gifts early', doneAt: null },
                    { txt: 'Wrap presents and add name tags', doneAt: null },
                    { txt: 'Ship gifts to out-of-town loved ones', doneAt: 187111111 }
                ]
            }
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteImg',
            isPinned: false,
            info: {
                title: 'Weezer',
                txt: 'Pinkerton',
                imgSrc: './assets/img/notes/Folder.jpg',
            },
            style: {
                backgroundColor: 'rgb(248, 187, 208)'
            }
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteVideo',
            isPinned: true,
            style: {
                backgroundColor: 'rgb(239, 154, 154)'
            },
            info: {
                title: 'Popeye!',
                txt: '',
                imgSrc: '',
                videoSrc: 'https://www.youtube.com/watch?v=8kWIYfMeuZM&list=PL3rKz4t8GPIbIZ6K2aDrX48XGFtQ83cGn',
                todos: {}
            }
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteImg',
            isPinned: false,
            info: {
                title: 'Seas Turtle',
                txt: '',
                imgSrc: './assets/img/notes/Sea-turtle.jpg',
            },
            style: {
                backgroundColor: 'rgb(246, 235, 97)'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTodos',
            isPinned: true,
            style: {
                backgroundColor: 'rgb(200, 230, 201)'
            },
            info: {
                title: 'Gardening To-Do List',
                todos: [
                    { txt: 'Prepare the soil', doneAt: Date.now() },
                    { txt: 'Sow seeds', doneAt: Date.now() },
                    { txt: 'Transplant seedlings', doneAt: null },
                    { txt: 'Build a trellis', doneAt: Date.now() },
                    { txt: 'Apply organic fertilizer', doneAt: Date.now() },
                    { txt: 'Install a rain barrel', doneAt: null },
                    { txt: 'Weed flower beds ', doneAt: Date.now() },
                    { txt: 'Harvest ripe fruits', doneAt: Date.now() },
                ]
            }
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteImg',
            isPinned: true,
            info: {
                title: 'Almost Famous',
                txt: 'Almost Famous (2000) is a coming-of-age film directed by Cameron Crowe.',
                imgSrc: './assets/img/notes/1-almost-famous-group-shot-poster-joshua-williams.jpg',
            },
            style: {
                backgroundColor: 'rgb(187, 222, 251)'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteImg',
            isPinned: false,
            info: {
                title: 'Iron Man',
                txt: 'I am Iron Man',
                imgSrc: './assets/img/notes/F1EdmDZWwAAWb50.jpeg',
            },
            style: {
                backgroundColor: 'rgb(225, 190, 231)'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTodos',
            isPinned: false,
            style: {
                backgroundColor: 'rgb(255, 255, 255)'
            },
            info: {
                title: 'Home Organization To-Do List',
                todos: [
                    { txt: 'Declutter the living room', doneAt: null },
                    { txt: 'Organize kitchen cabinets', doneAt: null },
                    { txt: 'Sort through clothes and donate', doneAt: Date.now() },
                    { txt: 'Clean out the garage', doneAt: null },
                    { txt: 'Create a filing system for paperwork', doneAt: Date.now() },
                    { txt: 'Rearrange furniture for better flow', doneAt: Date.now() },
                    { txt: 'Set up a cleaning schedule', doneAt: null },
                    { txt: 'Label storage bins', doneAt: null },
                ]
            }
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: 'rgb(255, 255, 255)'
            },
            info: {
                title: 'לזכור להתקשר לאמא',
                txt: '',
                imgSrc: '',
                todos: {}
            }
        }

    ]
    utilService.saveToStorage(NOTE_KEY, notes)
}

function _getInfoByType(type) {
    switch (type) {
        case 'NoteTxt':
            return { title: '', txt: '' }
        case 'NoteImg':
            return { title: '', imgSrc: '' }
        case 'NoteTodos':
            return { title: '', todos: [] }
        case 'NoteVideo':
            return { title: '', videoSrc: '' }
        default:
            return { title: '', txt: '' }
    }
}


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

function _filterNotesBy(notes, filterBy) {
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')

        notes = notes.filter(note =>
            (note.info.title && regex.test(note.info.title)) ||
            (note.info.txt && regex.test(note.info.txt))
        )
    }

    if (filterBy.type) {
        notes = notes.filter(note => note.type === filterBy.type)
    }

    return notes
}