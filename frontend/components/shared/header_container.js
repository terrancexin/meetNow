import { connect } from 'react-redux';
import Header from './header';
import { logout, login, signup } from '../../actions/session_actions';

const mapStateToProps = ({session}) => ({
  currentUser:  session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  login: user => dispatch(login(user)),
  signup: user => dispatch(signup(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
