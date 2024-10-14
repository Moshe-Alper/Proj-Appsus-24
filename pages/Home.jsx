import { homeSvg } from "../cmps/Svgs.jsx"

export function Home() {

    return (
        <section className="home">
            <h1>Welcome to Appsus</h1>
            <nav className="app-links">
                <a href="#/note">
                  {homeSvg.keepSvg}
                <span>Keep</span>
                </a>
                <a href="#/mail">
                {homeSvg.mailSvg}
                    <span>Mail</span>
                </a>
                <a href="/book">
                    <svg width="144px" height="144px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 2H15C16.1046 2 17 2.89543 17 4V20C17 21.1046 16.1046 22 15 22H3C1.89543 22 1 21.1046 1 20V4C1 2.89543 1.89543 2 3 2ZM3 4V20H15V4H3ZM20 4C19.4477 4 19 4.44772 19 5V19C19 19.5523 19.4477 20 20 20H21C21.5523 20 22 19.5523 22 19V5C22 4.44772 21.5523 4 21 4H20Z" fill="#FFD700"/>
                    </svg>
                    <span>Book</span>
                </a>
            </nav>
        </section>
    )
}
