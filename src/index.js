import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, withRouter } from "react-router-dom";
import App from "./App";
import Loader from './components/loader';
import firebase from './configure/firebaseConfig';

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: false
    }
  }

  componentDidMount() {
    this.authListener()
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user && user.emailVerified) {
          this.setState({ loader: false })
          this.props.history.push('/dashBoard')
        } else {
          this.setState({ errors: "Please verify Account details" })
        }
      } else {
        this.setState({ loader: false })
        this.props.history.push('/login')
      }
    })
  };

  render() {
    return this.state.loader ? <Loader /> : <App />
  }
}

const AppUser = withRouter(Auth);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppUser />
    </BrowserRouter>
  </React.StrictMode>, document.getElementById('root')
);

reportWebVitals();