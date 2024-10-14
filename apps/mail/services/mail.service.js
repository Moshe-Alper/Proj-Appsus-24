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
    getMailCountByFolder,
    getFilterFromSearchParams
}


window.mailService = mailService
console.log('mailService is available:', window.mailService)

function query(filterBy = {}) {
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
    if (!mail.id) {
        return storageService.post(MAIL_KEY, mail)
    } else {
        return storageService.put(MAIL_KEY, mail)
    }
}

function _getFilteredMails(mails, filterBy) {
    // Filter by status (inbox, sent, trash, draft)
    if (filterBy.folder) {
        mails = mails.filter(mail => {
            switch (filterBy.folder) {
                case 'Inbox':
                    return mail.to === loggedinUser.mail && !mail.removedAt
                case 'Sent':
                    return mail.from === loggedinUser.mail && !mail.removedAt
                case 'Trash':
                    return mail.removedAt
                case 'Draft':
                    return !mail.sentAt && !mail.removedAt
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
function getMailCountByFolder() {

    return storageService.query(MAIL_KEY)
        .then(mails => {
            const counts = {
                Inbox: mails.filter(mail => mail.to === loggedinUser.mail && !mail.isRead && !mail.removedAt).length,
                // Inbox: mails.filter(mail => mail.isRead === true).length,
                // Sent: mails.filter(mail => mail.from === loggedinUser.mail && !mail.removedAt && mail.sentAt).length,
                // Trash: mails.filter(mail => mail.removedAt).length,
                Draft: mails.filter(mail => !mail.sentAt && !mail.removedAt).length
            }
            // console.log(counts.Inbox)
            return counts
        })

}

function getEmptyMail(subject = '', body = '', to = '', from = loggedinUser.mail) {
    return {
        // id: makeId(),
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
        isDraft: false
    }
}

function getDefaultFilter() {
    return {
        folder: 'Inbox',
        txt: '',
        isRead: undefined,
        isStared: false,
        labels: []
    }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) ||
            defaultFilter[field]
    }
    return filterBy
}

function _createMails() {
    let mails = loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail('Project Updates', 'Here are the latest updates on the project', `${loggedinUser.mail}`, 'boss@company.com'),
            _createMail('Project Updates', 'Here are the latest updates on the project', `${loggedinUser.mail}`, 'boss@company.com'),
            _createMail('Miss you!', 'Would love to catch up sometime', `${loggedinUser.mail}`, 'momo@momo.com'),
            _createMail('Miss you!', 'Would love to catch up sometime', `${loggedinUser.mail}`, 'momo@momo.com'),
            _createMail('Meeting Reminder', 'Don\'t forget our meeting at 10 AM tomorrow', `${loggedinUser.mail}`, 'colleague@work.com'),
            _createMail('News Sky', 'News just for you', `${loggedinUser.mail}`, 'boss@company.com'),
            _createMail('Kids present', 'Don\'t miss holiday sell', `${loggedinUser.mail}`, 'momo@company.com'),


            _createMail('Meeting Reminder', 'Don\'t forget our meeting at 10 AM tomorrow', 'colleague@work.com'),
            _createMail('Miss you!', 'Would love to catch up sometime', 'momo@momo.com'),
            _createMail('Project Updates', 'Here are the latest updates on the project', 'boss@company.com'),
            _createMail('News', 'updates on the project', 'colleague@company.com'),
            _createMail('Kids present', 'Don\'t miss holiday sell', 'momo@company.com'),

        ]
        saveToStorage(MAIL_KEY, mails)
        console.log('Mails saved to storage:', mails)
    }
}

function _createMail(subject, body, to, from) {
    const mail = getEmptyMail(subject, body, to, from)
    mail.id = makeId()
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

