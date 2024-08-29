import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

// Importa las imágenes aquí
import team1 from '../assets/images/teamJohan.avif';
import team2 from '../assets/images/teamBrayam.jpg';
import team3 from '../assets/images/teamKevin.webp';
import team4 from '../assets/images/teamSebastian.webp';

const teamsData = [
  {
    id: 1,
    image: team1,
    fbLink: 'https://www.facebook.com',
    twitterLink: 'https://www.twitter.com',
    linkedinLink: 'https://www.linkedin.com',
    name: 'Johan Ruiz',
    designation: 'Bakcend',
  },
  {
    id: 2,
    image: team2,    
    fbLink: 'https://www.facebook.com',
    twitterLink: 'https://www.twitter.com',
    linkedinLink: 'https://www.linkedin.com',
    name: 'Brayam Leal',
    designation: 'Frontend',
  },
  {
    id: 3,
    image: team3,    
    fbLink: 'https://www.facebook.com',
    twitterLink: 'https://www.twitter.com',
    linkedinLink: 'https://www.linkedin.com',
    name: 'Kevin Fuentes',
    designation: 'Backend',
  },
  {
    id: 4,
    image: team4,    
    fbLink: 'https://www.facebook.com',
    twitterLink: 'https://www.twitter.com',
    linkedinLink: 'https://www.linkedin.com',
    name: 'Sebastian Jaimes',
    designation: 'Frontend',
  }
]

function AppTeams() {
  return (
    <>
      <div className='welcome-mode'>
      <section id="teams" className="block teams-block">
            <Container fluid>
              <div className="title-holder">
                <h2>Our teams</h2>
                <div className="subtitle">some of our experts</div>
              </div>
              <Row>
                {
                  teamsData.map(teams => {
                    return (
                      <Col sm={3} key={teams.id}>
                        <div className='image'>
                          <Image src={teams.image} />
                          <div className='overlay'>
                            <div className='socials'>
                              <ul>
                                <li><a href={teams.fbLink}><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href={teams.twitterLink}><i className="fab fa-twitter"></i></a></li>
                                <li><a href={teams.linkedinLink}><i className="fab fa-linkedin-in"></i></a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className='content'>
                          <h3>{teams.name}</h3>
                          <span className='designation'>{teams.designation}</span>
                        </div>
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

export default AppTeams;
