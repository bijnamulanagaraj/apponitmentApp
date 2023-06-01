// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {AppointmentDetails, toggleStarImage} = props
  const {name, date, isFavourite, id} = AppointmentDetails

  const imgUrl = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const ClickButton = () => {
    toggleStarImage(id)
  }

  return (
    <li className="list-items">
      <div className="item-card">
        <p className="appointment">{name}</p>
        <button
          className="btn"
          type="button"
          data-testid="star"
          onClick={ClickButton}
        >
          <img src={imgUrl} alt="star" className="star" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
