import React from 'react';
import axios from 'axios';
import './sass/Ironmine.sass';
import { getFromStorage } from './utils/storage';
import f1 from './img/ironmine.png';
/*import f2 from './img/'
import f3 from './img/'
nem találtam a fás háznak még másik két képet :(

*/

class Temple extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			moral: 0,
			level: '',
			img: ''
		};
	}

	tick() {
		this.setState({ moral: this.state.moral - this.state.level * 0.01 });
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
					moral: res.data.village.buildings.temple.moral,
					level: res.data.village.buildings.temple.level
				});

				this.timerInterval = setInterval(this.tick.bind(this), 1000);

				if (this.state.level > 0) {
					this.setState({
						img: <img id="kep" alt="" src={f1} />
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
				<p id="title">Temple</p>
				<p id="building-info">
					The temple passively alters building and production time based on it's moral percentage!
				</p>

				<table id="income-info">
					<tbody>
						<tr>
							<td>Current moral:</td>
							<td>{parseInt(this.state.moral)} %</td>
						</tr>
						<tr>
							<td>Level:</td>
							<td>{parseInt(this.state.level)}</td>
						</tr>
					</tbody>
				</table>
				{this.state.img}
			</section>
		);
	}
}

export default Temple;
/***
 * 
 * TODO
 * bizonyos eséllyel óránként termel copper, silver, gold
 * ez minden órában egyszer történik meg, pl. minden 60. percben (timer)
 * ha nem talál, akkor növekedik az esély
 * ha talál, akkor az esély nullázódik
 * külön esély mindháromra
 * 40. szinten a copper
 * 45. szinten a silver
 * 50. szinten a gold esélyei láthatóvá válnak
 * 
 * 
 */
