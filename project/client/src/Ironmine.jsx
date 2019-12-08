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
      income: "",
      copperchance: 0,
      silverchance: 0,
      goldchance: 0,
      copperlabel: '',
      silverlabel: '',
      goldlabel: ''
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
          level: res.data.village.buildings.ironmine.level,
          copperchance : res.data.village.buildings.warehouse.copper_chance,
          silverchance : res.data.village.buildings.warehouse.silver_chance,
          goldchance : res.data.village.buildings.warehouse.gold_chance
        });

        this.timerInterval = setInterval(this.tick.bind(this), 1000);

        if (this.state.level > 0) {
          this.setState({
            img: <img id="kep" alt="" src={f1} />,
            income: this.state.level * 80,
            nextincome:
              this.state.level < 50
                ? (this.state.level + 1) * 80
                : '',
              });

              this.setState({
            nextincomelabel: 
             this.state.level < 50
             ? 
            <tr>
            <td>Next level income:</td>
            <td>{this.state.nextincome} /hour</td>
          </tr>
          : '' });
          
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

         if(this.state.level >= 40)
          {
            this.setState({
              copperlabel:  <tr><td>Chance to get copper in next hour:</td> <td>{this.state.copperchance} %</td> </tr>      
            })
          }
           if(this.state.level >= 45)
          {
            this.setState({
              copperlabel: <tr><td>Chance to get copper in next hour:</td> <td>{this.state.copperchance} %</td> </tr> ,
              silverlabel: <tr><td>Chance to get silver in next hour:</td> <td>{this.state.silverchance} %</td> </tr>         
            })
          }
          if(this.state.level === 50)
          {
            this.setState({
              copperlabel: <tr><td>Chance to get copper in next hour:</td> <td>{this.state.copperchance} %</td> </tr> ,
              silverlabel: <tr><td>Chance to get silver in next hour:</td> <td>{this.state.silverchance} %</td> </tr>  ,       
              goldlabel: <tr><td>Chance to get gold in next hour:</td> <td>{this.state.goldchance} %</td> </tr>         
            })
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
        
            {this.state.nextincomelabel}
            {this.state.copperlabel}
            {this.state.silverlabel}
            {this.state.goldlabel}
          </tbody>
        </table>
        {this.state.img}
      </section>
    );
  }
}

export default Ironmine;
