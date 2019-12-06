import React from 'react'
import axios from 'axios'
import './sass/Village.sass'
import { getFromStorage } from './utils/storage'
//import { BrowserRouter as Link} from "react-router-dom"

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
      token : ''
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
        .then(res => console.log(res))
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

      <div>falu</div>
    )
  }
}

export default Village