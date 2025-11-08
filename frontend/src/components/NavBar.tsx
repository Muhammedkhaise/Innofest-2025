import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(){
  return (
    <nav className="nav container">
      <div><Link to="/">Innofest</Link></div>
      <div>
        <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link> | <Link to="/admin">Admin</Link>
      </div>
    </nav>
  )
}
