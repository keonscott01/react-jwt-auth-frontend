import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class showCommentDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {}
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:3000/api/comments/'+this.props.match.params.id)
      .then(res => {
        // console.log("Print-showBookDetails-API-response: " + res.data);
        this.setState({
          comment: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowCommentDescription");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:3000/api/comments/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowCommentDescription_deleteClick");
      })
  };


  render() {

    const comment = this.state.comment;
    let UserComment = <div>
      <table className="table table-hover table-dark">
        {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Comment</td>
            <td>{ comment.comment }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Date</td>
            <td>{ comment.date }</td>
          </tr>
            
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowCommentDescription">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Comment List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Comment's Record</h1>
              <p className="lead text-center">
                  View Comment's Description
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { CommentItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,book._id)}>Delete Book</button><br />
            </div>

            <div className="col-md-6">
              <Link to={`/edit-comment/${comment._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit Comment
              </Link>
              <br />
            </div>

          </div>
            {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> */}

        </div>
      </div>
    );
  }
}

export default showCommentDescription;