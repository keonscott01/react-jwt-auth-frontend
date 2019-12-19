import React, { Component } from 'react';
import './App/App.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

class ShowCommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    if (this.props.user) {
      let data = {
        userId: this.props.user._id,
        bookId: this.props.bookId
      }
      axios
        // .get('http://localhost:3000/api/comments/' + `%userId=${data.userId}` + `&%bookId=${data.bookId}`)
        .get('http://localhost:3000/api/comments/', { params : { data }})
        .then(res => {
          this.setState({
            comments: res.data
          })
        })
        .catch(err =>{
          console.log('Error from ShowCommentList');
        })
    }
  };


  render() {
    if (this.state.comments.length == 0) {
      return (
        <small>No comments yet...</small>
      )
    }
    else {
      let commentList;
      commentList = this.state.comments.map((comment) => {
        return <p key={comment._id}>{comment.comment}</p>
      });
      return (
        <div className="ShowCommentList">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <br />
                <h2 className="display-4 text-center">Comments List</h2>
              </div>
              <div className="col-md-11">
                <br />
                <br />
                <hr />
              </div>
            </div>
            <div className="list">
                  {commentList}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ShowCommentList;