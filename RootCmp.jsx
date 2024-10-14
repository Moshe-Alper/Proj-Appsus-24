const { Route, Routes, HashRouter } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { NoteEdit } from "./apps/note/cmps/NoteEdit.jsx"
import { UserMsg } from "./apps/note/cmps/UserMsg.jsx"
import { NoteSearch } from "./apps/note/cmps/NoteSearch.jsx"
import { MailList } from "./apps/mail/cmps/MailList.jsx"
import { MailCompose } from "./cmps/MailCompose.jsx"


export function App() {
    return <HashRouter>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                </Route>
                <Route path="/mail/compose" element={<MailCompose />} />
                <Route path="/note" element={<NoteIndex />} >
                    <Route path="/note/edit" element={<NoteEdit />} />
                    <Route path="/note/label" element={<NoteEdit />} />
                </Route>
                <Route path="/note/search" element={<NoteSearch />} />
                <Route path="/note/:noteId" element={<NoteIndex />} />
            </Routes>
        </section>
        <UserMsg />
    </HashRouter>
}
