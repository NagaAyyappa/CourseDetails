import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {details} = props
  const {logoUrl, name, id} = details
  return (
    <Link to={`/courses/${id}`} className="course-link-item">
      <li className="list-item">
        <img src={logoUrl} alt={name} className="course-image" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
