import React from "react";
import axios from "axios";
import "./sass/Village.sass";
import { getFromStorage } from "./utils/storage";
import { Link } from "react-router-dom";
import f1 from "./img/fa.png";
import f2 from "./img/brickyard/agyag1.png";
import f3 from "./img/brickyard/agyag2.png";
import f4 from "./img/brickyard/agyag3.png";
import f5 from "./img/ironmine.png";
import f6 from "./img/temple/temple.png";
import f7 from "./img/mill/mill.png";
import f8 from "./img/warehouse/raktar1.png";
import f9 from "./img/wheatfield/wheatfield.png";
import f10 from "./img/wall/wall.png"

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
      stone: 0,
      metal: 0,
      wood_level: 0,
      brick_level: 0,
      iron_level: 0,
      wood_img: "",
      brick_img: "",
      iron_img: "",
      temple_img: "",
      mill_img: "",
      warehouse_img: "",
      wheatfield_img: "",
      warehouseLevel: 0,
      maxmaterial: 0,
      maxStone: 0,
      maxGold:0
    };
  }
  tick() {
    console.log(this.state.maxGold)
    if(this.state.wood < this.state.maxmaterial){
      this.setState({
        wood: this.state.wood + (this.state.wood_level * 80) / 3600
      })}
      else{
        this.setState({
          wood: this.state.maxmaterial
        })
      }
      if(this.state.brick < this.state.maxmaterial){
        this.setState({
          brick: this.state.brick + (this.state.brick_level * 80) / 3600
        })
      }
      else{
        this.setState({
          brick: this.state.maxmaterial
        })
      }
      if(this.state.iron < this.state.maxmaterial){
        this.setState({
          iron: this.state.iron + (this.state.iron_level * 80) / 3600
        })
      }
      else{    
         this.setState({         
          iron: this.state.maxmaterial
        })
      }
      if(this.state.gold >= this.state.maxGold){this.setState({gold:this.state.maxGold})}
      if(this.state.silver >= this.state.maxGold){this.setState({silver:this.state.maxGold})}
      if(this.state.copper >= this.state.maxGold){this.setState({copper:this.state.maxGold})}

      if(this.state.stone >= this.state.maxStone){this.setState({stone:this.state.maxStone})}
      if(this.state.metal >= this.state.maxStone){this.setState({metal:this.state.maxStone})}
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
        console.log(res.data.village);
        if(res.data.village.buildings.warehouse.level == 1){
          this.setState({
            maxStone: 700,
            maxGold: 700
          })
        }
        else{
          this.setState({
            maxStone: parseInt(res.data.village.buildings.warehouse.level * 5986 + 700),
            maxGold : parseInt(res.data.village.buildings.warehouse.level * 1994 + 300)
          })
        }
        this.setState({
          wood: parseInt(res.data.village.buildings.warehouse.wood),
          brick: parseInt(res.data.village.buildings.warehouse.brick),
          iron: parseInt(res.data.village.buildings.warehouse.iron),
          copper: parseInt(res.data.village.buildings.warehouse.copper),
          silver: parseInt(res.data.village.buildings.warehouse.silver),
          gold: parseInt(res.data.village.buildings.warehouse.gold),
          stone: parseInt(res.data.village.buildings.warehouse.stone),
          metal: parseInt(res.data.village.buildings.warehouse.metal),
          wood_level: res.data.village.buildings.lumberyard.level,
          brick_level: res.data.village.buildings.brickyard.level,
          iron_level: res.data.village.buildings.ironmine.level,
          warehouseLevel: res.data.village.buildings.warehouse.level,
          maxmaterial: parseInt(res.data.village.buildings.warehouse.level * 10000),
        });
        if(res.data.village.buildings.warehouse.level == 1){
          this.setState({
            maxStone: 700,
            maxGold : 300
          })
        }
        this.timerInterval = setInterval(this.tick.bind(this), 1000);
        this.setState({
          wood_img: <img id="lumberyardimg" alt="" src={f1} />,
          iron_img: <img id="ironmineimg" alt="" src={f5} />,
          temple_img: <img id="templeimg" alt="" src={f6} />,
          warehouse_img: <img id="warehouseimg" alt="" src={f8} />,
          mill_img: <img id="millimg" alt="" src={f7} />,
          wheatfield_img: <img id="wheatfieldimg" alt="" src={f9} />,
          wall_img: <img id="wallimg" alt="" src={f10} />,
          wood_income: this.state.wood_level * 80,
          brick_income: this.state.brick_level * 80,
          iron_income: this.state.iron_level * 80,
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
          <Link to="/ironmine">{this.state.iron_img}</Link>
          <Link to="/temple">{this.state.temple_img}</Link>
          <Link to="/mill">{this.state.mill_img}</Link>
          <Link to="/warehouse">{this.state.warehouse_img}</Link>
          <Link to="/wheatfield">{this.state.wheatfield_img}</Link>
          <Link to="/wall">{this.state.wall_img}</Link>
        </div>
        <aside>
          <table id="resource-info">
            <tbody>
            <tr>
                <td>Ware house level:</td>
                <td>{parseInt(this.state.warehouseLevel)}</td>
              </tr>
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
                <td>{parseInt(this.state.stone)}</td>
              </tr>
              <tr>
                <td>Metal:</td>
                <td>{parseInt(this.state.metal)}</td>
              </tr>
              <tr>
                <td>Copper:</td>
                <td>{parseInt(this.state.copper)}</td>
              </tr>
              <tr>
                <td>Silver:</td>
                <td>{parseInt(this.state.silver)}</td>
              </tr>
              <tr>
                <td>Gold:</td>
                <td>{parseInt(this.state.gold)}</td>
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
