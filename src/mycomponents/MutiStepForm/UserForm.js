import React, { Component } from 'react';
import FormUserDetails from "./FormUserDetails";
import FormPersonalDetails from "./FormPersonalDetails";
import Confirm from "./Confirm";
import Success from "./Success";

class UserForm extends Component {

    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        occupation: '',
        city: '',
        bio: ''
    }
    // next step method
    nextStep = () => {
        const { step } = this.state;
        step === 4 ?
            this.setState({
                step: 1
            })
            :
            this.setState({
                step: step + 1
            });
        ;
    }
    // preview step method
    prevStep = () => {
        const { step } = this.state;

        this.setState({
            step: step - 1
        });
    }
    // chage any field value method
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, occupation, city, bio } = this.state;
        const values = { firstName, lastName, email, occupation, city, bio };
        console.log(values);
        return (
            <div className="container mt-5 mb-5 d-flex justify-content-center">
                <div className="card px-1 py-4">
                    <div className="card-body">
                        {step === 1 ?
                            <FormUserDetails handleChange={this.handleChange} values={values} />
                            : step === 2 ?
                                <FormPersonalDetails handleChange={this.handleChange} values={values} />
                                : step === 3 ?
                                    <Confirm handleChange={this.handleChange} values={values} />
                                    : step === 4 ?
                                        <Success handleChange={this.handleChange} values={values} /> : ''
                        }
                        <div className=" d-flex flex-row mt-3 mb-3 w-100 gap-2">
                            {(step !== 1 && step !== 4) ?
                                <button className="btn btn-secondary py-2 w-100 mx-0" onClick={this.prevStep}>Back</button> : ''
                            }

                            <button className="btn btn-primary py-2 w-100  mx-0" onClick={this.nextStep}>
                                {step !== 4
                                    ? (step === 3 ? 'Confirm' : 'Next')
                                    : 'Back to Main Page'
                                }
                            </button>
                        </div>
                    </div>
                </div >
            </div >
        )

    }
}

export default UserForm;
