import React, { Component } from 'react'
import { Link } from "react-router-dom";
import '../login/styles.css';
import firebase from '../../configure/firebaseConfig';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: [],
            hidden: true
        };
    }

    handleOnchange = event => this.setState({ [event.target.name]: event.target.value });

    passwordType = () => {
        this.setState({ hidden: !this.state.hidden })
    }

    isFormVaildate = () => {
        if (!this.state.email) {
            window.alert('Please enter your email & password')
            return false
            //eslint-disable-next-line
        } else if (!this.state.email || this.state.email === '' || !this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            if (!this.state.email || this.state.email === ' ') {
                window.alert('Please enter your email')
            } else {
                window.alert('Please Enter a valid email')
            }
            return false
        } else if (!this.state.password || this.state.password === '' || this.state.password.length < 8 || !this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)) {
            if (!this.state.password || this.state.password === ' ') {
                window.alert('Please enter your Password')
            } else {
                window.alert('Your Password should consists of upto 8 Characters, Letters, Numbers & Symbols')
            }
            return false
        } else {
            return true
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormVaildate(this.state)) {
            let errors = [];
            let error;
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            if (user && user.emailVerified) {
                                this.props.history.push('/dashBoard')
                            } else {
                                error = { message: "Please verify Account details" }
                                this.setState({ errors: errors.concat(error) })
                            }
                        } else {
                            this.props.history.push('/home')
                        }
                    })
                })
                .catch(err => {
                    this.setState({ errors: this.state.errors.concat(err)})
                })
        }
    }

    displayErrors = errors => errors.map((error, i) => <p key={i} className="text-center">{error.message}</p>);

    render() {
        const { email, password, errors, hidden } = this.state;
        return (
            <div>
                <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12 d-flex flex-wrap">
                    <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4"></div>
                    <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 card card-body bshadow mt-4 mb-3">
                        <div className="align-self-center">
                            <i className="fa fa-user-circle display-3" aria-hidden="true"></i>
                        </div>
                        <div className="align-self-center">
                            <label className="text-primary text-center">Login</label>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    onChange={this.handleOnchange}
                                    value={email}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" onClick={this.passwordType}>
                                        <i className={`${hidden ? "fa fa-eye-slash" : "fa fa-eye"}`} aria-hidden="true"></i>
                                    </span>
                                </div>
                                <input
                                    type={`${hidden ? "password" : "text"}`}
                                    className="form-control"
                                    placeholder="Password"
                                    autoComplete="true"
                                    name="password"
                                    onChange={this.handleOnchange}
                                    value={password}
                                />
                            </div>
                            <div className="d-flex flex-wrap justify-content-between mb-3">
                                <div >
                                    <input type="checkbox" className="text-secondary" />
                                    <label className="text-secondary text-center ml-2">Remember Me</label>
                                </div>
                                <Link to="forgetpassword">
                                    <label className="text-secondary"> Forget Password?</label>
                                </Link>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center mb-3">
                                <button type="submit" className="btn btn-success btn-block w-50">Submit</button>
                            </div>
                        </form>
                        <div className="d-flex flex-wrap justify-content-center mb-3">
                            <label className="text-secondary text-center button-font-size" >OR</label>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center mb-3">
                            <button type="submit" className="btn btn-danger btn-block w-50">Google</button>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center mb-3">
                            <button type="submit" className="btn btn-dark btn-block w-50" >GitHub</button>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center mb-3">
                            <button type="submit" className="btn btn-primary btn-block w-50" >Facebook</button>
                        </div>
                        {errors.length > 0 && (
                            <div className="card card-body Error">
                                <label className="text-center">Error</label>
                                {this.displayErrors(errors)}
                            </div>
                        )
                        }
                    </div>
                    <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4"></div>
                </div>
            </div>
        )
    }
}