// mail service

import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { getDemoEmails } from './email-data.js'

const EMAIL_KEY = 'emailDB'
_createEmails()

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }


export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            emails = _getFilteredEmails(emails, filterBy)
            return emails
        })
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
    // .then(emailId => _setNextPrevEmailId(emailId))
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}


function _getFilteredEmails(emails, filterBy) {

    // Filter by status (inbox, sent, trash, draft)
    if (filterBy.status) {

        emails = emails.filter(email => {
            switch (filterBy.status) {
                case 'inbox':
                    return email.to === loggedinUser.email && !email.removedAt
                case 'sent':
                    return email.from === loggedinUser.email
                case 'trash':
                    return email.removedAt
                case 'draft':
                    return !email.sentAt
                default:
                    return true
            }
        })
    }

    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        emails = emails.filter(email => regExp.test(email.from) || regExp.test(email.subject)
            || regExp.test(email.body)
        )
    }

    if (filterBy.isRead !== undefined) {
        emails = emails.filter(email => email.isRead === filterBy.isRead)
    }

    if (filterBy.isStared !== undefined) {
        emails = emails.filter(email => email.isStared === filterBy.isStared)
    }

    if (filterBy.labels && filterBy.labels.length > 0) {
        emails = emails.filter(email =>
            filterBy.labels.some(label => email.labels.includes(label))
        )
    }

    return emails
}

function getEmptyEmail(subject = '', body = '', to = '') {
    return {
        id: makeId(),
        createdAt: Date.now(),
        subject,
        body,
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.email,
        to,
        labels: [],
        isStared: false,
    }
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: null,
        isStared: null,
        lables: []
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = [
            _createMail('Miss you!', 'Would love to catch up sometime', 'momo@momo.com'),
            _createMail('Project Updates', 'Here are the latest updates on the project', 'boss@company.com'),
            _createMail('Meeting Reminder', 'Don\'t forget our meeting at 10 AM tomorrow', 'colleague@work.com'),
        ]
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}

function _createEmail(subject, body, to) {
    const mail = getEmptyEmail(subject, body, to)
    mail.sentAt = Date.now()
    return mail
}
