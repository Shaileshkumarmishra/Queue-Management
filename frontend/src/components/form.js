import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Alert from 'react-bootstrap/Alert';
import './FeedbackForm.css';

function FeedbackForm() {
    const [displayform, setDisplay] = useState(true);
    const [em_value, setEmValue] = useState('');
    const [nm_value, setNmValue] = useState('');
    const [ph_value, setPhValue] = useState('');
    const [checked_val, setCheckBoxChecked] = useState([]);
    const [error_msg, setErrorMsg] = useState('Please enter the value for the above field');
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        const feedbackSubmitted = localStorage.getItem('feedbackSubmitted');
        if (feedbackSubmitted === 'true') {
            setDisplay(false);
        }
    }, []);

    const handleOnChange = (isChecked, value) => {
        let temp = [...checked_val];
        var pre = value.split('_')[0];
        if (isChecked) {
            temp = temp.filter(item => item.split('_')[0] !== pre);
            temp.push(value);
            setCheckBoxChecked(temp);
            return;
        }
        setCheckBoxChecked(temp.filter(item => item !== value));
    };

    const validateForm = () => {
        setErrorMsg('Please enter the value for the above field');
        [...document.getElementsByClassName('alert-danger')].forEach(element => {
            element.style.display = "none";
        });

        if (nm_value === '') {
            document.getElementById('name_er').style.display = "block";
        } else if (em_value === '') {
            document.getElementById('email_er').style.display = "block";
        } else if (!em_value.includes('.com') || (!em_value.includes('@'))) {
            document.getElementById('email_er').style.display = "block";
            setErrorMsg('Invalid Email');
        } else if (!ph_value) {
            document.getElementById('phone_er').style.display = "block";
        } else if (ph_value.length < 13) {
            document.getElementById('phone_er').style.display = "block";
            setErrorMsg('Invalid Phone number');
        } else if (checked_val.length < Object.keys(feedback_type).length) {
            let keys = Object.keys(feedback_type);
            checked_val.forEach((val) => {
                keys = keys.filter(item => item !== val.split('_')[0]);
            });
            keys.forEach(val => {
                document.getElementById('er_' + val).style.display = "block";
            });
        } else return true;
    };

    const formSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
            var new_id = 0;
            if (existingEntries == null) existingEntries = [];
            else {
                let lastentry = existingEntries.slice(-1)[0];
                new_id = parseInt(lastentry["id"]) + 1;
            }
            var entry = {
                "id": new_id,
                "email": em_value,
                "name": nm_value,
                "phone": ph_value,
                "checkbox_values": checked_val,
            };
            existingEntries.push(entry);
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));
            localStorage.setItem('feedbackSubmitted', 'true');
            setAnimationClass('showGif');
            setDisplay(false);
        }
    };

    const feedback_type = {
        'qos': 'How satisfied were you with the postal services provided?',
        'qob': 'How would you rate the speed of delivery?',
        'roc': 'How would you rate the customer service at the post office?',
        'exp': 'How would you rate the cost of the postage services?'
    };

    const feedback_opts = ['Excellent', 'Good', 'Fair', 'Bad'];

    const resetForm = () => {
        setDisplay(true);
        setNmValue('');
        setEmValue('');
        setPhValue('');
        setCheckBoxChecked([]);
        localStorage.removeItem('feedbackSubmitted');
        setAnimationClass('');
    };

    return (
        <Container className="py-5 FeedbackForm">
            {displayform ? (
                <>
                    <Card className="shadow-lg">
                        <Card.Header className="bg-primary text-white text-center">
                            <cite title="Source Title">We are committed to providing you with the best dining experience possible, so we welcome your comments.</cite>
                        </Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0 text-center centered">
                                Please fill out this questionnaire.
                            </blockquote>
                        </Card.Body>
                    </Card>

                    {/* Customer Name Card */}
                    <Card className="mt-3 shadow-lg">
                        <Card.Body>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-primary">Customer Name</Form.Label>
                                <Form.Control type="text" placeholder="E.g. Jon Snow" value={nm_value} onChange={e => setNmValue(e.target.value)} required />
                            </Form.Group>
                            <Alert variant="danger" id="name_er">
                                &#9432; {error_msg}
                            </Alert>
                        </Card.Body>
                    </Card>

                    {/* Email Address Card */}
                    <Card className="mt-3 shadow-lg">
                        <Card.Body>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-primary">Email address</Form.Label>
                                <Form.Control type="email" placeholder="E.g. abc@gmail.com" value={em_value} onChange={e => setEmValue(e.target.value)} required />
                            </Form.Group>
                            <Alert variant="danger" id="email_er">
                                &#9432; {error_msg}
                            </Alert>
                        </Card.Body>
                    </Card>

                    {/* Phone Number Card */}
                    <Card className="mt-3 shadow-lg">
                        <Card.Body>
                            <Form.Group controlId="formBasicPhone">
                                <Form.Label className="text-primary">Phone</Form.Label>
                                <PhoneInput placeholder="9999999999" value={ph_value} onChange={setPhValue} required />
                            </Form.Group>
                            <Alert variant="danger" id="phone_er">
                                &#9432; {error_msg}
                            </Alert>
                        </Card.Body>
                    </Card>

                    {/* Feedback Cards */}
                    {Object.keys(feedback_type).map((ty) => (
                        <Card key={ty} className="mt-3 shadow-lg">
                            <Card.Body>
                                <Form.Group controlId={ty}>
                                    <Form.Label className="text-primary">{feedback_type[ty]}</Form.Label>
                                    <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        {feedback_opts.map((opt, key) => (
                                            <Form.Check
                                                inline
                                                label={opt}
                                                name={`${ty}_feedback_opts`}
                                                id={`${ty}_${key}`}
                                                checked={checked_val.includes(ty + '_' + opt)}
                                                onChange={e => handleOnChange(e.target.checked, ty + '_' + opt)}
                                                type="checkbox"
                                                value={opt}
                                                key={key}
                                            />
                                        ))}
                                    </div>
                                </Form.Group>
                                <Alert variant="danger" id={`er_${ty}`}>
                                    &#9432; {error_msg}
                                </Alert>
                            </Card.Body>
                        </Card>
                    ))}

                    <div className="button-container">
                        <Button className="btn btn-lg btn-success" onClick={formSubmit}>
                            Submit Review
                        </Button>
                    </div>
                </>
            ) : (
                <Card bg="light" text="dark" className="shadow-lg">
                    <Card.Body className="text-center">
                        {/* Replace the circle with the gif */}
                        <div className={`gif-container ${animationClass}`}>
                            <img src=".\shield_17702110.gif" alt="Thank you gif" />
                        </div>
                        <Card.Text className="text-center">
                            Thank you for providing feedback.
                        </Card.Text>
                        <Form.Text muted className="text-center d-block">
                            We will work towards improving your experience.
                        </Form.Text>
                        <div className="text-center mt-4">
                            <Button className="btn btn-lg btn-outline-primary" onClick={resetForm}>
                                Give Another Review
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default FeedbackForm;
