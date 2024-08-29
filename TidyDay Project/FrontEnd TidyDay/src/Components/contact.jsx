import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AppContact() {
  return (
    <>
      <div className='welcome-mode'>
        <section id="contact" className="block contact-block">
          <Container fluid>
            <div className="title-holder">
              <h2>Contact us</h2>
              <div className="subtitle">get connected with us</div>
            </div>
            <Form className='contact-form'>
              <Row>
                <Col sm={4}>
                  <Form.Control type="text" placeholder="Enter your full name" required />
                </Col>
                <Col sm={4}>
                  <Form.Control type="email" placeholder="Enter your email address" required />
                </Col>
                <Col sm={4}>
                  <Form.Control type="text" placeholder="Enter the subject" required />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Form.Control as="textarea" placeholder="Enter your message" required />
                </Col>
              </Row>
              <div className='btn-holder'>
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Container>
        </section>
      </div>
    </>

  );
}

export default AppContact;