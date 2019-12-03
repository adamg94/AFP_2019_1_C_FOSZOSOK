import React from 'react'
import './sass/Login.sass'


function Login() {
  return (
      <div>
          <aside>
            <form>  
                <input type="text" name="username" placeholder="username" />
                <input type="password" name="password" placeholder="password" />
                <input type="submit" value="Play" />
            </form>
          </aside>
          <section id="background">
            <p>itt majd egy kép lesz valamikor</p>
          </section>
      </div>
  )
}

export default Login