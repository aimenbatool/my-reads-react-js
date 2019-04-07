# MyReads Project

A [web application](https://dreamy-nightingale-14f3eb.netlify.com/) which allows you to categorized the books you have read, want to read or currently reading. The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md).


## Setup Instructions
To get started developing right away:

* install all project dependencies with `npm install` or `yarn install`
* start the development server with `npm start` or `yarn start`
* Navigate to `http://localhost:3000/`


## Functionality
* Search books against a keyword
* Add book to a shelf
* Update shelf and apply changes globally
* Remove book from shelf


## Code Structure
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # This file contains style for the application.
    ├── App.js # This is the root of the app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── BooksAPI.js # A JavaScript API for the provided backend. Instructions for the methods are below.
    ├── components 
    │   ├── Book.js
        ├── BookList.js 
        ├── BookShelf.js
    │   ├── SearchBook.js
    ├── icons # Helpful images for the app.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Backend Server

The file [`BooksAPI.js`](src/BooksAPI.js) contains the methods required to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repo is open for contribution. Feel free to suggest a feature or open a new issue [here](https://github.com/aimenbatool/my-reads/issues).

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
