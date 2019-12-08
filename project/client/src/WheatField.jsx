import React from 'react';
import axios from 'axios';
import './sass/Ironmine.sass';
import { getFromStorage } from './utils/storage';
import f1 from './img/ironmine.png';

class WheatField extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			wheat: 0,
			level: '',
			img: '',
			nextincome: '',
			income: ''
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
					wheat: res.data.village.buildings.warehouse.wheat,
					level: res.data.village.buildings.wheatfield.level,
					income: 10000 + res.data.village.buildings.wheatfield.level * 200
				});

				if (this.state.level > 0) {
					this.setState({
						img: <img id="kep" alt="" src={f1} />
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
				<p id="title">WheatField</p>
				<p id="building-info">
					The Wheat field passively produces wheat every 24 hours which can be processed by the mill!
				</p>

				<table id="income-info">
					<tbody>
						<tr>
							<td>Current wheat:</td>
							<td>{parseInt(this.state.wheat)} </td>
						</tr>
						<tr>
							<td>Level:</td>
							<td>{parseInt(this.state.level)}</td>
						</tr>
						<tr>
							<td>income:</td>
							<td>{parseInt(this.state.income)} / day</td>
						</tr>
					</tbody>
				</table>
				{this.state.img}
			</section>
		);
	}
}

export default WheatField;
