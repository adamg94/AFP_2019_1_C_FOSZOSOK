import React from "react";
import axios from "axios";
import "./sass/Palace.sass";
import { getFromStorage } from "./utils/storage";
import f1 from "./img/palace/palota1.png";
import f2 from "./img/palace/palota2.png";
import f3 from "./img/palace/palota3.png";

class Palace extends React.Component {
  constructor(props) {
    super(props);

    this.onBaseSubmit = this.onBaseSubmit.bind(this);
    this.onRareSubmit = this.onRareSubmit.bind(this);
    this.state = {
      wood: 0,
      brick: 0,
      iron: 0,
      wheat: 0,
      stone: 0,
      metal: 0,
      level: "",
      img: "",

      palace_level_constructon_time: "",
      palace_level: 0,
      palace_normal_price: 0,
      palace_max_level: 0,

      merch_level_constructon_time: "",
      merch_level: 0,
      merch_normal_price: 0,
      merch_max_level: 0,

      merchworkshop_level_constructon_time: "",
      merchworkshop_level: 0,
      merchworkshop_normal_price: 0,
      merchworkshop_max_level: 0,

      temple_level_constructon_time: "",
      temple_level: 0,
      temple_normal_price: 0,
      temple_max_level: 0,

      wall_level_constructon_time: "",
      wall_level: 0,
      wall_normal_price: 0,
      wall_max_level: 0,

      warehouse_level_constructon_time: "",
      warehouse_level: 0,
      warehouse_normal_price: 0,
      warehouse_max_level: 0,

      hideout_level_constructon_time: "",
      hideout_level: 0,
      hideout_normal_price: 0,
      hideout_max_level: 0,

      statue_level_constructon_time: "",
      statue_level: 0,
      statue_normal_price: 0,
      statue_max_level: 0,
      statue_state: false,

      metalfurnace_level_constructon_time: "",
      metalfurnace_level: 0,
      metalfurnace_normal_price: 0,
      metalfurnace_max_level: 0,

      mill_level_constructon_time: "",
      mill_level: 0,
      mill_normal_price: 0,
      mill_max_level: 0,

      wheatfield_level_constructon_time: "",
      wheatfield_level: 0,
      wheatfield_normal_price: 0,
      wheatfield_max_level: 0,

      ironmine_level_constructon_time: "",
      ironmine_level: 0,
      ironmine_normal_price: 0,
      ironmine_max_level: 0,

      lumberyard_level_constructon_time: "",
      lumberyard_level: 0,
      lumberyard_normal_price: 0,
      lumberyard_max_level: 0,

      brickyard_level_constructon_time: "",
      brickyard_level: 0,
      brickyard_normal_price: 0,
      brickyard_max_level: 0
    };
  }

