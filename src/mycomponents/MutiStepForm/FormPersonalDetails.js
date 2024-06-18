import React, { Component } from 'react'

export class FormPersonalDetails extends Component {
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
                <h3 className="card-title mb-3 text-center">Personal Details</h3>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="occupation" value={values.occupation} onChange={this.props.handleChange('occupation')} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="City" value={values.city} onChange={this.props.handleChange('city')} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input className="form-control" type="email" placeholder="Bio " value={values.bio} onChange={this.props.handleChange('bio')} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default FormPersonalDetails
