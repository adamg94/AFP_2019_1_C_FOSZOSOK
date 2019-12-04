import React from 'react'
import axios from 'axios'
import './sass/Login.sass'
import { getFromStorage, setInStorage } from './utils/storage'


class Login extends React.Component{
  
  constructor(props)
  {
    super(props)

    this.loginOrRegister = this.loginOrRegister.bind(this)
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
  loginOrRegister(e)
  {
    e.preventDefault()
    
    if(this.state.username.length < 5)
    {
      this.onChangeInfo("Username length can't be lower than five!")
      
    }
    
    else if(this.state.password.length < 1)
    {
      this.onChangeInfo("Password empty!")
    }
    else{

      let User = {
        username : this.state.username,
        password : this.state.password
      }
      axios.post("http://localhost:5000/users/", User)
      .then(response => {
        console.log(1)
        if(response.data.success)
        {
          console.log(2)
          if(response.data.exitCode === 1) //1- registered, 0-logined
          {
            console.log(3)
            User = {
              username : this.state.username,
              password : this.state.password
            }
            console.log(4)
            axios.post("http://localhost:5000/users/", User)
              .then(res => {
                console.log(5)
                if(res.data.exitCode === 0)
                {
                  console.log(6)
                  this.setState({
                    infoMessage : res.data.message,
                    username : res.data.username,
                    token : res.data.token
                  })
                  console.log(7)
                  console.log(res.data)
                  setInStorage('afp_falu', {token : res.data.token, username : res.data.username})
                }
                else{
                  console.log(8)
                  this.setState({
                    infoMessage : response.data.message,
                  })
                }
            
            })
          }
          else if(response.data.exitCode === 0)
          {
            console.log(9)
            this.setState({
              infoMessage : response.data.message,
              username : response.data.username,
              token : response.data.token
            })
            console.log(10)
            setInStorage('afp_falu', {token : response.data.token, username : response.data.username})
          }
          
           

        }
        else
        {
          this.setState({
            infoMessage : response.data.message
          })
        }
        
      })
    }
    
  }

  render()
  {
    return (
      <div>
          <aside>
            {this.state.infoMessage}
            <form onSubmit={this.loginOrRegister}>  
                <input required value={this.state.username} onChange={this.onChangeUsername} type="text" name="username" placeholder="username" />
                <input required value={this.state.password} onChange={this.onChangePassword} type="password" name="password" placeholder="password" />
                <input type="submit" value="Play" />
            </form>
          </aside>
          <section id="background">
            
          </section>
      </div>
    )
  }
}

export default Login