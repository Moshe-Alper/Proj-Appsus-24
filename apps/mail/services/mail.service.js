import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'mailDB'

const loggedinUser = {
    mail: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
}


window.mailService = mailService
console.log('mailService is available:', window.mailService)

function query(filterBy = {}) {
    console.log('Current filter:', filterBy)
    return storageService.query(MAIL_KEY)
        .then(mails => {
            mails = _getFilteredMails(mails, filterBy)
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function _getFilteredMails(mails, filterBy) {
    // Filter by status (inbox, sent, trash, draft)
    if (filterBy.status) {
        mails = mails.filter(mail => {
            switch (filterBy.status) {
                case 'inbox':
                    return mail.to === loggedinUser.mail && !mail.removedAt
                case 'sent':
                    return mail.from === loggedinUser.mail
                case 'trash':
                    return mail.removedAt
                case 'draft':
                    return !mail.sentAt
                default:
                    return true
            }
        })
    }

    // Filter by text search (subject, body, or from fields)
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail =>
            regExp.test(mail.from) || regExp.test(mail.subject) || regExp.test(mail.body)
        )
    }

    // // Filter by read status
    if (filterBy.isRead !== undefined) {
        mails = mails.filter(mail => mail.isRead === filterBy.isRead)
    }

    // Filter by starred status
    if (filterBy.isStared !== undefined) {
        mails = mails.filter(mail => mail.isStared === filterBy.isStared)
    }

    // Filter by labels
    if (filterBy.labels && filterBy.labels.length > 0) {
        mails = mails.filter(mail =>
            filterBy.labels.some(label => mail.labels.includes(label))
        )
    }

    return mails
}

function getEmptyMail(subject = '', body = '', to = '', from = loggedinUser.mail) {
    return {
        id: makeId(),
        createdAt: Date.now(),
        subject,
        body,
        isRead: false,
        sentAt: null,
        removedAt: null,
        from,
        to,
        labels: [],
        isStared: false,
    }
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: undefined,
        isStared: false,
        labels: []
    }
}

function _createMails() {
    let mails = loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail('Miss you!', 'Would love to catch up sometime', 'momo@momo.com'),
            _createMail('Project Updates', 'Here are the latest updates on the project', `${loggedinUser.mail}`, 'boss@company.com'),
            _createMail('Meeting Reminder', 'Don\'t forget our meeting at 10 AM tomorrow', 'colleague@work.com'),
        ]
        saveToStorage(MAIL_KEY, mails)
        console.log('Mails saved to storage:', mails)
    }
}

function _createMail(subject, body, to, from) {
    const mail = getEmptyMail(subject, body, to, from)
    mail.sentAt = Date.now()
    return mail
}

function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}

