import React from 'react';
import axios from 'axios';
import './sass/Ironmine.sass';
import { getFromStorage } from './utils/storage';
import f12 from './img/piac1.png';

class Merch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

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

					level: res.data.village.buildings.wheatfield.level
				});

				if (this.state.level > 0) {
					this.setState({
						img: <img id="kep" alt="" src={f12} />
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
				<p id="title">Merch</p>
				<p id="building-info">
					The Merch
				</p>
				{this.state.img}
			</section>
		);
	}
}

export default Merch;
