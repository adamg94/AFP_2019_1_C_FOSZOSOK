import React from "react";
import axios from "axios";
import "./sass/Ironmine.sass";
import { getFromStorage } from "./utils/storage";
import f1 from "./img/ironmine.png";
/*import f2 from './img/'
import f3 from './img/'
nem találtam a fás háznak még másik két képet :(

*/

class Ironmine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      iron: 0,
      level: "",
      img: "",
      nextincome: "",
      income: ""
    };
  }

  tick() {
    this.setState({ iron: this.state.iron + (this.state.level * 80) / 3600 });
  }

  componentDidMount() {
    const obj = getFromStorage("afp_falu");
    if (obj && obj.username && obj.token) {
      const data = {
        token: obj.token,
        username: obj.username
      };
      axios.post("http://localhost:5000/village/getinfo", data).then(res => {
        this.setState({
          iron: res.data.village.buildings.warehouse.iron,
          level: res.data.village.buildings.ironmine.level
        });

        this.timerInterval = setInterval(this.tick.bind(this), 1000);

        if (this.state.level > 0) {
          this.setState({
            img: <img id="kep" alt="" src={f1} />,
            income: this.state.level * 80,
            nextincome:
              this.state.level < 50
                ? (this.state.level + 1) * 80
                : this.state.level
          });
        } /*
          if(this.state.level > 5)
          {
            this.setState({
              img : <img alt="" src={f2} />
            })
          }
          if(this.state.level > 15)
          {
            this.setState({
              img : <img alt="" src={f3} />
            })
          }*/
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }
  onChangeInfo(msg) {
    this.setState({
      infoMessage: ""
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
        <p id="title">Ironmine</p>
        <p id="building-info">
          The ironmine passively producing iron for your village which is a
          basic and important resource.
        </p>

        <table id="income-info">
          <tbody>
            <tr>
              <td>Current iron:</td>
              <td>{parseInt(this.state.iron)}</td>
            </tr>
            <tr>
              <td>Current income:</td>
              <td>{this.state.income} /hour</td>
            </tr>
            <tr>
              <td>Next level income:</td>
              <td>{this.state.nextincome} /hour</td>
            </tr>
          </tbody>
        </table>
        {this.state.img}
      </section>
    );
  }
}

export default Ironmine;
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