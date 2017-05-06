import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, hashHistory } from 'react-router';
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress } from 'react-places-autocomplete'

import { updateGroup, deleteGroup, fetchSingleGroup } from '../../actions/group_actions';
import { clearGroupErrors } from '../../actions/group_actions';
import GroupErrors from '../errors/group_errors';
import { groupStyle } from '../forms/auto_complete';

class EditGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.group.name,
      location: this.props.group.location,
      description: this.props.group.description,
      category: this.props.group.category,
      founded: this.props.group.founded,
      areYouSure: false
    };

    this.onChange = (location) => this.setState({ location })

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.toggleAreYouSure = this.toggleAreYouSure.bind(this);
    this.handleAreYouSure = this.handleAreYouSure.bind(this);
  }

  deleteGroup(id) {
    return () => {
      this.props.router.push("/");
      this.handleAreYouSure();
      this.props.deleteGroup(id);
    }
  }

  componentDidMount() {
    this.props.clearGroupErrors();
    this.props.fetchSingleGroup(this.props.params.groupId);
  }

  componentWillUnmount() {
    this.props.clearGroupErrors();
  }

  update(field) {
    return event => this.setState({ [field]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    geocodeByAddress(this.state.location,  (err, latLng) => { if (err) { return } });

    this.props.updateGroup({
      name: this.state.name,
      location: this.state.location,
      description: this.state.description,
      category: this.state.category,
      founded: this.state.founded
    }, this.props.group.id);

    hashHistory.push(`/groups/${this.props.group.id}`);
  }

  toggleAreYouSure () {
    if (this.state.areYouSure) {
      return  { display: 'flex' };
    } else {
      return { display: 'none' };
    }
  }

  handleAreYouSure () {
    this.setState({ areYouSure: !this.state.areYouSure });
    this.toggleAreYouSure();
  }

  render() {
    const inputProps = { value: this.state.location,
                         onChange: this.onChange,
                         placeholder: 'New York, NY'}

    return (
      <div className="group-form-edit-container">
        <div className="group-form-edit-header">
            <h3 className='group-form-edit-header-title'>Edit Group</h3>
            <h4 className='group-form-edit-header-p'>What new ideas would you like to add?</h4>
        </div>
        <GroupErrors errors={ this.props.errors } />

        <div className="new-group-form-edit">
          <form onSubmit={this.handleSubmit}>
            <div className="step-edit" id="step-edit-one">
              <label className="group-form-edit-question">
                Where is the hometown of this new Group?
              </label>

              <PlacesAutocomplete inputProps={inputProps}
                                  styles={groupStyle} />

            </div>

            <div className="step-edit" id="step-edit-two">
              <label className="group-form-edit-question">What are you passionate about?</label>

              <input type="text"
                     placeholder="The MERN Stack! (max length 20 chars)"
                     value={this.state.category}
                     maxLength="20"
                     onChange={this.update("category")}/>

            </div>

            <div className="step-edit" id="step-edit-three">
              <label className="group-form-edit-question">Tell us the name of your new Group!</label>
              <input type="text"
                     maxLength="30"
                     placeholder="Rise&Code React&Grind"
                     value={this.state.name}
                     onChange={this.update("name")}/>

            </div>

            <div className="step-edit" id="step-edit-four">
              <label className="group-form-edit-question">Introduce your new Group to the world.</label >
              <textarea rows='6'
                     placeholder="Empty your mind, be formless. Shapeless, like water. If you put water into a cup, it becomes the cup. You put water into a bottle and it becomes the bottle. You put it in a teapot, it becomes the teapot. Now, water can flow or it can crash. Be water, my friend.."
                     value={this.state.description}
                     onChange={this.update("description")}></textarea>
            </div>

          </form>
          <div className='group-form-edit-buttons'>
            <button className='edit-update-button' onClick={this.handleSubmit}>Update</button>
            <button className='edit-delete-button' onClick={this.handleAreYouSure}>Delete this Group</button>
            <div  style={this.toggleAreYouSure()} className='sure-edit-form-box animated fadeInDown'>
              <div className='sure-edit-arrow-up-pos'>
                <div className='are-you-sure-edit-text'>Are you sure?</div>
                <div className='sure-edit-arrow-up'></div>

                <div className='sure-edit-buttons-box'>
                  <button className='sure-edit-buttons' onClick={this.deleteGroup(this.props.group.id)}>Yes</button>
                  <button className='sure-edit-buttons' onClick={this.handleAreYouSure}>No</button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.group,
  group: state.groups[ownProps.params.groupId]
});

const mapDispatchToProps = (dispatch) => ({
  createGroup: group => dispatch(createGroup(group)),
  clearGroupErrors: () => dispatch(clearGroupErrors()),
  updateGroup: (group, id) => dispatch(updateGroup(group, id)),
  fetchSingleGroup: id => dispatch(fetchSingleGroup(id)),
  deleteGroup: (id) => dispatch(deleteGroup(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGroupForm);
