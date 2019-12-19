import React from 'react';
import CreateComment from './CreateComment'
import ShowCommentList from './ShowCommentList'
import { Button, Card,  } from 'react-bootstrap';




const BookList = (props) => {

    let user = JSON.parse(window.localStorage.user)

    if (props.books.length > 0) {
        var books = props.books.map((book, index) => {
            return <div key={index}>
                <img src={book.volumeInfo.imageLinks.thumbnail} alt='Book Thumbnail'></img>
                <h1>{book.volumeInfo.title}</h1>
                <h3>{book.volumeInfo.authors[0]}</h3>
                <p>{book.volumeInfo.publishedDate}</p>
                <ShowCommentList bookId={book.id} user={user} />
                <CreateComment bookId={book.id} />
            </div>
        })
    }

    return (

<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={book.volumeInfo.imageLinks.thumbnail} />
  <Card.Body>
    <Card.Title>{book.volumeInfo.title}</Card.Title>
    <Card.Text>
    <h3>{book.volumeInfo.authors[0]}</h3>
    <p>{book.volumeInfo.publishedDate}</p>
    </Card.Text>
    <Button bookId={book.id} variant="primary">Create Comment</Button>
  </Card.Body>
</Card>
        // <div>
        //     <ul>
        //         {books}
        //     </ul>
        // </div>

    )


}

export default BookList;