

import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const DescriptionGenerate = () => {
    const [prompt, setPrompt] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const generateDescription = () => {
        setLoading(true);

        const formData = new FormData();
        formData.append('data', prompt);

        axios.post('http://localhost:5000/generateDesc', formData)
            .then(response => {
                setDescription(response.data.description);
                console.log(response)
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching description:', error);
                setLoading(false);
            });
    };

    return (
        <Container className='p-2'>
            <Row className='my-2'>
                <Col >
                    <Form.Group controlId="promptTextArea">
                        <Form.Label className='text-light'>Enter your prompt:</Form.Label>
                        <Form.Control
                            variant='dark'
                            as="textarea"
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            placeholder="Enter your prompt..."
                            rows={3}
                        />
                    </Form.Group>
                    <div className='text-center'>
                        <Button
                            className='my-3 text-center'
                            variant="primary"
                            onClick={generateDescription}
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'Generate Description'}
                        </Button>
                    </div>

                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="descriptionTextArea">
                        <Form.Label className='text-light'>Generated Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            readOnly
                            placeholder="Generated Description will appear here..."
                            rows={8}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
};

export default DescriptionGenerate;
