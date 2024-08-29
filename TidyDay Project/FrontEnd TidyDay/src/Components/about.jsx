import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';

import img1 from '../assets/images/aboutUs.jpg';

function AppAbout() {
  
  const interactive = 89;
  const recommended = 96;
  const dynamic = 87;

  return (
    <>
      <div className='welcome-mode'>
        <section id="about" className="block about-block">
          <Container fluid>
            <div className="title-holder">
              <h2>About Us</h2>
              <div className="subtitle">learn more about us</div>
            </div>
            <Row>
              <Col sm={6}>
                <Image src={img1} />
              </Col>
              <Col sm={6}>
              <p>Get started today and take the first step towards a more organized and productive
                    life with TidyDay!</p>
                  <p>Our platform is designed to be easy to use and intuitive, ensuring you can start
                    transforming your routine from day one. Discover how you can simplify your life with TidyDay.</p>
                    <div className='progress-block'>
                    <h4>interactive</h4>
                    <ProgressBar now={interactive} label={`${interactive}%`} />
                  </div>
                  <div className='progress-block'>
                    <h4>recommended</h4>
                    <ProgressBar now={recommended} label={`${recommended}%`} />
                  </div>
                  <div className='progress-block'>
                    <h4>dynamic</h4>
                    <ProgressBar now={dynamic} label={`${dynamic}%`} />
                  </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}

export default AppAbout;