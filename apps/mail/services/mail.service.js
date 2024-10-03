// mail service

import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { getDemomails } from './mail-data.js'

const MAIL_KEY = 'mailDB'
_creatMails()

const loggedinUser = {
    mail: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            mails = _getFilteredmails(mails, filterBy)
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
    // .then(mailId => _setNextPrevmailId(mailId))
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

function _getFilteredmails(mails, filterBy) {

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

    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail => regExp.test(mail.from) || regExp.test(mail.subject)
            || regExp.test(mail.body)
        )
    }

    if (filterBy.isRead !== undefined) {
        mails = mails.filter(mail => mail.isRead === filterBy.isRead)
    }

    if (filterBy.isStared !== undefined) {
        mails = mails.filter(mail => mail.isStared === filterBy.isStared)
    }

    if (filterBy.labels && filterBy.labels.length > 0) {
        mails = mails.filter(mail =>
            filterBy.labels.some(label => mail.labels.includes(label))
        )
    }

    return mails
}

function getEmptyMail(subject = '', body = '', to = '') {
    return {
        id: makeId(),
        createdAt: Date.now(),
        subject,
        body,
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.mail,
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

function _creatMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _creatMail('Miss you!', 'Would love to catch up sometime', 'momo@momo.com'),
            _creatMail('Project Updates', 'Here are the latest updates on the project', 'boss@company.com'),
            _creatMail('Meeting Reminder', 'Don\'t forget our meeting at 10 AM tomorrow', 'colleague@work.com'),
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _creatMail(subject, body, to) {
    const mail = getEmptyMail(subject, body, to)
    mail.sentAt = Date.now()
    return mail
}
