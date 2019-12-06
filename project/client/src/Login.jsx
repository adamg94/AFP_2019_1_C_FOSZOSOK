import React from 'react';
import axios from 'axios';
import './sass/Login.sass';
import { setInStorage } from './utils/storage';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.loginOrRegister = this.loginOrRegister.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeInfo = this.onChangeInfo.bind(this);
		this.onChangeToken = this.onChangeToken.bind(this);

		this.state = {
			username: '',
			password: '',
			infoMessage: '',
			token: ''
		};
	}

	componentDidMount() {}
	onChangeInfo(msg) {
		this.setState({
			infoMessage: ''
		});
		this.setState({
			infoMessage: (
				<p id="info">
					Info: <span>{msg}</span>
				</p>
			)
		});
	}
	onChangeToken(e) {
		this.setState({
			token: e.target.value
		});
	}
	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}
	onChangePassword(e) {
		this.setState({
			password: e.target.value
		});
	}
	loginOrRegister(e) {
		e.preventDefault();
		if (this.state.username.length < 5) {
			this.onChangeInfo("Username length can't be lower than five!");
		} else if (this.state.password.length < 1) {
			this.onChangeInfo('Password empty!');
		} else {
			let User = {
				username: this.state.username,
				password: this.state.password
			};
			axios.post('http://localhost:5000/users/', User).then((response) => {
				if (response.data.success) {
					if (response.data.exitCode === 1) {
						User = {
							username: this.state.username,
							password: this.state.password
						};

						axios.post('http://localhost:5000/users/', User).then((res) => {
							if (res.data.exitCode === 0) {
								this.setState({
									infoMessage: res.data.message,
									username: res.data.username,
									token: res.data.token
								});

								setInStorage('afp_falu', { token: res.data.token, username: res.data.username });
								window.location = '/village';
							} else {
								this.setState({
									infoMessage: response.data.message
								});
							}
						});
					} else if (response.data.exitCode === 0) {
						this.setState({
							infoMessage: response.data.message,
							username: response.data.username,
							token: response.data.token
						});

						setInStorage('afp_falu', { token: response.data.token, username: response.data.username });
						window.location = '/village';
					}
				} else {
					this.setState({
						infoMessage: response.data.message
					});
				}
			});
		}
	}

	render() {
		return (
			<div>
				<aside>
					{this.state.infoMessage}
					<form onSubmit={this.loginOrRegister}>
						<input
							required
							value={this.state.username}
							onChange={this.onChangeUsername}
							type="text"
							name="username"
							placeholder="username"
						/>
						<input
							required
							value={this.state.password}
							onChange={this.onChangePassword}
							type="password"
							name="password"
							placeholder="password"
						/>
						<input type="submit" value="Play" />
					</form>
				</aside>
				<section id="background" />
			</div>
		);
	}
}

export default Login;
