// import React from 'react';
// import { Link } from 'react-router';
// import { connect } from 'react-redux';
// import { getAllGroups } from '../../actions/group_actions';
//
// class WelcomeGroups extends React.Component {
//   constructor(props){
//     super(props);
//   }
//
//   componentDidMount() {
//     this.props.getAllGroups();
//   }
//
//   render() {
//
//     return (
//       <div>
//         this.props.groups.map(group => (
//           <ul>
//             <li>{group.name}</li>
//           </ul>
//         ))
//       </div>
//     );
//   }
// }
//
// const mapStateToProps = (state) => ({
//   groups: state.groups
// });
//
// const mapDispatchToProps = (dispatch) => ({
//   getAllGroups: () => dispatch(getAllGroups())
// });
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(WelcomeGroups);
