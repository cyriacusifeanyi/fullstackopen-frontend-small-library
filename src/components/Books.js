import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from './queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all genres')


  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks2
  // const books = []

  return (
    <div>
      <h2>books</h2>

      in genre <strong>{genre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>

          {(genre === "all genres") ? (
            books.map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.published}</td>
              </tr>
            ))
          ) : (
            books.filter(book =>
              book.genres.includes(genre)).map(filteredBook => (
                <tr key={filteredBook.title}>
                  <td>{filteredBook.title}</td>
                  <td>{filteredBook.author}</td>
                  <td>{filteredBook.published}</td>
                </tr>
              ))
          )}

        </tbody>
      </table>
      {books.map(book =>
        book.genres.map(genre =>
          <button onClick={() => setGenre(genre)}>{genre}</button>)
      )}
      <button onClick={() => setGenre("all genres")}>all genres</button>

    </div>
  )
}

export default Books