import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './components/BookList';
import SearchBook from './components/SearchBook';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {

  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then( fetchedData => {
      this.setState({books: fetchedData})
    })
  }

  updateShelf = (book, shelf) => {
    let success = false;

    BooksAPI.update(book, shelf)
    .then( result => {

      if(shelf === 'none') {
        success = result.hasOwnProperty(book.shelf) && result[book.shelf].includes(book.id) ? false : true;
      }else {
        success = result.hasOwnProperty(shelf) && result[shelf].includes(book.id) ? true : false;
      }

      if ( success ) {
        let tempBooks = [...this.state.books];
        const bookToUpdate = tempBooks.filter( tempBook => tempBook.id === book.id);
        if(bookToUpdate.length > 0 ) {
          bookToUpdate[0].shelf = shelf;
          this.setState({books: tempBooks});
        } else {
          tempBooks = [...tempBooks, book];
          this.setState({books: tempBooks});
        }
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' 
        component={() => 
        <SearchBook 
          updateShelf={this.updateShelf}
          books={this.state.books}
          />
        }/>

        <Route exact 
        path='/' 
        component={() => 
        <BookList
          books={this.state.books}
          updateShelf={this.updateShelf}
          />
        }/>
      </div>
    )
  }
}

export default BooksApp;
