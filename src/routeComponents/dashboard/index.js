import React from 'react'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            phone: '',
            website: '',
            address: '',
            inputText: [],
            error: false,
            editable: false
        }
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
        } else if (!this.state.phone || this.state.phone === '' || this.state.phone.length < 10 || !this.state.phone.match(/^[0-9]+$/)) {
            if (!this.state.phone || this.state.phone === ' ') {
                window.alert('Please enter Phone Number')
            } else {
                window.alert('Your Phone Number should consists of Numbers only')
            }
            return false
        } else if (!this.state.website || this.state.website === '' || !this.state.website.match(/^(ftp|http|https):\/\/[^ "]+$/)) {
            if (!this.state.website || this.state.website === ' ') {
                window.alert('Please enter your Website')
            } else {
                window.alert('Please Enter a valid Website')
            }
            return false
        } else if (!this.state.address || this.state.address === '' || !this.state.address.match(/^([a-zA-z0-9/\\''(),-\s]{2,255})$/)) {
            if (!this.state.address || this.state.address === ' ') {
                window.alert('Please enter your Address')
            } else {
                window.alert('Please Enter a valid Address')
            }
            return false
        } else {
            return true
        }
    }

    handleOnsubmit = (e) => {
        e.preventDefault();
        const { userName, email, phone, website, address, inputText, editable } = this.state;
        if (this.isFormVaildate() & editable) {
            this.setState({ editable: false })
        } else {
            if (userName === "" || email === "" || phone === "" || website === "" || address === "") {
                this.setState({ error: true })
            } else {
                this.setState({ inputText: inputText.concat(this.state.userName, this.state.email, this.state.phone, this.state.website, this.state.address), error: false });
            }

        }
    }

    handleOnchange = event => this.setState({ [event.target.name]: event.target.value });

    render() {
        const { userName, email, phone, website, address } = this.state;
        return (
            <div style={{ overflowX: 'scroll' }}>
                <div className='className="col-md-12 col-sm-12 col-xs-12 col-lg-12 d-flex flex-wrap mt-3 mb-3'>
                    <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4"></div>
                    <div className="col-md-4 col-sm-4 col-xs-4 col-lg-4 card card-body bg-light">
                        <div className="align-self-center">
                            <i className="fa fa-user-circle display-3" aria-hidden="true"></i>
                        </div>
                        <div className="align-self-center mb-3">
                            <h3 className="text-primary text-center">User Details</h3>
                        </div>
                        <form onSubmit={this.handleOnsubmit}>
                            <div className="form-group d-flex flex-wrap">
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 col-form-label">
                                    <label>Name</label>
                                </div>
                                <div className="col input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Name" name="userName" onChange={this.handleOnchange} value={userName} />
                                </div>
                            </div>
                            <div className="form-group d-flex flex-wrap">
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 col-form-label">
                                    <label>Email</label>
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
                                    <label>Phone</label>
                                </div>
                                <div className="col input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-phone" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <input type="number" className="form-control" placeholder="Mobile Number" name="phone" onChange={this.handleOnchange} value={phone} />
                                </div>
                            </div>
                            <div className="form-group d-flex flex-wrap">
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 col-form-label">
                                    <label>Website</label>
                                </div>
                                <div className="col input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-rss" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Website" name="website" onChange={this.handleOnchange} value={website} />
                                </div>
                            </div>
                            <div className="form-group d-flex flex-wrap">
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 col-form-label">
                                    <label>Adderss</label>
                                </div>
                                <div className="col">
                                    <textarea type="text" className="form-control" name="address" placeholder="Address" onChange={this.handleOnchange} value={address} />
                                </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center mb-3">
                                <button type="submit" className="btn btn-success btn-block w-50">Add</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4"></div>
                </div>
                <div className='col-md-12 col-sm-12 col-xs-12 col-lg-12 d-flex flex-wrap'>
                    <div className="col-md-1 col-xs-1 col-sm-1 col-lg-1"></div>
                    <table className="table col-md-10 col-sm-10 col-xs-10 col-lg-10">
                        <tbody>
                            <tr className="thead-dark text-center">
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Website</th>
                                <th scope="col">Address</th>
                                <th scope="col">Edit/Delete</th>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className="text-center">
                                {this.state.inputText.map((value, index) =>
                                    <td key={index}>{value}</td>
                                )}
                            </tr>
                        </tbody>
                    </table>
                    <div className="col-md-1 col-xs-1 col-sm-1 col-lg-1"></div>
                </div>
            </div>
        )
    }
}