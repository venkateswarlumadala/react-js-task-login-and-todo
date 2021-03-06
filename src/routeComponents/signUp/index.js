import React from 'react';
import '../signUp/styles.css';
import firebase from '../../configure/firebaseConfig';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            errors: [],
            visible: true
        }
    }

    handleOnchange = event => this.setState({ [event.target.name]: event.target.value });

    passwordType = () => {
        this.setState({ visible: !this.state.visible })
    }

    isFormVaildate = () => {
        if (!this.state.userName) {
            window.alert('Please enter your Name')
            return false
        } else if (!this.state.userName || this.state.userName === '' || !this.state.userName.match(/^[a-zA-Z]+$/)) {
            if (!this.state.userName || this.state.userName === ' ') {
                window.alert('Please enter your Name')
            } else {
                window.alert('Please Enter a valid Name')
            }
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

    handleregister = event => {
        event.preventDefault()
        if (this.isFormVaildate()) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.saveUserData();
                    window.alert("User details saved successfully");
                })
                .then(() => {
                    firebase.auth().currentUser.sendEmailVerification()
                        .then(alt => {
                            window.alert("verification link has sent to your mail please verify the account")
                            this.props.history.push('/login')
                        })
                }).catch(err => {
                    this.setState({ errors: this.state.errors.concat(err) })
                })
        }
    }

    saveUserData = () => {
        fetch('https://ezone-2160e.firebaseio.com/userDetails.json', {
            method: 'POST',
            body: JSON.stringify({
                userName: this.state.userName,
                email: this.state.email,
                password: this.state.password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch(error => {
                console.log(error)
            })
    }

    displayErrors = errors => errors.map((error, i) => <p key={i} className="text-center">{error.message}</p>);

    render() {
        const { userName, email, password, visible, errors } = this.state;
        return (
            <div>
                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 d-flex flex-wrap">
                    <div className="col-md-3 col-xs-3 col-sm-3 col-lg-3"></div>
                    <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6 card card-body mt-4 mb-3 bshadow">
                        <div className="align-self-center">
                            <i className="fa fa-user-circle display-3" aria-hidden="true"></i>
                        </div>
                        <div className="align-self-center">
                            <label className="text-primary text-center">Create Account</label>
                        </div>
                        <form onSubmit={this.handleregister}>
                            <div className="form-group d-flex flex-wrap">
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 col-form-label">
                                    <label>Name</label>
                                    <label className="text-danger">*</label>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" name="userName" placeholder="User name" onChange={this.handleOnchange} value={userName} />
                                </div>
                            </div>
                            <div className="form-group d-flex flex-wrap">
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 col-form-label">
                                    <label>Email</label>
                                    <label className="text-danger">*</label>
                                </div>
                                <div className="col input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-envelope" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <input type="email" className="form-control" placeholder="Email" name="email" onChange={this.handleOnchange} value={email} />
                                </div>
                            </div>
                            <div className="form-group d-flex flex-wrap">
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 col-form-label">
                                    <label>PassWord</label>
                                    <label className="text-danger">*</label>
                                </div>
                                <div className="col input-group mb-2" >
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" onClick={this.passwordType}>
                                            <i className={`${visible ? "fa fa-eye-slash" : "fa fa-eye"}`} aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <input
                                        type={`${visible ? "password" : "text"}`}
                                        className="form-control"
                                        placeholder="Password-min 6 Characters"
                                        autoComplete="true"
                                        name="password"
                                        onChange={this.handleOnchange}
                                        value={password} />
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 d-flex flex-wrap mb-3">
                                <div className="col-md-2 col-sm-2 col-xs-2 col-lg-2"></div>
                                <div className="col-sm-7 col-md-7 col-xs-7 col-lg-7">
                                    <button type="submit" className="btn btn-primary btn-block w-75">Submit</button>
                                </div>
                                <div className="col-md-3 col-sm-3 col-xs-3 col-lg-3"></div>
                            </div>
                            {errors.length > 0 && (
                                <div className="card card-body Error">
                                    <label className="text-center">Error</label>
                                    {this.displayErrors(errors)}
                                </div>
                            )
                            }
                        </form>
                    </div>
                    <div className="col-md-3 col-xs-3 col-sm-3 col-lg-3"></div>
                </div>
            </div>
        );
    }
}