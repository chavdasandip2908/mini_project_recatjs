import React, { Component } from 'react'

export class Confirm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const { values } = this.props;
        return (
            <>
                <h3 className="card-title mb-3 text-center">User Details</h3>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input className="form-control" disabled type="text" placeholder="First Name" value={values.firstName} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input className="form-control " disabled type="text" placeholder="Last Name" value={values.lastName} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input className="form-control " disabled type="email" placeholder="Email " value={values.email} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input className="form-control " disabled type="text" placeholder="occupation" value={values.occupation} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input className="form-control " disabled type="text" placeholder="City" value={values.city} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input className="form-control " disabled type="email" placeholder="Bio " value={values.bio} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Confirm
