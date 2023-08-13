import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="failure-view-image"
      />
      <h1 className="failure-heading">Page Not Found</h1>
      <p className="failure-para">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </>
)

export default NotFound
