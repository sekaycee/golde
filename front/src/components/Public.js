import { Link } from 'react-router-dom'

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>Welcome to <span className="nowrap">MHM Golde Pharma</span></h1>
      </header>
      <main className="public__main">
        <p>Located at the Eastern heartland. MHM Golde Pharma has invested a lot of effort.. to provide goods and services that are sure to meet your health needs</p>
        <address className="public__addr">
          MHM Golde Pharma<br />
	  Nō 1b Secretariat Road<br />
	  Umuoma, Mgbidi, Imo St.<br />
	  <a href="tel:+2349036918904">+234 903 691 8904</a>
        </address>
        <br />
        <p>Pharm Marvellous</p>
      </main>
      <footer>
        <Link to="/login">Staff Login</Link>
      </footer>
    </section>
  )
  return content
}

export default Public