  onBaseSubmit = e => {
    e.preventDefault();
    const obj = getFromStorage("afp_falu");
    if (obj && obj.username && obj.token) {
      const data = {
        token: obj.token,
        username: obj.username,
        buildingId : e.target.id
      };
      console.log(data)
      axios.post("http://localhost:5000/village/palacenormalupgrade", data).then(res => {

        console.log(res)
      })

    }
    ///////TODO elküldeni ID-t servernek
  };
  onRareSubmit = e => {
    e.preventDefault();
    const obj = getFromStorage("afp_falu");
    if (obj && obj.username && obj.token) {
      const data = {
        token: obj.token,
        username: obj.username,
        buildingId : e.target.id
      };
      console.log(data)
      axios.post("http://localhost:5000/village/palacerareupgrade", data).then(res => {

        console.log(res)
      })

    }
    ///////TODO elküldeni ID-t servernek
  };
  tick() {
    this.setState({ wood: this.state.wood + (this.state.level * 80) / 3600 });
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
          palace_level: res.data.village.buildings.palace.level,
          palace_max_level: res.data.village.buildings.palace.maxlevel,

          merch_level: res.data.village.buildings.merch.level,
          merch_max_level: res.data.village.buildings.merch.maxlevel,

          merchworkshop_level: res.data.village.buildings.merchworkshop.level,
          merchworkshop_max_level:
            res.data.village.buildings.merchworkshop.maxlevel,

          temple_level: res.data.village.buildings.temple.level,
          temple_max_level: res.data.village.buildings.temple.maxlevel,

          wall_level: res.data.village.buildings.wall.level,
          wall_max_level: res.data.village.buildings.wall.maxlevel,

          warehouse_level: res.data.village.buildings.warehouse.level,
          warehouse_max_level: res.data.village.buildings.warehouse.maxlevel,

          hideout_level: res.data.village.buildings.hideout.level,
          hideout_max_level: res.data.village.buildings.hideout.maxlevel,

          statue_level: res.data.village.buildings.statue.level,
          statue_max_level: res.data.village.buildings.statue.maxlevel,

          metalfurnace_level: res.data.village.buildings.metalfurnace.level,
          metalfurnace_max_level:
            res.data.village.buildings.metalfurnace.maxlevel,

          mill_level: res.data.village.buildings.mill.level,
          mill_max_level: res.data.village.buildings.mill.maxlevel,

          wheatfield_level: res.data.village.buildings.wheatfield.level,
          wheatfield_max_level: res.data.village.buildings.wheatfield.maxlevel,

          ironmine_level: res.data.village.buildings.ironmine.level,
          ironmine_max_level: res.data.village.buildings.ironmine.maxlevel,

          lumberyard_level: res.data.village.buildings.lumberyard.level,
          lumberyard_max_level: res.data.village.buildings.lumberyard.maxlevel,

          brickyard_level: res.data.village.buildings.brickyard.level,
          brickyard_max_level: res.data.village.buildings.brickyard.maxlevel,

          wood: res.data.village.buildings.warehouse.wood,
          brick: res.data.village.buildings.warehouse.brick,
          iron: res.data.village.buildings.warehouse.iron,
          wheat: res.data.village.buildings.warehouse.wheat,
          stone: res.data.village.buildings.warehouse.stone,
          metal: res.data.village.buildings.warehouse.metal
        });

        this.timerInterval = setInterval(this.tick.bind(this), 1000);

        if (this.state.palace_levell > 0 && this.state.palace_level <= 5) {
          this.setState({
            img: <img id="kep" alt="" src={f1} />
          });
        }
        else if (this.state.palace_level > 5 && this.state.palace_level <= 15 ) {
          this.setState({
            img: <img id="kep" alt="" src={f2} />
          });
        }
        else {
          this.setState({
            img: <img id="kep" alt="" src={f3} />
          });
        }

        if (this.state.palace_level > 0 && this.state.palace_level <= 20) {
          this.setState({
            palace_level_constructon_time: this.state.palace_level * 5,
            palace_normal_price: this.state.palace_level * 50
          });
        } else if (
          this.state.palace_level > 20 &&
          this.state.palace_level <= 40
        ) {
          this.setState({
            palace_level_constructon_time: this.state.palace_level * 10,
            palace_normal_price: this.state.palace_level * 500
          });
        } else {
          this.setState({
            palace_level_constructon_time: this.state.palace_level * 20,
            palace_normal_price: this.state.palace_level * 5000
          });
        }

        if (
          this.state.warehouse_level > 0 &&
          this.state.warehouse_level <= 20
        ) {
          this.setState({
            warehouse_level_constructon_time:
              this.state.warehouse_level * 5 -
              this.state.warehouse_level * 5 * (this.state.palace_level / 100),
            warehouse_normal_price: this.state.warehouse_level * 50
          });
        } else if (
          this.state.warehouse_level > 20 &&
          this.state.warehouse_level <= 40
        ) {
          this.setState({
            warehouse_level_constructon_time:
              this.state.warehouse_level * 10 -
              this.state.warehouse_level * 10 * (this.state.palace_level / 100),
            warehouse_normal_price: this.state.warehouse_level * 500
          });
        } else {
          this.setState({
            warehouse_level_constructon_time:
              this.state.warehouse_level * 20 -
              this.state.warehouse_level * 20 * (this.state.palace_level / 100),
            warehouse_normal_price: this.state.warehouse_level * 5000
          });
        }

        if (this.state.hideout_level > 0 && this.state.hideout_level <= 20) {
          this.setState({
            hideout_level_constructon_time:
              this.state.hideout_level * 5 -
              this.state.hideout_level * 5 * (this.state.palace_level / 100),
            hideout_normal_price: this.state.hideout_level * 50
          });
        } else if (
          this.state.hideout_level > 20 &&
          this.state.hideout_level <= 40
        ) {
          this.setState({
            hideout_level_constructon_time:
              this.state.hideout_level * 10 -
              this.state.hideout_level * 10 * (this.state.palace_level / 100),
            hideout_normal_price: this.state.hideout_level * 500
          });
        } else {
          this.setState({
            hideout_level_constructon_time:
              this.state.hideout_level * 20 -
              this.state.hideout_level * 20 * (this.state.palace_level / 100),
            hideout_normal_price: this.state.hideout_level * 5000
          });
        }

        if (
          this.state.wheatfield_level > 0 &&
          this.state.wheatfield_level <= 20
        ) {
          this.setState({
            wheatfield_level_constructon_time:
              this.state.wheatfield_level * 5 -
              this.state.wheatfield_level * 5 * (this.state.palace_level / 100),
            wheatfield_normal_price: this.state.wheatfield_level * 50
          });
        } else if (
          this.state.wheatfield_level > 20 &&
          this.state.wheatfield_level <= 40
        ) {
          this.setState({
            wheatfield_level_constructon_time:
              this.state.wheatfield_level * 10 -
              this.state.wheatfield_level *
                10 *
                (this.state.palace_level / 100),
            wheatfield_normal_price: this.state.wheatfield_level * 500
          });
        } else {
          this.setState({
            wheatfield_level_constructon_time:
              this.state.wheatfield_level * 20 -
              this.state.wheatfield_level *
                20 *
                (this.state.palace_level / 100),
            wheatfield_normal_price: this.state.wheatfield_level * 5000
          });
        }

        if (this.state.ironmine_level > 0 && this.state.ironmine_level <= 20) {
          this.setState({
            ironmine_level_constructon_time:
              this.state.ironmine_level * 5 -
              this.state.ironmine_level * 5 * (this.state.palace_level / 100),
            ironmine_normal_price: this.state.ironmine_level * 50
          });
        } else if (
          this.state.ironmine_level > 20 &&
          this.state.ironmine_level <= 40
        ) {
          this.setState({
            ironmine_level_constructon_time:
              this.state.ironmine_level * 10 -
              this.state.ironmine_level * 10 * (this.state.palace_level / 100),
            ironmine_normal_price: this.state.ironmine_level * 500
          });
        } else {
          this.setState({
            ironmine_level_constructon_time:
              this.state.ironmine_level * 20 -
              this.state.ironmine_level * 20 * (this.state.palace_level / 100),
            ironmine_normal_price: this.state.ironmine_level * 5000
          });
        }

        if (
          this.state.brickyard_level > 0 &&
          this.state.brickyard_level <= 20
        ) {
          this.setState({
            brickyard_level_constructon_time:
              this.state.brickyard_level * 5 -
              this.state.brickyard_level * 5 * (this.state.palace_level / 100),
            brickyard_normal_price: this.state.brickyard_level * 50
          });
        } else if (
          this.state.brickyard_level > 20 &&
          this.state.brickyard_level <= 40
        ) {
          this.setState({
            brickyard_level_constructon_time:
              this.state.brickyard_level * 10 -
              this.state.brickyard_level * 10 * (this.state.palace_level / 100),
            brickyard_normal_price: this.state.brickyard_level * 500
          });
        } else {
          this.setState({
            brickyard_level_constructon_time:
              this.state.brickyard_level * 20 -
              this.state.brickyard_level * 20 * (this.state.palace_level / 100),
            brickyard_normal_price: this.state.brickyard_level * 5000
          });
        }

        if (
          this.state.lumberyard_level > 0 &&
          this.state.lumberyard_level <= 20
        ) {
          this.setState({
            lumberyard_level_constructon_time:
              this.state.lumberyard_level * 5 -
              this.state.lumberyard_level * 5 * (this.state.palace_level / 100),
            lumberyard_normal_price: this.state.lumberyard_level * 50
          });
        } else if (
          this.state.lumberyard_level > 20 &&
          this.state.lumberyard_level <= 40
        ) {
          this.setState({
            lumberyard_level_constructon_time:
              this.state.lumberyard_level * 10 -
              this.state.lumberyard_level *
                10 *
                (this.state.palace_level / 100),
            lumberyard_normal_price: this.state.lumberyard_level * 500
          });
        } else {
          this.setState({
            lumberyard_level_constructon_time:
              this.state.lumberyard_level * 20 -
              this.state.lumberyard_level *
                20 *
                (this.state.palace_level / 100),
            lumberyard_normal_price: this.state.lumberyard_level * 5000
          });
        }

        if (this.state.merch_level > 0 && this.state.merch_level <= 10) {
          this.setState({
            merch_level_constructon_time:
              this.state.merch_level * 5 -
              this.state.merch_level * 5 * (this.state.palace_level / 100),
            merch_normal_price: this.state.merch_level * 100
          });
        } else if (
          this.state.merch_level > 10 &&
          this.state.merch_level <= 20
        ) {
          this.setState({
            merch_level_constructon_time:
              this.state.merch_level * 10 -
              this.state.merch_level * 10 * (this.state.palace_level / 100),
            merch_normal_price: this.state.merch_level * 1000
          });
        } else {
          this.setState({
            merch_level_constructon_time:
              this.state.merch_level * 20 -
              this.state.merch_level * 20 * (this.state.palace_level / 100),
            merch_normal_price: this.state.merch_level * 10000
          });
        }

        if (this.state.wall_level > 0 && this.state.wall_level <= 10) {
          this.setState({
            wall_level_constructon_time:
              this.state.wall_level * 5 -
              this.state.wall_level * 5 * (this.state.palace_level / 100),
            wall_normal_price: this.state.wall_level * 100
          });
        } else if (this.state.wall_level > 10 && this.state.wall_level <= 20) {
          this.setState({
            wall_level_constructon_time:
              this.state.wall_level * 10 -
              this.state.wall_level * 10 * (this.state.palace_level / 100),
            wall_normal_price: this.state.wall_level * 1000
          });
        } else {
          this.setState({
            wall_level_constructon_time:
              this.state.wall_level * 20 -
              this.state.wall_level * 20 * (this.state.palace_level / 100),
            wall_normal_price: this.state.wall_level * 10000
          });
        }

        if (
          this.state.merchworkshop_level > 0 &&
          this.state.merchworkshop_level <= 3
        ) {
          this.setState({
            merchworkshop_level_constructon_time:
              this.state.merchworkshop_level * 5 -
              this.state.merchworkshop_level *
                5 *
                (this.state.palace_level / 100),
            merchworkshop_normal_price: this.state.merchworkshop_level * 2500
          });
        } else if (
          this.state.merchworkshop_level > 3 &&
          this.state.merchworkshop_level <= 6
        ) {
          this.setState({
            merchworkshop_level_constructon_time:
              this.state.merchworkshop_level * 10 -
              this.state.merchworkshop_level *
                10 *
                (this.state.palace_level / 100),
            merchworkshop_normal_price: this.state.merchworkshop_level * 5000
          });
        } else {
          this.setState({
            merchworkshop_level_constructon_time:
              this.state.merchworkshop_level * 20 -
              this.state.merchworkshop_level *
                20 *
                (this.state.palace_level / 100),
            merchworkshop_normal_price: this.state.merchworkshop_level * 10000
          });
        }

        if (this.state.temple_level > 0 && this.state.temple_level <= 3) {
          this.setState({
            temple_level_constructon_time:
              this.state.temple_level * 5 -
              this.state.temple_level * 5 * (this.state.palace_level / 100),
            temple_normal_price: this.state.temple_level * 2500
          });
        } else if (
          this.state.temple_level > 3 &&
          this.state.temple_level <= 6
        ) {
          this.setState({
            temple_level_constructon_time:
              this.state.temple_level * 10 -
              this.state.temple_level * 10 * (this.state.palace_level / 100),
            temple_normal_price: this.state.temple_level * 5000
          });
        } else {
          this.setState({
            temple_level_constructon_time:
              this.state.temple_level * 20 -
              this.state.temple_level * 20 * (this.state.palace_level / 100),
            temple_normal_price: this.state.temple_level * 10000
          });
        }
        if (
          this.state.metalfurnace_level > 0 &&
          this.state.metalfurnace_level <= 3
        ) {
          this.setState({
            metalfurnace_level_constructon_time:
              this.state.metalfurnace_level * 5 -
              this.state.metalfurnace_level *
                5 *
                (this.state.palace_level / 100),
            metalfurnace_normal_price: this.state.metalfurnace_level * 2500
          });
        } else if (
          this.state.metalfurnace_level > 3 &&
          this.state.metalfurnace_level <= 6
        ) {
          this.setState({
            metalfurnace_level_constructon_time:
              this.state.metalfurnace_level * 10 -
              this.state.metalfurnace_level *
                10 *
                (this.state.palace_level / 100),
            metalfurnace_normal_price: this.state.metalfurnace_level * 5000
          });
        } else {
          this.setState({
            metalfurnace_level_constructon_time:
              this.state.metalfurnace_level * 20 -
              this.state.metalfurnace_level *
                20 *
                (this.state.palace_level / 100),
            metalfurnace_normal_price: this.state.metalfurnace_level * 10000
          });
        }

        if (this.state.mill_level > 0 && this.state.mill_level <= 3) {
          this.setState({
            mill_level_constructon_time:
              this.state.mill_level * 5 -
              this.state.mill_level * 5 * (this.state.palace_level / 100),
            mill_normal_price: this.state.mill_level * 2500
          });
        } else if (this.state.mill_level > 3 && this.state.mill_level <= 6) {
          this.setState({
            mill_level_constructon_time:
              this.state.mill_level * 10 -
              this.state.mill_level * 10 * (this.state.palace_level / 100),
            mill_normal_price: this.state.mill_level * 5000
          });
        } else {
          this.setState({
            mill_level_constructon_time:
              this.state.mill_level * 20 -
              this.state.mill_level * 20 * (this.state.palace_level / 100),
            mill_normal_price: this.state.mill_level * 10000
          });
        }

        if (
          this.state.palace_level === 50 &&
          this.state.warehouse_level === 50 &&
          this.state.wheatfield_level === 50 &&
          this.state.ironmine_level === 50 &&
          this.state.brickyard_level === 50 &&
          this.state.lumberyard_level === 50 &&
          this.state.merch_level === 30 &&
          this.state.wall_level === 30 &&
          this.state.merchworkshop_level === 10 &&
          this.state.temple_level === 10 &&
          this.state.metalfurnace_level === 10 &&
          this.state.mill_level === 10
        ) {
          this.setState({
            statue_level_constructon_time:
              4000 * (this.state.palace_level / 100),
            statue_normal_price: 500000,
            statue_state: true
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
        <p id="title">Palace</p>
        <p id="building-info">
          The palace lets you to improve your bildings, or decontstruct them.
          Each job needs time and resources.
        </p>

        {this.state.img}
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
              <td>Wheat:</td>
              <td>{parseInt(this.state.wheat)}</td>
            </tr>
            <tr>
              <td>Stone:</td>
              <td>{parseInt(this.state.stone)}</td>
            </tr>
            <tr>
              <td>Metal:</td>
              <td>{parseInt(this.state.metal)}</td>
            </tr>
          </tbody>
        </table>
        <table id="bulder-table">
          <tbody>
            <tr>
              <th>Building</th>
              <th>Construction time</th>
              <th>Base resource price</th>
              <th>Rare resource price</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>
                {this.state.palace_level + 1 > this.state.palace_max_level
                  ? "Palace"
                  : "Palace to level:"}
                <span>
                  {this.state.palace_level + 1 > this.state.palace_max_level
                    ? ""
                    : this.state.palace_level + 1}
                </span>
              </td>
              <td>
                {this.state.palace_level + 1 > this.state.palace_max_level ? (
                  ""
                ) : this.state.palace_level_constructon_time > 60 ? (
                  <span>
                    {(this.state.palace_level_constructon_time / 60).toFixed(2)}
                  </span>
                ) : (
                  <span>
                    {(1 * this.state.palace_level_constructon_time).toFixed(2)}
                  </span>
                )}
                {this.state.palace_level + 1 > this.state.palace_max_level
                  ? ""
                  : this.state.palace_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.palace_level + 1 > this.state.palace_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.palace_level + 1 > this.state.palace_max_level
                    ? ""
                    : this.state.palace_normal_price}
                </span>
                {this.state.palace_level + 1 > this.state.palace_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.palace_level + 1 > this.state.palace_max_level
                    ? ""
                    : this.state.palace_normal_price}
                </span>
                {this.state.palace_level + 1 > this.state.palace_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.palace_level + 1 > this.state.palace_max_level
                    ? ""
                    : this.state.palace_normal_price}
                </span>
                {this.state.palace_level + 1 > this.state.palace_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.palace_level + 1 > this.state.palace_max_level
                    ? ""
                    : this.state.palace_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.palace_level + 1 > this.state.palace_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.palace_level + 1 > this.state.palace_max_level
                    ? ""
                    : this.state.palace_normal_price * 3 * 0.05}
                </span>
                {this.state.palace_level + 1 > this.state.palace_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.palace_level + 1 > this.state.palace_max_level
                    ? ""
                    : this.state.palace_normal_price * 3 * 0.05}
                </span>
                {this.state.palace_level + 1 > this.state.palace_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.palace_level + 1 > this.state.palace_max_level
                    ? ""
                    : this.state.palace_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.palace_level + 1 > this.state.palace_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={1}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={1}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.merch_level + 1 > this.state.merch_max_level
                  ? "Merch"
                  : "Merch to level:"}
                <span>
                  {this.state.merch_level + 1 > this.state.merch_max_level
                    ? ""
                    : this.state.merch_level + 1}
                </span>
              </td>
              <td>
                {this.state.merch_level + 1 > this.state.merch_max_level ? (
                  ""
                ) : this.state.merch_level_constructon_time > 60 ? (
                  <span>
                    {(this.state.merch_level_constructon_time / 60).toFixed(2)}
                  </span>
                ) : (
                  <span>
                    {(1 * this.state.merch_level_constructon_time).toFixed(2)}
                  </span>
                )}
                {this.state.merch_level + 1 > this.state.merch_max_level
                  ? ""
                  : this.state.merch_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.merch_level + 1 > this.state.merch_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.merch_level + 1 > this.state.merch_max_level
                    ? ""
                    : this.state.merch_normal_price}
                </span>
                {this.state.merch_level + 1 > this.state.merch_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.merch_level + 1 > this.state.merch_max_level
                    ? ""
                    : this.state.merch_normal_price}
                </span>
                {this.state.merch_level + 1 > this.state.merch_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.merch_level + 1 > this.state.merch_max_level
                    ? ""
                    : this.state.merch_normal_price}
                </span>
                {this.state.merch_level + 1 > this.state.merch_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.merch_level + 1 > this.state.merch_max_level
                    ? ""
                    : this.state.merch_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.merch_level + 1 > this.state.merch_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.merch_level + 1 > this.state.merch_max_level
                    ? ""
                    : this.state.merch_normal_price * 3 * 0.05}
                </span>
                {this.state.merch_level + 1 > this.state.merch_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.merch_level + 1 > this.state.merch_max_level
                    ? ""
                    : this.state.merch_normal_price * 3 * 0.05}
                </span>
                {this.state.merch_level + 1 > this.state.merch_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.merch_level + 1 > this.state.merch_max_level
                    ? ""
                    : this.state.merch_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.merch_level + 1 > this.state.merch_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={2}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={2}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.merchworkshop_level + 1 >
                this.state.merchworkshop_max_level
                  ? "Merchworkshop"
                  : "Merchworkshop to level:"}
                <span>
                  {this.state.merchworkshop_level + 1 >
                  this.state.merchworkshop_max_level
                    ? ""
                    : this.state.merchworkshop_level + 1}
                </span>
              </td>
              <td>
                {this.state.merchworkshop_level + 1 >
                this.state.merchworkshop_max_level ? (
                  ""
                ) : this.state.merchworkshop_level_constructon_time > 60 ? (
                  <span>
                    {(
                      this.state.merchworkshop_level_constructon_time / 60
                    ).toFixed(2)}
                  </span>
                ) : (
                  <span>
                    {(
                      1 * this.state.merchworkshop_level_constructon_time
                    ).toFixed(2)}
                  </span>
                )}
                {this.state.merchworkshop_level + 1 >
                this.state.merchworkshop_max_level
                  ? ""
                  : this.state.merchworkshop_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.merchworkshop_level + 1 >
                this.state.merchworkshop_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.merchworkshop_level + 1 >
                  this.state.merchworkshop_max_level
                    ? ""
                    : this.state.merchworkshop_normal_price}
                </span>
                {this.state.merchworkshop_level + 1 >
                this.state.merchworkshop_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.merchworkshop_level + 1 >
                  this.state.merchworkshop_max_level
                    ? ""
                    : this.state.merchworkshop_normal_price}
                </span>
                {this.state.merchworkshop_level + 1 >
                this.state.merchworkshop_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.merchworkshop_level + 1 >
                  this.state.merchworkshop_max_level
                    ? ""
                    : this.state.merchworkshop_normal_price}
                </span>
                {this.state.merchworkshop_level + 1 >
                this.state.merchworkshop_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.merchworkshop_level + 1 >
                  this.state.merchworkshop_max_level
                    ? ""
                    : this.state.merchworkshop_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.merchworkshop_level + 1 >
                this.state.merchworkshop_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.merchworkshop_level + 1 >
                  this.state.merchworkshop_max_level
                    ? ""
                    : this.state.merchworkshop_normal_price * 3 * 0.05}
                </span>
                {this.state.merchworkshop_level + 1 >
                this.state.merchworkshop_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.merchworkshop_level + 1 >
                  this.state.merchworkshop_max_level
                    ? ""
                    : this.state.merchworkshop_normal_price * 3 * 0.05}
                </span>
                {this.state.merchworkshop_level + 1 >
                this.state.merchworkshop_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.merchworkshop_level + 1 >
                  this.state.merchworkshop_max_level
                    ? ""
                    : this.state.merchworkshop_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.merchworkshop_level + 1 >
                this.state.merchworkshop_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={3}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={3}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>

            <tr>
              <td>
                {this.state.temple_level + 1 > this.state.temple_max_level
                  ? "Temple"
                  : "Temple to level:"}
                <span>
                  {this.state.temple_level + 1 > this.state.temple_max_level
                    ? ""
                    : this.state.temple_level + 1}
                </span>
              </td>
              <td>
                {this.state.temple_level + 1 > this.state.temple_max_level ? (
                  ""
                ) : this.state.temple_level_constructon_time > 60 ? (
                  <span>
                    {(this.state.temple_level_constructon_time / 60).toFixed(2)}
                  </span>
                ) : (
                  <span>
                    {(1 * this.state.temple_level_constructon_time).toFixed(2)}
                  </span>
                )}
                {this.state.temple_level + 1 > this.state.temple_max_level
                  ? ""
                  : this.state.temple_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.temple_level + 1 > this.state.temple_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.temple_level + 1 > this.state.temple_max_level
                    ? ""
                    : this.state.temple_normal_price}
                </span>
                {this.state.temple_level + 1 > this.state.temple_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.temple_level + 1 > this.state.temple_max_level
                    ? ""
                    : this.state.temple_normal_price}
                </span>
                {this.state.temple_level + 1 > this.state.temple_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.temple_level + 1 > this.state.temple_max_level
                    ? ""
                    : this.state.temple_normal_price}
                </span>
                {this.state.temple_level + 1 > this.state.temple_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.temple_level + 1 > this.state.temple_max_level
                    ? ""
                    : this.state.temple_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.temple_level + 1 > this.state.temple_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.temple_level + 1 > this.state.temple_max_level
                    ? ""
                    : this.state.temple_normal_price * 3 * 0.05}
                </span>
                {this.state.temple_level + 1 > this.state.temple_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.temple_level + 1 > this.state.temple_max_level
                    ? ""
                    : this.state.temple_normal_price * 3 * 0.05}
                </span>
                {this.state.temple_level + 1 > this.state.temple_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.temple_level + 1 > this.state.temple_max_level
                    ? ""
                    : this.state.temple_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.temple_level + 1 > this.state.temple_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={4}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={4}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.wall_level + 1 > this.state.wall_max_level
                  ? "Wall"
                  : "Wall to level:"}
                <span>
                  {this.state.wall_level + 1 > this.state.wall_max_level
                    ? ""
                    : this.state.wall_level + 1}
                </span>
              </td>
              <td>
                {this.state.wall_level + 1 > this.state.wall_max_level ? (
                  ""
                ) : this.state.wall_level_constructon_time > 60 ? (
                  <span>
                    {(this.state.wall_level_constructon_time / 60).toFixed(2)}
                  </span>
                ) : (
                  <span>
                    {(1 * this.state.wall_level_constructon_time).toFixed(2)}
                  </span>
                )}
                {this.state.wall_level + 1 > this.state.wall_max_level
                  ? ""
                  : this.state.wall_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.wall_level + 1 > this.state.wall_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.wall_level + 1 > this.state.wall_max_level
                    ? ""
                    : this.state.wall_normal_price}
                </span>
                {this.state.wall_level + 1 > this.state.wall_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.wall_level + 1 > this.state.wall_max_level
                    ? ""
                    : this.state.wall_normal_price}
                </span>
                {this.state.wall_level + 1 > this.state.wall_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.wall_level + 1 > this.state.wall_max_level
                    ? ""
                    : this.state.wall_normal_price}
                </span>
                {this.state.wall_level + 1 > this.state.wall_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.wall_level + 1 > this.state.wall_max_level
                    ? ""
                    : this.state.wall_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.wall_level + 1 > this.state.wall_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.wall_level + 1 > this.state.wall_max_level
                    ? ""
                    : this.state.wall_normal_price * 3 * 0.05}
                </span>
                {this.state.wall_level + 1 > this.state.wall_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.wall_level + 1 > this.state.wall_max_level
                    ? ""
                    : this.state.wall_normal_price * 3 * 0.05}
                </span>
                {this.state.wall_level + 1 > this.state.wall_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.wall_level + 1 > this.state.wall_max_level
                    ? ""
                    : this.state.wall_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.wall_level + 1 > this.state.wall_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={5}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={5}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.warehouse_level + 1 > this.state.warehouse_max_level
                  ? "Warehouse"
                  : "Warehouse to level:"}
                <span>
                  {this.state.warehouse_level + 1 >
                  this.state.warehouse_max_level
                    ? ""
                    : this.state.warehouse_level + 1}
                </span>
              </td>
              <td>
                {this.state.warehouse_level + 1 >
                this.state.warehouse_max_level ? (
                  ""
                ) : this.state.warehouse_level_constructon_time > 60 ? (
                  <span>
                    {(this.state.warehouse_level_constructon_time / 60).toFixed(
                      2
                    )}
                  </span>
                ) : (
                  <span>
                    {(1 * this.state.warehouse_level_constructon_time).toFixed(
                      2
                    )}
                  </span>
                )}
                {this.state.warehouse_level + 1 > this.state.warehouse_max_level
                  ? ""
                  : this.state.warehouse_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.warehouse_level + 1 > this.state.warehouse_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.warehouse_level + 1 >
                  this.state.warehouse_max_level
                    ? ""
                    : this.state.warehouse_normal_price}
                </span>
                {this.state.warehouse_level + 1 > this.state.warehouse_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.warehouse_level + 1 >
                  this.state.warehouse_max_level
                    ? ""
                    : this.state.warehouse_normal_price}
                </span>
                {this.state.warehouse_level + 1 > this.state.warehouse_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.warehouse_level + 1 >
                  this.state.warehouse_max_level
                    ? ""
                    : this.state.warehouse_normal_price}
                </span>
                {this.state.warehouse_level + 1 > this.state.warehouse_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.warehouse_level + 1 >
                  this.state.warehouse_max_level
                    ? ""
                    : this.state.warehouse_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.warehouse_level + 1 > this.state.warehouse_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.warehouse_level + 1 >
                  this.state.warehouse_max_level
                    ? ""
                    : this.state.warehouse_normal_price * 3 * 0.05}
                </span>
                {this.state.warehouse_level + 1 > this.state.warehouse_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.warehouse_level + 1 >
                  this.state.warehouse_max_level
                    ? ""
                    : this.state.warehouse_normal_price * 3 * 0.05}
                </span>
                {this.state.warehouse_level + 1 > this.state.warehouse_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.warehouse_level + 1 >
                  this.state.warehouse_max_level
                    ? ""
                    : this.state.warehouse_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.warehouse_level + 1 >
                this.state.warehouse_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={6}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={6}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.hideout_level + 1 > this.state.hideout_max_level
                  ? "Hideout"
                  : "Hideout to level:"}
                <span>
                  {this.state.hideout_level + 1 > this.state.hideout_max_level
                    ? ""
                    : this.state.hideout_level + 1}
                </span>
              </td>
              <td>
                {this.state.hideout_level + 1 > this.state.hideout_max_level ? (
                  ""
                ) : this.state.hideout_level_constructon_time > 60 ? (
                  <span>
                    {(this.state.hideout_level_constructon_time / 60).toFixed(
                      2
                    )}
                  </span>
                ) : (
                  <span>
                    {(1 * this.state.hideout_level_constructon_time).toFixed(2)}
                  </span>
                )}
                {this.state.hideout_level + 1 > this.state.hideout_max_level
                  ? ""
                  : this.state.hideout_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.hideout_level + 1 > this.state.hideout_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.hideout_level + 1 > this.state.hideout_max_level
                    ? ""
                    : this.state.hideout_normal_price}
                </span>
                {this.state.hideout_level + 1 > this.state.hideout_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.hideout_level + 1 > this.state.hideout_max_level
                    ? ""
                    : this.state.hideout_normal_price}
                </span>
                {this.state.hideout_level + 1 > this.state.hideout_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.hideout_level + 1 > this.state.hideout_max_level
                    ? ""
                    : this.state.hideout_normal_price}
                </span>
                {this.state.hideout_level + 1 > this.state.hideout_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.hideout_level + 1 > this.state.hideout_max_level
                    ? ""
                    : this.state.hideout_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.hideout_level + 1 > this.state.hideout_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.hideout_level + 1 > this.state.hideout_max_level
                    ? ""
                    : this.state.hideout_normal_price * 3 * 0.05}
                </span>
                {this.state.hideout_level + 1 > this.state.hideout_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.hideout_level + 1 > this.state.hideout_max_level
                    ? ""
                    : this.state.hideout_normal_price * 3 * 0.05}
                </span>
                {this.state.hideout_level + 1 > this.state.hideout_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.hideout_level + 1 > this.state.hideout_max_level
                    ? ""
                    : this.state.hideout_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.hideout_level + 1 > this.state.hideout_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={7}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={7}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.statue_level + 1 > this.state.statue_max_level
                  ? "Statue"
                  : "Statue to level:"}
                <span>
                  {this.state.statue_level + 1 > this.state.statue_max_level
                    ? ""
                    : this.state.statue_level + 1}
                </span>
              </td>
              <td>
                {this.state.statue_level + 1 > this.state.statue_max_level ? (
                  ""
                ) : this.state.statue_level_constructon_time > 60 ? (
                  <span>
                    {(this.state.statue_level_constructon_time / 60).toFixed(2)}
                  </span>
                ) : (
                  <span>
                    {(1 * this.state.statue_level_constructon_time).toFixed(2)}
                  </span>
                )}
                {this.state.statue_level + 1 > this.state.statue_max_level
                  ? ""
                  : this.state.statue_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.statue_level + 1 > this.state.statue_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.statue_level + 1 > this.state.statue_max_level
                    ? ""
                    : this.state.statue_normal_price}
                </span>
                {this.state.statue_level + 1 > this.state.statue_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.statue_level + 1 > this.state.statue_max_level
                    ? ""
                    : this.state.statue_normal_price}
                </span>
                {this.state.statue_level + 1 > this.state.statue_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.statue_level + 1 > this.state.statue_max_level
                    ? ""
                    : this.state.statue_normal_price}
                </span>
                {this.state.statue_level + 1 > this.state.statue_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.statue_level + 1 > this.state.statue_max_level
                    ? ""
                    : this.state.statue_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.statue_level + 1 > this.state.statue_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.statue_level + 1 > this.state.statue_max_level
                    ? ""
                    : this.state.statue_normal_price * 3 * 0.05}
                </span>
                {this.state.statue_level + 1 > this.state.statue_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.statue_level + 1 > this.state.statue_max_level
                    ? ""
                    : this.state.statue_normal_price * 3 * 0.05}
                </span>
                {this.state.statue_level + 1 > this.state.statue_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.statue_level + 1 > this.state.statue_max_level
                    ? ""
                    : this.state.statue_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.statue_level + 1 > this.state.statue_max_level ? (
                  "Maximum level reached"
                ) : this.state.statue_state ? (
                  <div>
                    <input
                      id={8}
                      className="improvebutton"
                      disabled
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={8}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                ) : (
                  "Cant build it now unless everything is built up to the max level"
                )}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.metalfurnace_level + 1 >
                this.state.metalfurnace_max_level
                  ? "Metalfurnace"
                  : "Metalfurnace to level:"}
                <span>
                  {this.state.metalfurnace_level + 1 >
                  this.state.metalfurnace_max_level
                    ? ""
                    : this.state.metalfurnace_level + 1}
                </span>
              </td>
              <td>
                {this.state.metalfurnace_level + 1 >
                this.state.metalfurnace_max_level ? (
                  ""
                ) : this.state.metalfurnace_level_constructon_time > 60 ? (
                  <span>
                    {(
                      this.state.metalfurnace_level_constructon_time / 60
                    ).toFixed(2)}
                  </span>
                ) : (
                  <span>
                    {(
                      1 * this.state.metalfurnace_level_constructon_time
                    ).toFixed(2)}
                  </span>
                )}
                {this.state.metalfurnace_level + 1 >
                this.state.metalfurnace_max_level
                  ? ""
                  : this.state.metalfurnace_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.metalfurnace_level + 1 >
                this.state.metalfurnace_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.metalfurnace_level + 1 >
                  this.state.metalfurnace_max_level
                    ? ""
                    : this.state.metalfurnace_normal_price}
                </span>
                {this.state.metalfurnace_level + 1 >
                this.state.metalfurnace_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.metalfurnace_level + 1 >
                  this.state.metalfurnace_max_level
                    ? ""
                    : this.state.metalfurnace_normal_price}
                </span>
                {this.state.metalfurnace_level + 1 >
                this.state.metalfurnace_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.metalfurnace_level + 1 >
                  this.state.metalfurnace_max_level
                    ? ""
                    : this.state.metalfurnace_normal_price}
                </span>
                {this.state.metalfurnace_level + 1 >
                this.state.metalfurnace_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.metalfurnace_level + 1 >
                  this.state.metalfurnace_max_level
                    ? ""
                    : this.state.metalfurnace_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.metalfurnace_level + 1 >
                this.state.metalfurnace_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.metalfurnace_level + 1 >
                  this.state.metalfurnace_max_level
                    ? ""
                    : this.state.metalfurnace_normal_price * 3 * 0.05}
                </span>
                {this.state.metalfurnace_level + 1 >
                this.state.metalfurnace_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.metalfurnace_level + 1 >
                  this.state.metalfurnace_max_level
                    ? ""
                    : this.state.metalfurnace_normal_price * 3 * 0.05}
                </span>
                {this.state.metalfurnace_level + 1 >
                this.state.metalfurnace_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.metalfurnace_level + 1 >
                  this.state.metalfurnace_max_level
                    ? ""
                    : this.state.metalfurnace_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.metalfurnace_level + 1 >
                this.state.metalfurnace_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={9}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={9}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.mill_level + 1 > this.state.mill_max_level
                  ? "Mill"
                  : "Mill to level:"}
                <span>
                  {this.state.mill_level + 1 > this.state.mill_max_level
                    ? ""
                    : this.state.mill_level + 1}
                </span>
              </td>
              <td>
                {this.state.mill_level + 1 > this.state.mill_max_level ? (
                  ""
                ) : this.state.mill_level_constructon_time > 60 ? (
                  <span>
                    {(this.state.mill_level_constructon_time / 60).toFixed(2)}
                  </span>
                ) : (
                  <span>
                    {(1 * this.state.mill_level_constructon_time).toFixed(2)}
                  </span>
                )}
                {this.state.mill_level + 1 > this.state.mill_max_level
                  ? ""
                  : this.state.mill_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.mill_level + 1 > this.state.mill_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.mill_level + 1 > this.state.mill_max_level
                    ? ""
                    : this.state.mill_normal_price}
                </span>
                {this.state.mill_level + 1 > this.state.mill_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.mill_level + 1 > this.state.mill_max_level
                    ? ""
                    : this.state.mill_normal_price}
                </span>
                {this.state.mill_level + 1 > this.state.mill_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.mill_level + 1 > this.state.mill_max_level
                    ? ""
                    : this.state.mill_normal_price}
                </span>
                {this.state.mill_level + 1 > this.state.mill_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.mill_level + 1 > this.state.mill_max_level
                    ? ""
                    : this.state.mill_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.mill_level + 1 > this.state.mill_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.mill_level + 1 > this.state.mill_max_level
                    ? ""
                    : this.state.mill_normal_price * 3 * 0.05}
                </span>
                {this.state.mill_level + 1 > this.state.mill_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.mill_level + 1 > this.state.mill_max_level
                    ? ""
                    : this.state.mill_normal_price * 3 * 0.05}
                </span>
                {this.state.mill_level + 1 > this.state.mill_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.mill_level + 1 > this.state.mill_max_level
                    ? ""
                    : this.state.mill_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.mill_level + 1 > this.state.mill_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={10}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={10}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.wheatfield_level + 1 >
                this.state.wheatfield_max_level
                  ? "Wheatfield"
                  : "Wheatfield to level:"}
                <span>
                  {this.state.wheatfield_level + 1 >
                  this.state.wheatfield_max_level
                    ? ""
                    : this.state.wheatfield_level + 1}
                </span>
              </td>
              <td>
                {this.state.wheatfield_level + 1 >
                this.state.wheatfield_max_level ? (
                  ""
                ) : this.state.wheatfield_level_constructon_time > 60 ? (
                  <span>
                    {(
                      this.state.wheatfield_level_constructon_time / 60
                    ).toFixed(2)}
                  </span>
                ) : (
                  <span>
                    {(1 * this.state.wheatfield_level_constructon_time).toFixed(
                      2
                    )}
                  </span>
                )}
                {this.state.wheatfield_level + 1 >
                this.state.wheatfield_max_level
                  ? ""
                  : this.state.wheatfield_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.wheatfield_level + 1 >
                this.state.wheatfield_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.wheatfield_level + 1 >
                  this.state.wheatfield_max_level
                    ? ""
                    : this.state.wheatfield_normal_price}
                </span>
                {this.state.wheatfield_level + 1 >
                this.state.wheatfield_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.wheatfield_level + 1 >
                  this.state.wheatfield_max_level
                    ? ""
                    : this.state.wheatfield_normal_price}
                </span>
                {this.state.wheatfield_level + 1 >
                this.state.wheatfield_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.wheatfield_level + 1 >
                  this.state.wheatfield_max_level
                    ? ""
                    : this.state.wheatfield_normal_price}
                </span>
                {this.state.wheatfield_level + 1 >
                this.state.wheatfield_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.wheatfield_level + 1 >
                  this.state.wheatfield_max_level
                    ? ""
                    : this.state.wheatfield_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.wheatfield_level + 1 >
                this.state.wheatfield_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.wheatfield_level + 1 >
                  this.state.wheatfield_max_level
                    ? ""
                    : this.state.wheatfield_normal_price * 3 * 0.05}
                </span>
                {this.state.wheatfield_level + 1 >
                this.state.wheatfield_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.wheatfield_level + 1 >
                  this.state.wheatfield_max_level
                    ? ""
                    : this.state.wheatfield_normal_price * 3 * 0.05}
                </span>
                {this.state.wheatfield_level + 1 >
                this.state.wheatfield_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.wheatfield_level + 1 >
                  this.state.wheatfield_max_level
                    ? ""
                    : this.state.wheatfield_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.wheatfield_level + 1 >
                this.state.wheatfield_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={11}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={11}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                  ? "Ironmine"
                  : "Ironmine to level:"}
                <span>
                  {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                    ? ""
                    : this.state.ironmine_level + 1}
                </span>
              </td>
              <td>
                {this.state.ironmine_level + 1 >
                this.state.ironmine_max_level ? (
                  ""
                ) : this.state.ironmine_level_constructon_time > 60 ? (
                  <span>
                    {(this.state.ironmine_level_constructon_time / 60).toFixed(
                      2
                    )}
                  </span>
                ) : (
                  <span>
                    {(1 * this.state.ironmine_level_constructon_time).toFixed(
                      2
                    )}
                  </span>
                )}
                {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                  ? ""
                  : this.state.ironmine_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                    ? ""
                    : this.state.ironmine_normal_price}
                </span>
                {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                    ? ""
                    : this.state.ironmine_normal_price}
                </span>
                {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                    ? ""
                    : this.state.ironmine_normal_price}
                </span>
                {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                    ? ""
                    : this.state.ironmine_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                    ? ""
                    : this.state.ironmine_normal_price * 3 * 0.05}
                </span>
                {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                    ? ""
                    : this.state.ironmine_normal_price * 3 * 0.05}
                </span>
                {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.ironmine_level + 1 > this.state.ironmine_max_level
                    ? ""
                    : this.state.ironmine_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.ironmine_level + 1 >
                this.state.ironmine_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={12}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={12}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.lumberyard_level + 1 >
                this.state.lumberyard_max_level
                  ? "Lumberyard"
                  : "Lumberyard to level:"}
                <span>
                  {this.state.lumberyard_level + 1 >
                  this.state.lumberyard_max_level
                    ? ""
                    : this.state.lumberyard_level + 1}
                </span>
              </td>
              <td>
                {this.state.lumberyard_level + 1 >
                this.state.lumberyard_max_level ? (
                  ""
                ) : this.state.lumberyard_level_constructon_time > 60 ? (
                  <span>
                    {(
                      this.state.lumberyard_level_constructon_time / 60
                    ).toFixed(2)}
                  </span>
                ) : (
                  <span>
                    {(1 * this.state.lumberyard_level_constructon_time).toFixed(
                      2
                    )}
                  </span>
                )}
                {this.state.lumberyard_level + 1 >
                this.state.lumberyard_max_level
                  ? ""
                  : this.state.lumberyard_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.lumberyard_level + 1 >
                this.state.lumberyard_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.lumberyard_level + 1 >
                  this.state.lumberyard_max_level
                    ? ""
                    : this.state.lumberyard_normal_price}
                </span>
                {this.state.lumberyard_level + 1 >
                this.state.lumberyard_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.lumberyard_level + 1 >
                  this.state.lumberyard_max_level
                    ? ""
                    : this.state.lumberyard_normal_price}
                </span>
                {this.state.lumberyard_level + 1 >
                this.state.lumberyard_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.lumberyard_level + 1 >
                  this.state.lumberyard_max_level
                    ? ""
                    : this.state.lumberyard_normal_price}
                </span>
                {this.state.lumberyard_level + 1 >
                this.state.lumberyard_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.lumberyard_level + 1 >
                  this.state.lumberyard_max_level
                    ? ""
                    : this.state.lumberyard_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.lumberyard_level + 1 >
                this.state.lumberyard_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.lumberyard_level + 1 >
                  this.state.lumberyard_max_level
                    ? ""
                    : this.state.lumberyard_normal_price * 3 * 0.05}
                </span>
                {this.state.lumberyard_level + 1 >
                this.state.lumberyard_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.lumberyard_level + 1 >
                  this.state.lumberyard_max_level
                    ? ""
                    : this.state.lumberyard_normal_price * 3 * 0.05}
                </span>
                {this.state.lumberyard_level + 1 >
                this.state.lumberyard_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.lumberyard_level + 1 >
                  this.state.lumberyard_max_level
                    ? ""
                    : this.state.lumberyard_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.lumberyard_level + 1 >
                this.state.lumberyard_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={14}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={14}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.brickyard_level + 1 > this.state.brickyard_max_level
                  ? "Brickyard"
                  : "Brickyard to level:"}
                <span>
                  {this.state.brickyard_level + 1 >
                  this.state.brickyard_max_level
                    ? ""
                    : this.state.brickyard_level + 1}
                </span>
              </td>
              <td>
                {this.state.brickyard_level + 1 >
                this.state.brickyard_max_level ? (
                  ""
                ) : this.state.brickyard_level_constructon_time > 60 ? (
                  <span>
                    {(this.state.brickyard_level_constructon_time / 60).toFixed(
                      2
                    )}
                  </span>
                ) : (
                  <span>
                    {(1 * this.state.brickyard_level_constructon_time).toFixed(
                      2
                    )}
                  </span>
                )}
                {this.state.brickyard_level + 1 > this.state.brickyard_max_level
                  ? ""
                  : this.state.brickyard_level_constructon_time > 60
                  ? " hours"
                  : " minutes"}
              </td>
              <td>
                {this.state.brickyard_level + 1 > this.state.brickyard_max_level
                  ? ""
                  : "Wood:"}{" "}
                <span>
                  {this.state.brickyard_level + 1 >
                  this.state.brickyard_max_level
                    ? ""
                    : this.state.brickyard_normal_price}
                </span>
                {this.state.brickyard_level + 1 > this.state.brickyard_max_level
                  ? ""
                  : "Brick:"}{" "}
                <span>
                  {this.state.brickyard_level + 1 >
                  this.state.brickyard_max_level
                    ? ""
                    : this.state.brickyard_normal_price}
                </span>
                {this.state.brickyard_level + 1 > this.state.brickyard_max_level
                  ? ""
                  : "Iron:"}{" "}
                <span>
                  {this.state.brickyard_level + 1 >
                  this.state.brickyard_max_level
                    ? ""
                    : this.state.brickyard_normal_price}
                </span>
                {this.state.brickyard_level + 1 > this.state.brickyard_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.brickyard_level + 1 >
                  this.state.brickyard_max_level
                    ? ""
                    : this.state.brickyard_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.brickyard_level + 1 > this.state.brickyard_max_level
                  ? ""
                  : "Stone:"}{" "}
                <span>
                  {this.state.brickyard_level + 1 >
                  this.state.brickyard_max_level
                    ? ""
                    : this.state.brickyard_normal_price * 3 * 0.05}
                </span>
                {this.state.brickyard_level + 1 > this.state.brickyard_max_level
                  ? ""
                  : "Metal:"}{" "}
                <span>
                  {this.state.brickyard_level + 1 >
                  this.state.brickyard_max_level
                    ? ""
                    : this.state.brickyard_normal_price * 3 * 0.05}
                </span>
                {this.state.brickyard_level + 1 > this.state.brickyard_max_level
                  ? ""
                  : "Wheat:"}{" "}
                <span>
                  {this.state.brickyard_level + 1 >
                  this.state.brickyard_max_level
                    ? ""
                    : this.state.brickyard_normal_price / 10}
                </span>
              </td>
              <td>
                {this.state.brickyard_level + 1 >
                this.state.brickyard_max_level ? (
                  "Maximum level reached"
                ) : (
                  <div>
                    <input
                      id={13}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onBaseSubmit(e)}
                      value="Improve with base resources"
                    />{" "}
                    <input
                      id={13}
                      className="improvebutton"
                      type="submit"
                      onClick={e => this.onRareSubmit(e)}
                      value="Improve with rare resources"
                    />
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default Palace;
