import React, { Component } from 'react';
import './App/App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ShowCommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/api/comments')
      .then(res => {
        this.setState({
          comments: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowCommentList');
      })
  };


  render() {
    const comments = this.state.comments;
    console.log("PrintComment: " + comments);
    let commentList;

    // if(!comments) {
    //   commentList = "there is no comment record!";
    // } else {
    //   commentList = comments.map((comment, k) =>
    //     <CommentCard comment={comment} key={k} />
    //   );
    // }

    return (
      <div className="ShowCommentList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Comments List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-comment" className="btn btn-outline-warning float-right">
                + Add New Comment
              </Link>
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

export default ShowCommentList;