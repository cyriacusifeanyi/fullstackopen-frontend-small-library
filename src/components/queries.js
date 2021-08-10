import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id
  title
  published
  genres
}`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
  }
}`
// bookCount

export const ALL_BOOKS = gql`
query {
  allBooks2{
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
// author

export const USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
// author

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name, 
    setBornTo: $born
    ){id}
}`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
  }
}
${BOOK_DETAILS}
`