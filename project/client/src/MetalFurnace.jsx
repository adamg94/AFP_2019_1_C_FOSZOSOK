import React from 'react';
import axios from 'axios';
import './sass/Ironmine.sass';
import { getFromStorage } from './utils/storage';
import f1 from './img/metalfurnace.png';

class MetalFurnace extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			iron: 0,
			brick:0,
			stone:0,
			metal:0,
			level:0,
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
					iron: res.data.village.buildings.warehouse.iron,
					brick: res.data.village.buildings.warehouse.brick,
					stone: res.data.village.buildings.warehouse.stone,
					metal: res.data.village.buildings.warehouse.metal,
					level: res.data.village.buildings.wheatfield.level
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
				<p id="title">MetalFurnace</p>
				<p id="building-info">
					The Metal Furnace will make you stone and metal from brick and iron. One metal costs four iron and one stone costs four brick
				</p>
				<form>
				<table id="income-info">
					<tbody>
						<tr>
							<td>Current brick:</td>
							<td>{parseInt(this.state.brick)}</td>
							<td> <input type="number" min="0" max={this.state.brick}></input></td>
						</tr>
						<tr>
							<td>Current iron:</td>
							<td>{parseInt(this.state.iron)}</td>
							<td> <input type="number" min="0" max={this.state.iron}></input></td>
						</tr>
						<tr>
							<td>Current stone:</td>
							<td>{parseInt(this.state.stone)} </td>
						</tr>
						<tr>
							<td>Current metal:</td>
							<td>{parseInt(this.state.metal)} </td>
						</tr>
					</tbody>
				</table>
				<input
                      id={1}
                      className="improvebutton"
                      type="submit"
                      value="Heat up the furnace"
                    />
				</form>
				{this.state.img}
			</section>
		);
	}
}

export default MetalFurnace;
