// import React from 'react';
// import { Link, hashHistory } from 'react-router';
// import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';
// import Modal from 'react-modal';
// import AuthForm from '../authform/auth_form';
//
// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };
//
// class WelcomeHeader extends React.Component {
//   constructor(props){
//     super(props);
//     this.handleSignOut = this.handleSignOut.bind(this);
//     this.state = { modalIsOpen: false };
//     this.closeModal = this.closeModal.bind(this);
//     this.openModal = this.openModal.bind(this);
//   }
//
//   closeModal () {
//     this.setState( { modalIsOpen: false });
//   }
//
//   openModal () {
//     this.setState( { modalIsOpen: true });
//   }
//
//   handleSignOut(e){
//     e.preventDefault();
//     this.props.logout();
//     hashHistory.push('/');
//   }
//
//
//   render(){
//
//     // const text = this.props.loggedIn ? "Log out" : "Log in";
//     // let buttons;
//     // if (this.props.loggedIn){
//     //   buttons = (<Link onClick={this.handleSignOut}>Sign Out</Link>);
//     // } else {
//     //   buttons = (<Link to="/login">Log in</Link>);
//     // }
//
//     return(
//       <div>
//         <label onClick={this.modalOpen} className='create-button'>Create a MeetNow!</label>
//           <Modal
//              isOpen={this.state.modalIsOpen}
//              onAfterOpen={this.afterOpenModal}
//              onRequestClose={this.closeModal}
//              style={customStyles}
//              contentLabel="Example Modal"
//            >
//            <AuthForm />
//            is it working?
//          </Modal>
//       </div>
//     );
//   }
// }
//
//
// const mapStateToProps = (state) => {
//   return ({
//   loggedIn: Boolean(state.session.currentUser),
//   errors: state.session.errors,
//   currentUser: state.session.currentUser
//   });
// };
//
// const mapDispatchToProps = (dispatch) => ({
//   logout: () => dispatch(logout())
// });
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(WelcomeHeader);
