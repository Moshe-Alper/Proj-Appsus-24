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
            id: 'n101',
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: 'white'
            },
            info: {
                title: 'Fullstack Me Baby!',
                txt: 'Im Stacking you',
                imgSrc: '',
                todos: {}
            }
        },
        {
            id: 'n102',
            createdAt: Date.now(),
            type: 'NoteImg',
            isPinned: false,
            info: {
                title: 'Bobi and Me',
                imgSrc: 'assets/img/notes/Sea-turtle.jpg',
            },
            style: {
                backgroundColor: 'rgb(246, 235, 97)'
            }
        },
        {
            id: 'n103',
            createdAt: Date.now(),
            type: 'NoteTodos',
            isPinned: false,
            style: {
                backgroundColor: 'white'
            },
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

function _getInfoByType(type) {
    switch (type) {
        case 'NoteTxt':
            return { title: '', txt: '' }
        case 'NoteImg':
            return { title: '', imgSrc: '' }
        case 'NoteTodos':
            return { title: '', todos: [] }
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