import React from 'react'
import axios from 'axios'
import './sass/Navigation.sass'
import { getFromStorage, setInStorage } from './utils/storage'
import { BrowserRouter as Link} from "react-router-dom"

class Navigation extends React.Component{
  
  constructor(props)
  {
    super(props)


  }

  componentDidMount() 
  {}
  
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
                  <li><Link to="/statue">Statue</Link></li>
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

export default Navigation