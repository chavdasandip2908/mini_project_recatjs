import React, { Component } from 'react'

export class Success extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const cardStyle = {
            background: 'white',
            padding: '60px',
            borderRadius: '4px',
            boxShadow: '0 2px 3px #C8D0D8',
            display: 'inline-block',
            margin: '0 auto',
            textAlign: 'center' 
        };

        const circleStyle = {
            borderRadius: '200px',
            height: '200px',
            width: '200px',
            background: '#F8FAF5',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        };

        const checkmarkStyle = {
            color: '#9ABC66',
            fontSize: '100px',
            lineHeight: '200px'
        };

        const headingStyle = {
            color: '#88B04B',
            fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
            fontWeight: 900,
            fontSize: '40px',
            marginBottom: '10px'
        };

        const paragraphStyle = {
            color: '#404F5E',
            fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
            fontSize: '20px',
            margin: 0
        };

        return (
            <div style={cardStyle}>
                <div style={circleStyle}>
                    <i style={checkmarkStyle}>✓</i>
                </div>
                <h1 style={headingStyle}>Success</h1>
                <p style={paragraphStyle}>
                    From submited successfully. <br /> Thank You
                </p>
            </div>
        );
    }
}

export default Success
