import React, { Component } from 'react'

export class FormUserDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {

        const { values } = this.props;
        console.log(values);


        return (
            <>
                <h3 className="card-title mb-3 text-center">User Details</h3>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="First Name" value={values.firstName} onChange={this.props.handleChange('firstName')}/> 
                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Last Name" value={values.lastName} onChange={this.props.handleChange('lastName')}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input className="form-control" type="email" placeholder="Email " value={values.email} onChange={this.props.handleChange('email')}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default FormUserDetails
