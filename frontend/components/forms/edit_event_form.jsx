import React from 'react';
import { connect } from 'react-redux';
import { Router, withRouter, hashHistory, Link } from 'react-router';
import Errors from '../errors/errors';
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress } from 'react-places-autocomplete'
import { eventStyle } from './auto_complete';
import {updateEvent, clearEventErrors } from '../../actions/event_actions';

class EditEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.event.name,
      time: this.props.event.time.slice(0, 10),
      description: this.props.event.description,
      location: this.props.event.location
    };

    this.onChange = (location) => this.setState({ location })
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.props.clearEventErrors();
  }

  componentWillMount() {
    this.props.clearEventErrors();
  }

  update (field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    geocodeByAddress(this.state.location,  (err, latLng) => { if (err) { return} });

    this.props.updateEvent({
      name: this.state.name,
      time: this.state.time.slice(0, 10),
      description: this.state.description,
      location: this.state.location,
    }, this.props.eventId).then(() => {
      this.props.closeModal();
    });
  }

  render() {
    const inputProps = { value: this.state.location,
                         onChange: this.onChange,
                         placeholder: '277 Park Avenue New York, NY'}

    return (
      <div className='modal-form-container'>
        <div className='form-header'>
          <h1 className='event-form-header'>Update Event</h1>
        </div>
        <Errors errors={ this.props.errors } />

        <form className='create-event-form' onSubmit={this.handleSubmit}>
          <div className='event-form-inputs-box'>
            <label>Name</label>
            <input type='text'
                   value={ this.state.name }
                   onChange={ this.update('name') }
                   maxLength='20'
                   placeholder='React Party #271'/>

            <label>Description</label>
            <textarea rows='4'
                      value={ this.state.description }
                      onChange={ this.update('description') }
                      placeholder='Everybody Redux!'></textarea>

            <label>Date</label>
            <input type='date'
                   value={ this.state.time }
                   onChange={ this.update('date') } />

            <label>Location</label>
            <PlacesAutocomplete inputProps={ inputProps } styles={ eventStyle } />

            <div className='event-form-button-box'>
              <input type='submit' value="Update"/>
              <input className="event-cancel-button" onClick={this.props.closeModal} type="submit" value="Cancel" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.event,
  event: state.events[ownProps.eventId]
});

const mapDispatchToProps = (dispatch) => ({
  clearEventErrors: () => dispatch(clearEventErrors()),
  updateEvent: (event, id) => dispatch(updateEvent(event, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditEventForm));
