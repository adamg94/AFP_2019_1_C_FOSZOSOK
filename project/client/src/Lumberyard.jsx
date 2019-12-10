import React from "react";
import axios from "axios";
import "./sass/Lumberyard.sass";
import { getFromStorage } from "./utils/storage";
import f1 from "./img/fa.png";
/*import f2 from './img/'
import f3 from './img/'
nem találtam a fás háznak még másik két képet :(

*/

class Lumberyard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wood: 0,
      level: "",
      img: "",
      nextincome: "",
      income: "",
      maxamount: 0
    };
  }

  tick() {
    if(this.state.wood < this.state.maxamount){
      this.setState({ wood: this.state.wood + (this.state.level * 80) / 3600 });
    }
    else{this.setState({wood:this.state.maxamount})}
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
          wood: res.data.village.buildings.warehouse.wood,
          level: res.data.village.buildings.lumberyard.level,
          maxamount: res.data.village.buildings.warehouse.level * 10000
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
        <p id="title">Lumberyard</p>
        <p id="building-info">
          The lumberyard passively producing wood for your village which is a
          basic and important resource.
        </p>

        <table id="income-info">
          <tbody>
            <tr>
              <td>Current wood:</td>
              <td>{parseInt(this.state.wood)}</td>
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

export default Lumberyard;
