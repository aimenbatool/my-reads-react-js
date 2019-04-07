import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class SearchBook extends Component{

    state = {
        query: '',
        hasError: false,
    }

    books = this.props.books;
    searchedBooks = [];

    handleQuery = (event) => {
        this.setState({query: event.target.value});
        this.searchBook(event.target.value);
    }

    searchBook = (query) => {
      let tempSearchBooks =[];

      query === '' ? 
        this.books = [] :
        BooksAPI.search(query)
        .then((fetchedData) => {
          if(typeof fetchedData !== 'undefined') {
            this.searchedBooks = Array.isArray(fetchedData) ? fetchedData : fetchedData.items;
            this.searchedBooks.forEach(book => {
              let tempBook = {};
              BooksAPI.get( book.id )
              .then( result => {
                tempBook = result;
                tempBook.shelf = result.shelf;
                tempSearchBooks.push(tempBook);
                this.books = tempSearchBooks;
              } )
            });
            this.setState({
              hasError: this.searchedBooks.length === 0
            })
          }
        })
  }

    handleUpdate = (book, shelf) => {
      this.props.updateShelf(book, shelf);
    }

    render() {
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className='close-search'> Close </Link>
              <div className="search-books-input-wrapper">
                <input type="text" onChange={this.handleQuery} value={this.state.query} placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                this.state.hasError && 'No record found.'
              }
              {!this.state.hasError && this.books.filter( book => book.imageLinks).map((book, index) => {
                return(
                  <li key={index}>
                      <Book
                          book={book}
                          handleUpdate={this.handleUpdate}
                      />
                  </li>
                )
              })}   
              </ol>
            </div>
          </div>
        );
    }
}

export default SearchBook;