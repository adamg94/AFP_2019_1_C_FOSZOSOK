import React from 'react'
import axios from 'axios'
import './sass/Village.sass'
import { getFromStorage } from './utils/storage'


class Lumberyard extends React.Component{
  
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
      session rendszer teszteléséhez volt itt, de lehet még szükséges.
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
    }*/
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
          <div>Lumberyard</div>
          <span>Level 1</span>
          <div>Lumberyard gives you basic wood resource</div>
          <div>Current income: <span>80</span></div>
          <div>Next level income: <span>160</span></div>
      </section>

    )
  }
}

export default Lumberyard