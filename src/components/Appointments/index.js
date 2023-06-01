import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFavourite: false,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  addAppointments = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: v4(),
      name: titleInput,
      date: formattedDate,
      isFavourite: false,
    }
    this.setState(prevState =>
      this.setState({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        titleInput: '',
        dateInput: '',
      }),
    )
  }

  toggleStarImage = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isFavourite: !prevState.isFavourite}
        }
        return each
      }),
    }))
  }

  onClickFilter = () => {
    const {isFavourite} = this.state
    this.setState({
      isFavourite: !isFavourite,
    })
  }

  displayStarred = () => {
    const {isFavourite, appointmentsList} = this.state
    if (isFavourite) {
      return appointmentsList.filter(each => each.isFavourite === true)
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput} = this.state
    const filteredAppointments = this.displayStarred()

    return (
      <div className="bg">
        <div className="card">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-elements">
            <form className="f" onSubmit={this.addAppointments}>
              <label htmlFor="title" className="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date" className="title">
                DATE
              </label>
              <input
                type="date"
                id="date"
                value={dateInput}
                onChange={this.onChangeDate}
              />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="appointments-container">
            <div className="c">
              <h1 className="head">Appointments</h1>
              <button
                className="btn2"
                type="button"
                onClick={this.onClickFilter}
              >
                Starred
              </button>
            </div>
            <ul>
              {filteredAppointments.map(each => (
                <AppointmentItem
                  AppointmentDetails={each}
                  key={each.id}
                  toggleStarImage={this.toggleStarImage}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
