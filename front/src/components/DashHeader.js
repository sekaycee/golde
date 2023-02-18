import { Link } from 'react-router-dom'

const DashHeader = () => {
  const content = (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to="/dash/products">
          <h1 className="dash-header__title">products</h1>
        </Link>
        <nav>{/* add nav links later */}</nav>
      </div>
    </header>
  )
  return content
}

export default DashHeader
