import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './App/App.css';
import axios from 'axios';


class CreateComment extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      date:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    let user = JSON.parse(window.localStorage.user)

    const data = {
      userId: user._id,
      comment: this.state.comment,
      bookId: this.props.bookId,
    };

    axios
      .post('http://localhost:3000/api/comments', data)
      .then(res => {
        this.setState({
          comment: '',
          date:''
        })
      })
      .catch( err => {
        console.log("Error somewhere in CreateComment component!", err);
      })
  };

  render() {
    return (
      <div className="CreateComment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              {/* <Link to='/comments-list' className="btn btn-outline-warning float-left">
                  Show Reviews List
              </Link> */}
            </div>
            <div className="col-md-8 m-auto">
              <h2 className="display-4 text-center">Write a Review?</h2>
              <p className="lead text-center">
                  Good or Bad..
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Review Description'
                    name='comment'
                    className='form-control'
                    value={this.state.comment}
                    onChange={this.onChange}
                  />
                </div>
                
                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateComment;