import React from 'react';
import { createEvent } from '../../actions/event_actions';
import { connect } from 'react-redux';
import { Router, withRouter } from 'react-router';
import { clearEventErrors } from '../../actions/event_actions';
import Errors from '../errors/errors';
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress } from 'react-places-autocomplete'
import { eventStyle } from './auto_complete';

class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {name: '', time: '', description: '', location: '', group_id: this.props.params.groupId};
    this.handleLocation = this.handleLocation.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleTime = this.handleTime.bind(this);

    this.onChange = (location) => this.setState({ location })
  }

  componentWillMount() {
    this.props.clearEventErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    geocodeByAddress(this.state.location,  (err, latLng) => {
      if (err) { return}
    });

    this.props.createEvent(this.state).then(() => {
      this.props.closeModal();
    });
  }

  handleLocation(e) {
    this.setState({location: e.target.value});
  }

  handleName(e) {
    this.setState({name: e.target.value});
  }

  handleDescription(e) {
    this.setState({description: e.target.value});
  }

  handleTime(e) {
    this.setState({time: e.target.value });
  }

  render() {
    const inputProps = { value: this.state.location,
                         onChange: this.onChange,
                         placeholder: '277 Park Avenue New York, NY'}

    return (
      <div className='modal-form-container'>
        <div className='form-header'>
          <h1 className='event-form-header'>Create an Event</h1>
        </div>
        <Errors errors={ this.props.errors } />

        <form className='create-event-form' onSubmit={this.handleSubmit}>
          <div className='event-form-inputs-box'>
            <label>Name</label>
            <input type='text' value={this.state.name} onChange={this.handleName} placeholder='React Party #271'/>

            <label>Description</label>
            <input type='text' value={this.state.description} onChange={this.handleDescription} placeholder='Everybody Redux!'/>

            <label>Date</label>
            <input type='date' value={this.state.time} onChange={this.handleTime} />


            <label>Location</label>
            <PlacesAutocomplete inputProps={inputProps} styles={eventStyle}/>

            <input type='submit' value="Create"/>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return({
    errors: state.errors.event
  });
};

const mapDispatchToProps = (dispatch) => ({
  createEvent: myEvent => dispatch(createEvent(myEvent)),
  clearEventErrors: () => dispatch(clearEventErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateEventForm));
