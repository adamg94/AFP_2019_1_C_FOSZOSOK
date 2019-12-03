import React from 'react'
import axios from 'axios'
import './sass/Login.sass'


class Login extends React.Component{
  
  constructor(props)
  {
    super(props)

    this.loginOrRegister = this.loginOrRegister.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.state = {
      username : '',
      password : '',
      infoMessage : ''
    }

  }

  componentDidMount() 
  {

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
    //ellenőrizzük egy egyszerű getkéréssel, hogy él-e a client-server kommunikáció.
    axios.get("http://localhost:5000/users/")
      .then(response => {
        console.log(response)
        this.setState({
          infoMessage : response.data[0].username
        })
      })
  }

  render()
  {
    return (
      <div>
          <aside>
            <form onSubmit={this.loginOrRegister}>  
                <input value={this.state.username} onChange={this.onChangeUsername} type="text" name="username" placeholder="username" />
                <input value={this.state.password} onChange={this.onChangePassword} type="password" name="password" placeholder="password" />
                <input type="submit" value="Play" />
            </form>
          </aside>
          <section id="background">
            <p id="info">{this.state.infoMessage}</p>
          </section>
      </div>
    )
  }
}

export default Login