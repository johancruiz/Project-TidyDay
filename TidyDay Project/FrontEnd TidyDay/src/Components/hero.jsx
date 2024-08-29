import Carousel from 'react-bootstrap/Carousel';

// Importa las imágenes aquí
import imgHero1 from '../assets/images/inicio1.jpg';
import imgHero2 from '../assets/images/inicio2.jpg';
import imgHero3 from '../assets/images/inicio3.jpg';

var heroData = [
  {
    id: 1,
    image: imgHero1,
    title: 'Welcome to TidyDay.',
    description: '“Welcome to TidyDay, your space to transform your personal and professional life. Here we help you improve, organize and order every aspect of your day to day life, so you can live with more clarity and purpose.”',
    link: '#about'
  },
  {
    id: 2,
    image: imgHero2,
    title: 'Welcome to TidyDay.',
    description: '“At TidyDay, we are committed to helping you achieve a more balanced and organized life. Discover tools and tips to improve your environment, both at home and at work, and enjoy a more orderly and efficient everyday life.”',
    link: '#about'
  },
  {
    id: 3,
    image: imgHero3,
    title: 'Welcome to TidyDay.',
    description: '“Welcome to TidyDay, where we believe organization is key to a fulfilling life. We offer you resources and guidance so you can take control of your personal and professional life, achieving more with less effort.”',
    link: '#about'
  }
];

function AppHero() {
  return (
    <>
      <div className='welcome-mode'>
        <section id="home" className="hero-block">
          <Carousel>
            {
              heroData.map(hero => {
                return (
                  <Carousel.Item key={hero.id}>
                    <img
                      className="d-block w-100"
                      src={hero.image}
                      alt={"slide " + hero.id}
                    />
                    <Carousel.Caption>
                      <h2>{hero.title}</h2>
                      <p>{hero.description}</p>
                      <a className="btn btn-primary" href={hero.link}>Learn More <i className="fas fa-chevron-right"></i></a>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })
            }
          </Carousel>
        </section>
      </div>
    </>
  );
}

export default AppHero;
