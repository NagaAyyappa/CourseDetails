import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {courseDetails: {}, currentApiStatus: apiStatus.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  onClickCourseItemRetryButton = () => {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({currentApiStatus: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = {
        id: data.course_details.id,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }
      this.setState({
        courseDetails: updateData,
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
        onClick={this.onClickCourseItemRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {description, imageUrl, name} = courseDetails
    return (
      <div className="course-details-container">
        <div className="card-container">
          <img src={imageUrl} alt={name} className="course-item-image" />
          <div>
            <h1 className="course-item-name">{name}</h1>
            <p className="course-item-description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {currentApiStatus} = this.state
    return (
      <>
        <Header />
        {currentApiStatus === apiStatus.loading && this.renderLoadingView()}
        {currentApiStatus === apiStatus.success && this.renderSuccessView()}
        {currentApiStatus === apiStatus.failure && this.renderFailureView()}
      </>
    )
  }
}

export default CourseItemDetails
