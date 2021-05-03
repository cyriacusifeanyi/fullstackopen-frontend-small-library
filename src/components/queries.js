import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    id
    name
    born
    bookCount
  }
}`

export const ALL_BOOKS = gql`
query {
  allBooks2{
    title
    author
    published
  }
}`

// export const CREATE_PERSON = gql`
//   mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
//     // ...
//   }
// `