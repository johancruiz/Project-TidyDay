import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

const pricingData = [
  {
    id: 1,
    plan: 'Basic',
    price: '$0',
    features: ['basic functions', 'choose avatar', '', '', '', ''],
    link: 'https://www.google.com'
  },
  {
    id: 2,
    plan: 'Premium',
    price: '$45',
    features: ['basic functions', 'choose avatar', 'change theme', 'best support', 'custom avatar', 'premium options'],
    link: 'https://www.facebook.com'
  },
  {
    id: 3,
    plan: 'Pro',
    price: '$20',
    features: ['basic functions', 'choose avatar', 'change theme', 'best support', '', ''],
    link: 'https://www.twitter.com'
  }
]

function AppPricing() {
  return (
    <>
      <div className='welcome-mode'>
        <section id="pricing" className="block pricing-block">
          <Container fluid>
            <div className="title-holder">
              <h2>¡CHOOSE YOUR BEST VERSION!</h2>
              <div className="subtitle">check our pricing &amp; plans</div>
            </div>
            <Row>
              {
                pricingData.map(pricing => {
                  return (
                    <Col sm={4} key={pricing.id}>
                      <div className='heading'>
                        <h3>{pricing.plan}</h3>
                        <span className='price'>{pricing.price}</span>
                      </div>
                      <div className='content'>
                        <ListGroup>
                          {
                            pricing.features.map((feature, index) => {
                              return (
                                <ListGroup.Item key={index}>{feature}</ListGroup.Item>
                              );
                            })
                          }
                        </ListGroup>
                      </div>
                      <div className='btn-holder'>
                        <a href={pricing.link} className='btn btn-primary'>Order Now</a>
                      </div>
                    </Col>
                  )
                })
              }
            </Row>
          </Container>
        </section>
      </div>
    </>

  )
}

export default AppPricing;