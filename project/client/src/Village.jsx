import React from 'react'
import axios from 'axios'
import './sass/Village.sass'
import { getFromStorage } from './utils/storage'
import { Link } from "react-router-dom"

class Village extends React.Component{
  
  constructor(props)
  {
    super(props)

    
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeInfo = this.onChangeInfo.bind(this)
    this.onChangeToken = this.onChangeToken.bind(this)

    this.state = {
      username : '',
      password : '',
      infoMessage : '',
      token : '',


      wood: 0,
      brick: 0,
      iron: 0,
      copper: 0,
      silver: 0,
      gold: 0
    }

  }

  componentDidMount() 
  {
    /*
      session rendszer teszteléséhez volt itt, de lehet még szükséges.*/
    const obj = getFromStorage('afp_falu');
    if(obj && obj.username && obj.token)
    {
      const data = {
        token : obj.token,
        username : obj.username
      }
      axios.post("http://localhost:5000/village/", data)
        .then(res =>{

          this.setState({
            wood : parseInt(res.data.village.buildings.warehouse.wood),
            brick : parseInt(res.data.village.buildings.warehouse.brick),
            iron : parseInt(res.data.village.buildings.warehouse.iron),
            copper : parseInt(res.data.village.buildings.warehouse.copper),
            silver : parseInt(res.data.village.buildings.warehouse.silver),
            gold : parseInt(res.data.village.buildings.warehouse.gold)
          })

          
        })
    }
  }
  onChangeInfo(msg)
  {
    this.setState({
      infoMessage : ''
    })
    this.setState({
      infoMessage : <p id="info">Info: <span>{msg}</span></p>
    })
  }
  onChangeToken(e){
    this.setState({
      token : e.target.value
    })
  }
  onChangeUsername(e)
  {
    this.setState({
      username : e.target.value
    })
  }
  onChangePassword(e)
  {
    this.setState({
      password : e.target.value
    })
  }

  render()
  {
    return (
      <section>
      <div id="grass">
        <Link to="/lumberyard"><div  id="lumberyard"></div></Link>
      </div>
      <aside id="resource-info">
        <ul>
          <li>
            Wood<span>{this.state.wood}</span>
          </li>
          <li>
          Brick<span>{this.state.brick}</span>
          </li>
          <li>
          Iron<span>{this.state.iron}</span>
          </li>
          <li>
          Copper<span>{this.state.copper}</span>
          </li>
          <li>
          Silver<span>{this.state.silver}</span>
          </li>
          <li>
          Gold<span>{this.state.gold}</span>
          </li>
        </ul>
      </aside>
      <aside id="resource-info2">
        <ul>
          <li>
            Wood<span>80</span>/ hr
          </li>
          <li>
          Brick<span>80</span>/ hr
          </li>
          <li>
          Iron<span>80</span>/ hr
          </li>
        </ul>
      </aside>
      </section>

    )
  }
}

export default Village