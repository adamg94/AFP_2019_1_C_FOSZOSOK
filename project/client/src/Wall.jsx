import React from 'react';
import axios from 'axios';
import './sass/Ironmine.sass';
import f10 from './img/wall.png';

class Wall extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            level: '',
			img: '',
            
		};
	}

	componentDidMount() {
		const obj = getFromStorage('afp_falu');
		if (obj && obj.username && obj.token) {
			const data = {
				token: obj.token,
				username: obj.username
			};
			axios.post('http://localhost:5000/village/getinfo', data).then((res) => {
				this.setState({
					level: res.data.village.buildings.wall.level
				});
				if (this.state.level > 0) {
					this.setState({
						img: <img id="kep" alt="" src={f10} />,
						
					});
				}
			});
		}
	}

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

	render() {
		return (
			<section>
				<p id="title">Wall</p>
				<p id="building-info">The Wall will defend you against your foes.</p>
				{this.state.img}
			</section>
		);
	}
}

export default Wall;
