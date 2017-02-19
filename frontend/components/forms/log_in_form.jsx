import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { login, receiveErrors } from '../../actions/session_actions';
import AuthForm from './auth_form';

class LogInForm extends React.Component {

  componentDidMount () {
    this.props.clearErrors();
  }

  render () {
    const { logIn, errors } = this.props;

    return (
      <AuthForm
        submitForm={ logIn }
        formType='logIn'
        errors={ errors } />
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors.session
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  clearErrors: () => dispatch(receiveSessionErrors({}))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInForm);
