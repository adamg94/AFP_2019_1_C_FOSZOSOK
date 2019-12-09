import React from 'react';
import axios from 'axios';
import './sass/Ironmine.sass';
import { getFromStorage } from './utils/storage';
import f1 from './img/piacmuhely.png';

class MerchWorkshop extends React.Component {
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
					level: res.data.village.buildings.merchworkshop.level
				});

				if (this.state.level > 0) {
					this.setState({
						img: <img id="kep" alt="" src={f1} />,
						
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
				<p id="title">MerchWorkshop</p>
				<p id="building-info">This building has a passiv effect on the Merch.</p>

				<table id="income-info">
					<tbody>
						<tr>
							<td>Current level:</td>
                            <td><progress value = {(this.state.level)} max="10" /></td>
							<td>{this.state.level}</td>
						</tr>
                        <tr>
							<td>Current increase:</td>
							<td>{parseInt(this.state.level)*10} %</td>
						</tr>
						
					</tbody>
				</table>
				{this.state.img}
			</section>
		);
	}
}

export default MerchWorkshop;
