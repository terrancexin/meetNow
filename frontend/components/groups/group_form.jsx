import React from 'react';
import { Link, withRouter } from 'react-router';

import { connect } from 'react-redux';
import { createGroup } from '../../actions/group_actions';
import { clearGroupErrors } from '../../actions/group_actions';
import GroupErrors from '../errors/group_errors';

class GroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      description: "",
      category: "",
      founded: new Date()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateToSearch = this.navigateToSearch.bind(this);
    this.navigateToGroupShow = this.navigateToGroupShow.bind(this);
  }

  navigateToSearch() {
    this.props.router.push("/");
  }

  componentDidMount() {
    this.props.clearGroupErrors();
  }

  componentWillUnmount() {
    this.props.clearGroupErrors();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.formType !== newProps.formType) {
      this.props.clearGroupErrors();
    }
  }

  update(field) {
    return event => this.setState({ [field]: event.currentTarget.value });
  }

  navigateToGroupShow() {
    this.props.router.push(`groups/${this.state.group.id}`);
  }

  handleSubmit(e) {
    e.preventDefault();
    window.scrollTo(0, 0)
    this.props.createGroup(this.state).then(result => {
      this.props.router.push(`groups/${result.group.id}`);

    });
  }

  goToStepTwo(event) {
    event.preventDefault();
    document.getElementById('button-one').style = "display: none";
    document.getElementById('step-two').style = "display: flex";
  }

  goToStepThree(event) {
    event.preventDefault();
    document.getElementById('button-two').style = "display: none";
    document.getElementById('step-three').style = "display: flex";
  }

  goToStepFour(event) {
    event.preventDefault();
    document.getElementById('button-three').style = "display: none";
    document.getElementById('new-group-submit').style="display: block";
    document.getElementById('step-four').style = "display: flex";
  }

  render() {
    return (
      <div className="new-group-container animated bounceInUp">
        <div className="group-form-header">
            <h3 className='group-form-header-title'>Passionate about something?</h3>
            <h3 className='group-form-header-title'>Actually start it.</h3>
            <h4 className='group-form-header-p'>We'll help you find the right wolfpack and let's MeetNow!</h4>
        </div>
        <GroupErrors errors={ this.props.errors } />

        <div className="new-group-form">
          <form onSubmit={this.handleSubmit}>
            <div className="step" id="step-one">
              <label className="group-form-question">
                Where is the hometown of this new Group?
              </label>

              <input type="text"
                     placeholder="New York, NY"
                     value={this.state.location}
                     onChange={this.update("location")}/>

              <button id="button-one"
                      className="step-button"
                      onClick={this.goToStepTwo}>Next</button>
            </div>

            <div className="step animated bounceInUp" id="step-two" style={{display: 'none'}}>
              <label className="group-form-question">What are you passionate about?</label>

              <input type="text"
                     placeholder="The MERN Stack!"
                     value={this.state.category}
                     onChange={this.update("category")}/>
              <br/>

              <button id="button-two"
                      className="step-button"
                      onClick={this.goToStepThree}>Next</button>
            </div>

            <div className="step animated bounceInUp" id="step-three" style={{display: 'none'}}>
              <label className="group-form-question">Tell us the name of your new Group!</label>
              <input type="text"
                     placeholder="Rise&Code React&Grind"
                     value={this.state.name}
                     onChange={this.update("name")}/>
              <br/>

              <button className="step-button"
                      id="button-three"
                      onClick={this.goToStepFour}>Next</button>
            </div>

            <div className="step animated bounceInUp" id="step-four" style={{display: 'none'}}>
              <label className="group-form-question">Introduce your new Group to the world.</label >
              <input type="text"
                     placeholder="React Wolfpack"
                     value={this.state.description}
                     onChange={this.update("description")}/>
             <br/>
            </div>

            <div>
              <input className="red-button animated bounceInUp"
                     style={{display: 'none'}}
                     id='new-group-submit'
                     type="submit"
                     value="Let's MeetNow!" />
            </div>
            <button
              onClick={this.navigateToSearch}
              className='cancel-button'>Cancel</button>
            </form>

            <div>
            </div>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = (state) => ({
  errors: state.errors.group
});

const mapDispatchToProps = (dispatch) => ({
  createGroup: group => dispatch(createGroup(group)),
  clearGroupErrors: () => dispatch(clearGroupErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupForm);
