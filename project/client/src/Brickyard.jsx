import React from "react";
import axios from "axios";
import "./sass/Brickyard.sass";
import { getFromStorage } from "./utils/storage";
import f1 from "./img/brickyard/agyag1.png";
import f2 from "./img/brickyard/agyag2.png";
import f3 from "./img/brickyard/agyag3.png";

class Brickyard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brick: 0,
      level: "",
      img: "",
      nextincome: "",
      income: ""
    };
  }

  tick() {
    this.setState({ brick: this.state.brick + (this.state.level * 80) / 3600 });
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
          brick: res.data.village.buildings.warehouse.brick,
          level: res.data.village.buildings.brickyard.level
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
        }
        if (this.state.level > 5) {
          this.setState({
            img: <img alt="" id="kep" src={f2} />
          });
        }
        if (this.state.level > 15) {
          this.setState({
            img: <img alt="" id="kep" src={f3} />
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
        <p id="title">brickyard</p>
        <p id="building-info">
          The brickyard passively producing brick for your village which is a
          basic and important resource.
        </p>

        <table id="income-info">
          <tbody>
            <tr>
              <td>Current brick:</td>
              <td>{parseInt(this.state.brick)}</td>
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

export default Brickyard;
