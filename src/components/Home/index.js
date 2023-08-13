import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItem from '../CourseItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {coursesList: [], currentApiStatus: apiStatus.initial}

  componentDidMount() {
    this.getCoursesList()
  }

  onClickHomeRetryButton = () => {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({currentApiStatus: apiStatus.loading})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))
      this.setState({
        coursesList: updatedData,
        currentApiStatus: apiStatus.success,
      })
    } else {
      this.setState({currentApiStatus: apiStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={this.onClickHomeRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <>
        <h1 className="heading">Courses</h1>
        <ul className="unordered-list">
          {coursesList.map(eachItem => (
            <CourseItem details={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {currentApiStatus} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          {currentApiStatus === apiStatus.loading && this.renderLoadingView()}
          {currentApiStatus === apiStatus.success && this.renderSuccessView()}
          {currentApiStatus === apiStatus.failure && this.renderFailureView()}
        </div>
      </>
    )
  }
}

export default Home
