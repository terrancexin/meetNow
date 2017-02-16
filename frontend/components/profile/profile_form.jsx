import React from 'react';
import { Link, hashHistory } from 'react-router';
import { merge } from 'redux';

class ProfileForm extends React.Component {
  constructor(props){
    super(props);
    const { currentUser, users } = this.props;

    this.state =  {
      id: currentUser.id,
      email: currentUser.email,
			username: currentUser.username,
			city_id: currentUser.city_id,
			description: currentUser.description,
			quote: currentUser.quote
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillReceiveProps(newProps){
    if (newProps.loggedIn) {
      hashHistory.push("/");
    }
  }
  update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = this.state;
		this.props.updateUser(user);

	}

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Update Your Profile</h1>
          <label>Email:
            <input type="text" value={this.state.email} onChange={this.update("email")}/>
          </label>
          <label>Username:
            <input type="text" value={this.state.username} onChange={this.update("username")}/>
          </label>
          <label>City:
            <select onChange={this.update("city_id")}>
              <option disabled></option>
              <option value={1} >New York City</option>
              <option value={2} >San Francisco</option>
            </select>
          </label>
          <label>About yourself:
            <input type="textbox" value={this.state.description} onChange={this.update("description")}/>
          </label>
          <label>Your Favorite Quote:
            <input type="textbox" value={this.state.quote} onChange={this.update("quote")}/>
          </label>
          <input type="submit" value="update" />
        </form>
      </div>
    );
  }


}

export default ProfileForm;
