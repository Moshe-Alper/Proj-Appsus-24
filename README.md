# Note-Taking Application

A modern, feature-rich note-taking application built with React that allows users to create, manage, and organize their notes efficiently.

## Features

- 📝 Create and edit notes
- 📌 Pin/unpin important notes
- 🔍 Search through notes
- 📋 Duplicate existing notes
- 🗑️ Trash/delete notes
- 🎨 Clean and intuitive user interface
- ⚡ Fast and responsive design

## Tech Stack

- React.js
- React Router for navigation
- Modern JavaScript (ES6+)
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Navigate to the project directory:
```bash
cd [project-directory]
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000` (or another port if 3000 is in use).

## Project Structure

```
apps/
  └── note/
      ├── pages/
      │   └── NoteIndex.jsx    # Main notes page component
      ├── cmps/               # Reusable components
      │   ├── KeepHeader.jsx
      │   ├── NoteList.jsx
      │   ├── CreateNote.jsx
      │   ├── NoteSearch.jsx
      │   └── NoteSidebar.jsx
      └── services/           # Business logic and API calls
          └── note.service.js
```

## Usage

1. **Creating Notes**: Use the create note component at the top of the page to add new notes.
2. **Managing Notes**:
   - Pin important notes to keep them at the top
   - Duplicate notes to create copies
   - Delete notes you no longer need
3. **Searching**: Use the search functionality to find specific notes quickly

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
