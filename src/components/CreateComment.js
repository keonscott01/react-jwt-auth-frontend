import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
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

    const data = {
      comment: this.state.comment,
      date: this.state.date,
    };

    axios
      .post('http://localhost:3000/api/comments', data)
      .then(res => {
        this.setState({
          comment: '',
          date:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error somewhere in CreateComment component!");
      })
  };

  render() {
    return (
      <div className="CreateComment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Comments List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Comment</h1>
              <p className="lead text-center">
                  Create new comment
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Comment Name?'
                    name='comment'
                    className='form-control'
                    value={this.state.comment}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='date'
                    placeholder='Date'
                    name='date'
                    className='form-control'
                    value={this.state.date}
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