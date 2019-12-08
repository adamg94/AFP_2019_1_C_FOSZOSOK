import React from "react";
import axios from "axios";
import "./sass/Village.sass";
import { getFromStorage } from "./utils/storage";
import { Link } from "react-router-dom";
import f1 from "./img/fa.png";
import f2 from "./img/brickyard/agyag1.png";
import f3 from "./img/brickyard/agyag2.png";
import f4 from "./img/brickyard/agyag3.png";

class Village extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wood: 0,
      brick: 0,
      iron: 0,
      copper: 0,
      silver: 0,
      gold: 0,
      wood_level: 0,
      brick_level: 0,
      iron_level: 0,
      wood_img: "",
      brick_img: "",
      iron_img: ""
    };
  }
  tick() {
    this.setState({
      wood: this.state.wood + (this.state.wood_level * 80) / 3600
    });
    this.setState({
      brick: this.state.brick + (this.state.brick_level * 80) / 3600
    });
    this.setState({
      iron: this.state.iron + (this.state.iron_level * 80) / 3600
    });
  }
  componentDidMount() {
    /*
      session rendszer teszteléséhez volt itt, de lehet még szükséges.*/
    const obj = getFromStorage("afp_falu");
    if (obj && obj.username && obj.token) {
      const data = {
        token: obj.token,
        username: obj.username
      };
      axios.post("http://localhost:5000/village/", data).then(res => {
        this.setState({
          wood: parseInt(res.data.village.buildings.warehouse.wood),
          brick: parseInt(res.data.village.buildings.warehouse.brick),
          iron: parseInt(res.data.village.buildings.warehouse.iron),
          copper: parseInt(res.data.village.buildings.warehouse.copper),
          silver: parseInt(res.data.village.buildings.warehouse.silver),
          gold: parseInt(res.data.village.buildings.warehouse.gold),
          wood_level: res.data.village.buildings.lumberyard.level,
          brick_level: res.data.village.buildings.brickyard.level,
          iron_level: res.data.village.buildings.ironmine.level
        });
        this.timerInterval = setInterval(this.tick.bind(this), 1000);
        this.setState({
          wood_img: <img id="lumberyardimg" alt="" src={f1} />,
          wood_income: this.state.wood_level * 80,
          brick_income: this.state.brick_level * 80,
          iron_income: this.state.iron_level * 80
        });

        if (this.state.brick_level > 0) {
          this.setState({
            brick_img: <img alt="" id="brickyardimg" src={f2} />
          });

          if (this.state.brick_level > 5) {
            this.setState({
              brick_img: <img alt="" id="brickyardimg" src={f3} />
            });
          }
          if (this.state.brick_level > 15) {
            this.setState({
              brick_img: <img alt="" id="brickyardimg" src={f4} />
            });
          }
        }
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  render() {
    return (
      <section>
        <div id="grass">
          <Link to="/lumberyard">{this.state.wood_img}</Link>
          <Link to="/brickyard">{this.state.brick_img}</Link>
        </div>
        <aside>
          <table id="resource-info">
            <tbody>
              <tr>
                <td>Wood:</td>
                <td>{parseInt(this.state.wood)}</td>
              </tr>
              <tr>
                <td>Brick:</td>
                <td>{parseInt(this.state.brick)}</td>
              </tr>
              <tr>
                <td>Iron:</td>
                <td>{parseInt(this.state.iron)}</td>
              </tr>
              <tr>
                <td>Stone:</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Metal:</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Copper:</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Silver:</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Gold:</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
          <hr id="hr" />
          <table id="income-info">
            <tbody>
              <tr>
                <td>Wood:</td>
                <td>{this.state.wood_income} /hour</td>
              </tr>
              <tr>
                <td>Brick:</td>
                <td>{this.state.brick_income} /hour</td>
              </tr>
              <tr>
                <td>Iron:</td>
                <td>{this.state.iron_income} /hour</td>
              </tr>
            </tbody>
          </table>
        </aside>
      </section>
    );
  }
}

export default Village;
