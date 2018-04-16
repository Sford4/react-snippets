import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { nextStep, createAccount } from '../../../reducers/signupProgress';
import { nextStepContractor } from '../../../reducers/contractorProgress';
import { withRouter } from 'react-router-dom';

//Styles
import './createAccount.css';
import '../../signup/signupPage.css';

// COMPONENT IMPORTS
import ProgressBar from '../progressBar/progressBar';

class CreateAccount extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			nickName: '',
			email: '',
			password: '',
			confirmPassword: ''
		};

		this.submit = event => {
			event.preventDefault();
			if (
				!this.state.firstName ||
				!this.state.lastName ||
				!this.state.email ||
				!this.state.password ||
				!this.state.confirmPassword
			) {
				alert('All fields are required!');
			}
			if (this.state.password === this.state.confirmPassword) {
				this.props.createAccount({
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					email: this.state.email,
					password: this.state.password
				});
			} else {
				alert('Passwords must match!');
			}
		};
		this.step = 1;
		this.steps = ['Create Account', 'Confirmation Code', 'Basic Home Info'];
		this.handleFirstNameChange = event => {
			this.setState({
				firstName: event.target.value
			});
			this.firstNameStyles = {
				top: '-9px',
				bottom: '17px',
				left: '0px',
				fontSize: '11px'
			};
		};
		this.handleLastNameChange = event => {
			this.setState({
				lastName: event.target.value
			});
			this.lastNameStyles = {
				top: '-9px',
				bottom: '17px',
				left: '0px',
				fontSize: '11px'
			};
		};

		this.handleEmailChange = event => {
			this.setState({
				email: event.target.value
			});
			this.emailStyles = {
				top: '-9px',
				bottom: '17px',
				left: '0px',
				fontSize: '11px'
			};
		};
		this.handlePasswordChange = event => {
			this.setState({
				password: event.target.value
			});
			this.passwordStyles = {
				top: '-9px',
				bottom: '17px',
				left: '0px',
				fontSize: '11px'
			};
		};
		this.handleConfirmPasswordChange = event => {
			this.setState({
				confirmPassword: event.target.value
			});
			this.confirmPasswordStyles = {
				top: '-9px',
				bottom: '17px',
				left: '0px',
				fontSize: '11px'
			};
		};
	}
	componentWillUpdate(NextProps) {
		if (NextProps.newUser) {
			NextProps.contractor ? NextProps.nextStepContractor() : NextProps.nextStep();
			NextProps.changePage('/signup-code');
		}
	}
	render() {
		return (
			<div id="signup">
				<div className="title-container">
					<img className="icon" src={require('../../../assets/Home@2x.png')} alt="House" />
					<div className="title">Home Owner</div>
				</div>
				<ProgressBar step={this.step} steps={this.steps} />
				<div className="form-container">

					<div id="create-account">
						<div className="title">1. Create an Account</div>
						<form onSubmit={event => this.submit(event)}>
							<div className="input-container">
								<input
									type="text"
									value={this.state.firstName}
									onChange={event => this.handleFirstNameChange(event)}
								/>
								<span className="floating-label" style={this.firstNameStyles}>*First Name</span>
							</div>
							<div className="input-container">
								<input
									type="text"
									value={this.state.lastName}
									onChange={event => this.handleLastNameChange(event)}
								/>
								<span className="floating-label" style={this.lastNameStyles}>*Last Name</span>
							</div>

							<div className="input-container">
								<input
									type="email"
									value={this.state.email}
									onChange={event => this.handleEmailChange(event)}
									// required
								/>
								<span className="floating-label" style={this.emailStyles}>*Email</span>
							</div>
							<div className="input-container">
								<input
									type="password"
									value={this.state.password}
									onChange={event => this.handlePasswordChange(event)}
									// required
								/>
								<span className="floating-label" style={this.passwordStyles}>*Password</span>
							</div>
							<div className="input-container">
								<input
									type="password"
									value={this.state.confirmPassword}
									onChange={event => this.handleConfirmPasswordChange(event)}
									// required
								/>
								<span className="floating-label" style={this.confirmPasswordStyles}>
									*Retype Password
								</span>
							</div>

							<input type="submit" className="clickable btn" value="Create Account" />
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	newUser: state.signupProgress.newUser,
	step: state.signupProgress.step
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			nextStep,
			nextStepContractor,
			createAccount,

			changePage: route => push(route)
		},
		dispatch
	);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateAccount));
