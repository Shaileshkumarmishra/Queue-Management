import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa'; 
import './css.css';// For adding icons

function Submissions() {
    const allEntries = JSON.parse(localStorage.getItem("allEntries"));
    const [displayDetail, setDisplay] = useState(false);
    const [singleEntry, setSingleEntry] = useState({ 'name': '', 'email': '', 'phone': '', 'checkbox_values': [] });

    useEffect(() => {
        var id, entry;
        if (!window.location.pathname.includes('submissions')) {
            setDisplay(true);
            id = window.location.pathname.split('/').pop();
            entry = allEntries.filter(item => parseInt(item['id']) === parseInt(id))[0];
            setSingleEntry(entry);
        }
    }, []);

    const handleCheckVal = (ty, entry) => {
        var val = '';
        if (entry['checkbox_values'].length > 0) {
            val = entry['checkbox_values'].filter(item => item.split('_')[0] === ty)[0];
            val = val.split('_')[1];
        }
        return val;
    }

    const singleEntryForm = () => {
        return (
            <Container className="mt-4">
                <Card className="shadow-lg mb-4">
                    <Card.Header className="bg-primary text-white">
                        <h4>Customer Details</h4>
                    </Card.Header>
                    <Card.Body>
                        <Row className="mb-3">
                            <Col><strong>Customer Name</strong></Col>
                            <Col>{singleEntry['name']}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col><strong>Email</strong></Col>
                            <Col>{singleEntry['email']}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col><strong>Phone</strong></Col>
                            <Col>{singleEntry['phone']}</Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Card className="shadow-lg mb-4">
                    <Card.Header className="bg-success text-white">
                        <h4>Feedback Details</h4>
                    </Card.Header>
                    <Card.Body>
                        {Object.keys(feedback_type).map((ty) => (
                            <Row key={ty} className="mb-3">
                                <Col><strong>{feedback_type[ty]}</strong></Col>
                                <Col>{handleCheckVal(ty, singleEntry)}</Col>
                            </Row>
                        ))}
                    </Card.Body>
                </Card>
            </Container>
        )
    }

    
    const feedback_type = {
        'qos': 'How satisfied were you with the postal services provided?',
        'qob': 'How would you rate the speed of delivery?',
        'roc': 'How would you rate the customer service at the post office?',
        'exp': 'How would you rate the cost of the postage services?'
    };

    // Function to handle CSV download
    const downloadCSV = () => {
        const header = ['Customer Name', 'Email', 'Phone', ...Object.values(feedback_type)];
        const rows = allEntries.map(entry => [
            entry['name'],
            entry['email'],
            entry['phone'],
            ...Object.keys(feedback_type).map(ty => handleCheckVal(ty, entry))
        ]);

        const csvContent = [
            header.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'feedback_data.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <>
            {displayDetail ? 
                singleEntryForm() 
                : 
                (<div className='mt-4'>
                    <Table striped hover responsive className="table-bordered shadow-lg">
                        <thead className="thead-dark">
                            <tr>
                                <th>Customer Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                {Object.keys(feedback_type).map((ty) => (<th key={ty}>{feedback_type[ty]}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {allEntries.map(entry => (
                                <tr key={entry['id']}>
                                    <td>{entry['name']}</td>
                                    <td>{entry['email']}</td>
                                    <td>{entry['phone']}</td>
                                    {Object.keys(feedback_type).map((ty) => (
                                        <td key={ty}>{handleCheckVal(ty, entry)}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Center the download button */}
                    <div className="d-flex justify-content-center mt-4">
                        <Button onClick={downloadCSV} variant="success" size="lg" className="px-4 py-2 rounded-pill">
                            <FaDownload /> Download Feedback Data
                        </Button>
                    </div>
                </div>)
            }
        </>
    );
}

export default Submissions;
