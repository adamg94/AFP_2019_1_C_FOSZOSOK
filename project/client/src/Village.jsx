import React from 'react'
import axios from 'axios'
import './sass/Village.sass'
import { getFromStorage, setInStorage } from './utils/storage'
import { BrowserRouter as Link} from "react-router-dom"

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
    const obj = getFromStorage('afp_falu');
    if(obj && obj.username && obj.token)
    {
      const data = {
        token : obj.token,
        username : obj.username
      }
      axios.post("http://localhost:5000/users/verify", data)
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
      <div>
          <nav>
              <ul>
                  <li><Link to="/palace">Palace</Link></li>
                  <li><Link to="/merch">Merch</Link></li>
                  <li><Link to="/merchworkshop">Merch Workshop</Link></li>
                  <li><Link to="/temple">Temple</Link></li>
                  <li><Link to="/wall">Wall</Link></li>
                  <li><Link to="/warehouse">Warehouse</Link></li>
                  <li><Link to="/hideout">Hide-out</Link></li>
                  <li><Link to="/metalfurnace">Metal Furnace</Link></li>
                  <li><Link to="/mill">Mill</Link></li>
                  <li><Link to="/wheatfield">Wheat Field</Link></li>
                  <li><Link to="/ironmine">Iron Mine</Link></li>
                  <li><Link to="/lumberyard">Lumber Yard</Link></li>
                  <li><Link to="/brickyard">Brick Yard</Link></li>

              </ul>
          </nav>
      </div>
    )
  }
}

export default Village