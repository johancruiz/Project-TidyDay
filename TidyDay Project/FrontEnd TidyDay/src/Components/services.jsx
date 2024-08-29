import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const servicesData = [
  {
    id: 1,
    icon: 'fas fa-clone',
    title: 'Personalized Organization:',
    description: 'Tools adaptable to your individual needs.'
  },
  {
    id: 2,
    icon: 'fas fa-snowflake',
    title: 'Continuous Improvement:',
    description: 'Proven tips and techniques to maximize your productivity.'
  },
  {
    id: 3,
    icon: 'fas fa-plug',
    title: 'Efficient Planning:',
    description: 'Methods for successfully planning your projects and activities.'
  },
  {
    id: 4,
    icon: 'fas fa-desktop',
    title: 'Clear Structure:',
    description: 'Guidelines for maintaining an organized and stress-free environment.'
  },
  {
    id: 5,
    icon: 'fas fa-trophy',
    title: 'Effective Tracking:',
    description: 'Tools to evaluate your progress and adjust your planning.'
  },
  {
    id: 6,
    icon: 'fas fa-life-ring',
    title: 'Versatile Resources:',
    description: 'From customizable checklists to downloadable templates.'
  }
]

function AppServices() {
  return (
    <>
    <div className='welcome-mode'>
    <section id="services" className="block services-block">
      <Container fluid>
        <div className="title-holder">
          <h2 className='services-title'>what we offer for you</h2>
          <div className="subtitle">Sour mission is to help you achieve your goals and optimize your time in a practical and simple way.
          In TidyDay you will find:</div>
        </div>
        <Row>
          {
            servicesData.map(services => {
              return (
                <Col sm={4} className='holder' key={services.id}>
                  <div className="icon">
                    <i className={services.icon}></i>
                  </div>
                  <h3 className='services-subTitle'>{services.title}</h3>
                  <p>{services.description}</p>
                </Col>
              );
            })
          }
        </Row>
      </Container>
    </section>
    </div>
    </>
  );
}

export default AppServices;