import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from './queries'
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  let [name, setName] = useState(null);
  let [born, setBorn] = useState(0)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
  // const authors = []

  const submit = async (event) => {
    event.preventDefault()
    born = parseInt(born)
    name = name.value
    editAuthor({
      variables: { name, born }
    })

    console.log('updating author...')

    setName(null)
    setBorn(0)
  }

  const options = authors.map(a => ({ 'value': a.name, 'label': a.name, }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div >
  )
}

export default Authors
