import React from 'react';
import axios from 'axios';
import './sass/Ironmine.sass';
import { getFromStorage } from './utils/storage';
import f1 from './img/mill/mill.png';

class Mill extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			wheat: 0,
			level: '',
			img: '',
			nextincome: '',
			processed: ''
		};
	}

	tick() {
		this.setState({ wheat: this.state.wheat + ((3600 + this.state.level * 1400)/86400) });
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
					wheat: res.data.village.buildings.warehouse.wheat,
					level: res.data.village.buildings.mill.level
				});

				this.timerInterval = setInterval(this.tick.bind(this), 1000);

				if (this.state.level > 0) {
					this.setState({
						img: <img id="kep" alt="" src={f1} />,
						processed: 3600 + this.state.level * 1400,
						nextincome: this.state.level < 10 ? (this.state.level + 1) * 80 : this.state.level
					});
				}
			});
		}
	}
	componentWillUnmount() {
		clearInterval(this.timerInterval);
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
				<p id="title">Mill</p>
				<p id="building-info">The mill processes wheat produeced on the wheat fields!</p>

				<table id="income-info">
					<tbody>
						<tr>
							<td>Current wheat:</td>
							<td>{parseInt(this.state.wheat)}</td>
						</tr>
						<tr>
							<td>Current income:</td>
							<td>{this.state.processed} / day</td>
						</tr>
					</tbody>
				</table>
				{this.state.img}
			</section>
		);
	}
}

export default Mill;
