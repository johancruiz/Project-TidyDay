import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../App.css"

import AppHeader from '../Components/header';
import AppHero from '../Components/hero';
import AppAbout from '../Components/about';
import AppServices from '../Components/services';
import AppTeams from '../Components/teams';
import AppPricing from '../Components/pricing';
import AppContact from '../Components/contact';
import AppFooter from '../Components/footer';
function LandingPage() {

  return (
    <>
      <div className="App">
      <header id='header'>
        <AppHeader />
      </header>
      <main>
        <AppHero />
        <AppAbout />
        <AppServices />
        <AppTeams />
        <AppPricing />
        <AppContact />
      </main>
      <footer id="footer">
        <AppFooter />
      </footer>
    </div>
    </>
  );
}
export default LandingPage;