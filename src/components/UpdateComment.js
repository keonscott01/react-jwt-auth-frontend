import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      date: ''
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:3000/api/comments/'+this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          comment: res.data.comment,
          date: res.data.date
        })
      })
      .catch(err => {
        console.log("Error from UpdateComment");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      comment: this.state.comment,
      date: this.state.date
    };

    axios
      .put('http://localhost:3000/api/comments/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-comment/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateComment!");
      })
  };


  render() {
    return (
      <div className="UpdateComment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Comments List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Comment</h1>
              <p className="lead text-center">
                  Update Comment's Description
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="title">Comment</label>
              <input
                type='text'
                placeholder='Comment Name'
                name='comment'
                className='form-control'
                value={this.state.comment}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="date">Date</label>
              <input
                type='date'
                placeholder='Date'
                name='date'
                className='form-control'
                value={this.state.date}
                onChange={this.onChange}
              />
            </div>
            
            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Comment</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateComment;