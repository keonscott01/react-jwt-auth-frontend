import React, { Component } from 'react'
import {
  Route,
  Switch,
  withRouter,
  Link,
  BrowserRouter as Router
} from 'react-router-dom'
import axios from 'axios'
import './App.css';

import NavBar from '../NavBar/NavBar'
import SignUpForm from '../SignUpForm/SignUpForm'
import LogInForm from '../LogInForm/LogInForm'
import LogOut from '../LogOut/LogOut'
import Profile from '../Profile/Profile'
import CreateComment from '../CreateComment';
import UpdateComment from '../UpdateComment';
import ShowCommentDescription from '../ShowCommentDescription';
import ShowCommentList from '../ShowCommentList';
import Books from '../Books';
import SearchBox from '../SearchBox';

const databaseUrl = process.env.NODE_ENV === 'production' ? process.env.BACKEND_APP_URL : 'http://localhost:3000'

class App extends Component {
  state = {
    email: '',
    password: '',
    isLoggedIn: false,
    user: null
  }

  componentDidMount() {
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true
      })
    } else {
      this.setState({
        isLoggedIn: false
      })
    }
    // if (localStorage.token) {
    //   axios(
    //     {
    //       method: 'post',
    //       url: `${databaseUrl}/api/users`,
    //       headers: { Authorization: `Bearer ${localStorage.token}` }
    //     })
    //     .then(response => {
    //       this.setState({
    //         isLoggedIn: true,
    //         user: response.data.user
    //       })
    //       this.props.history.push('/profile')
    //     })
    //     .catch(err => console.log(err))
    // } else {
    //   this.setState({
    //     isLoggedIn: false
    //   })
    // }
  }

  handleLogOut = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    this.setState({
      email: '',
      password: '',
      isLoggedIn: false
    })
    this.props.history.push('/login')
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignUp = (e) => {
    e.preventDefault()
    let newUser = {
      email: this.state.email,
      password: this.state.password
    }
    axios(
      {
        method: 'post',
        url: `${databaseUrl}/api/users/signup`,
        data: newUser
      })
      .then(response => {
        console.log(response)
        const location = {
          pathname: '/login',
          state: { fromDashboard: true }
        }
        this.props.history.replace(location)
      })
      .catch(err => console.log(err))
  }

  handleLogIn = (e) => {
    e.preventDefault()
    let loginUser = {
      email: this.state.email,
      password: this.state.password
    }
    axios(
      {
        method: 'post',
        url: `${databaseUrl}/api/users/login`,
        data: loginUser
      })
      .then(response => {
        console.log(response)
        window.localStorage.setItem('token', response.data.token)
        this.setState({
          isLoggedIn: true,
          user: response.data.user,
          email: '',
          password: ''
        })
        const location = {
          pathname: '/profile',
          state: { fromDashboard: true }
        }
        this.props.history.replace(location)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      
      <div>
        <NavBar isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        <div className='body'>
          <Switch>
            <Route path='/signup'
              render={(props) => {
                return (
                  <SignUpForm isLoggedIn={this.state.isLoggedIn} handleInput={this.handleInput} handleSignUp={this.handleSignUp} />
                )
              }}
            />
            <Route path='/logout'
              render={(props) => {
                return (
                  <LogOut isLoggedIn={this.state.isLoggedIn} handleLogOut={e => this.handleLogOut(e)} />
                )
              }}
            />
            <Route path='/login'
              render={(props) => {
                return (
                  <LogInForm isLoggedIn={this.state.isLoggedIn} handleInput={this.handleInput} handleLogIn={this.handleLogIn} />
                )
              }}
            />
            <Route path='/profile'
              render={(props) => {
                return (
                  <Profile isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
                )
              }}
            />
            <Route exact path='/' component={ShowCommentList} />
            <Route path='/create-comment' component={CreateComment} />
            <Router basename='/'>
        <nav>
          <Link to="/Search">Search</Link>{' '}
        </nav>

        <div>
        <Route path="/Search" component={Books} /> 
        {/* <Route  exact path="/Image" component={BookImage}/> */}
        </div>  
      </Router>
          </Switch>
        </div>
      </div>
    )
  }
  // render() {
  //   return (
  //     <Router>
  //       <div>
  //         <Route exact path='/' component={ShowCommentList} />
  //         <Route path='/create-comment' component={CreateComment} />
  //         <Route path='/edit-comment/:id' component={UpdateComment} />
  //         <Route path='/show-comment/:id' component={ShowCommentDescription} />
  //       </div>
  //     </Router>
  //   );
  // }
}

export default withRouter(App)
