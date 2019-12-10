import React from 'react';
import axios from 'axios';
import './sass/Ironmine.sass';
import { getFromStorage } from './utils/storage';
import f1 from './img/warehouse/raktar1.png';

class Warehouse extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			maxMaterial: 0,
			msxStone: 0,
			maxGold: 0,
			level: '',
			img: ''
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
					level: res.data.village.buildings.warehouse.level
				});

				if (this.state.level > 0) {
					this.setState({
						img: <img id="kep" alt="" src={f1} />,
						maxMaterial: this.state.level * 10000,
						maxStone: this.state.level * 5986 + 700,
						maxGold: this.state.level * 1994 + 300
					});
				}
				if (this.state.level == 1) {
					this.setState({
						maxStone: 700,
						maxGold: 300
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
				<p id="title">Warehouse</p>
				<p id="building-info">The warehouse is where your villageers keep the processed materials!</p>

				<table id="income-info">
					<tbody>
						<tr>
							<td>Current level:</td>
							<td>{this.state.level}</td>
						</tr>
						<tr>
							<td>Current maximum amount:</td>
							<td>{parseInt(this.state.maxMaterial)} wood/brick/iron </td>
						</tr>
						<tr>
							<td>Current maximum amount:</td>
							<td>{parseInt(this.state.maxStone)} stone/metal </td>
						</tr>
						<tr>
							<td>Current maximum amount:</td>
							<td>{parseInt(this.state.maxGold)} copper/silver/gold </td>
						</tr>
						{this.state.level < 50 && (
							<tr>
								<td>NeXt level maximum amount:</td>
								<td>{parseInt(this.state.maxMaterial) + 1000} / wood/brick/iron </td>
							</tr>
						)}
						{this.state.level < 50 && (
						<tr>
							<td>NeXt level maximum amount:</td>
							<td>{parseInt(this.state.level) * 5986 + 700} /stone/metal </td>
						</tr>)}
						{this.state.level < 50 && (
						<tr>
							<td>NeXt level maximum amount:</td>
							<td>{parseInt(this.state.level) * 1994 + 300} /copper/silver/gold </td>
						</tr>)}
					</tbody>
				</table>
				{this.state.img}
			</section>
		);
	}
}

export default Warehouse;
