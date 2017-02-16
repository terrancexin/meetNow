import React from 'react';
import { Link, withRouter, hashHistory } from 'react-router';
import FormModal from './modal';

class AuthForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '' };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.demo = this.demo.bind(this);
	}

	componentDidUpdate() {
		this.redirectIfLoggedIn();
	}

	redirectIfLoggedIn() {
		if (this.props.loggedIn) {
			this.props.router.push("/");
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
		this.props.processForm({user});

	}
	componentWillReceiveProps(newProps){
			if (newProps.loggedIn) {
		      hashHistory.push("/");
		  }
  }

	navLink() {
		if (this.props.formType === "login") {
			return <Link to="/signup">sign up instead</Link>;
		} else {
			return <Link to="/login">log in instead</Link>;
		}
	}

	renderErrors() {
		return (
			<ul>
				{this.props.errors.map((error, i) => (
					<li key={`error-${i}`}>
						{error}
					</li>
				))}
			</ul>
		);
	}

	demo(e) {
		e.preventDefault();
		const guest = { user: { username: "Terrance", password: "123abc" } };
	}

	render() {
		return (
			<div>
				
			</div>
		);
	}

}

export default withRouter(AuthForm);
