import React from 'react';
import axios from 'axios';
import './sass/Ironmine.sass';
import { getFromStorage } from './utils/storage';
import f1 from './img/warehouse/raktar3.png';

class Hideout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            maxMaterial: 0,
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
					level: res.data.village.buildings.hideout.level
				});

				if (this.state.level > 0) {
					this.setState({
                        img: <img id="kep" alt="" src={f1} />,
                        maxMaterial: (this.state.level) * 300
						
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
				<p id="title">Hideout</p>
				<p id="building-info">The Hide-out is where your villagers also keeps the processed materials.</p>

				<table id="income-info">
					<tbody>
						<tr>
							<td>Current level:</td>
                            <td>{this.state.level}</td>
							
						</tr>
                        <tr>
                        <td>Current maximum amount:</td>
							<td>{parseInt(this.state.maxMaterial)} / material </td>
						</tr>
                        {this.state.level < 50 &&
						
                        <tr>
                            <td>Next level maximum amount:</td>
                            <td>{parseInt(this.state.maxMaterial) + 300} / material </td>
                        </tr>
                    }
						
					</tbody>
				</table>
				{this.state.img}
			</section>
		);
	}
}

export default Hideout;
