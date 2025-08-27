import {  NavLink } from "react-router-dom"

export const NavBar = () => {
  return (
    <nav className="bg-black p-2">
      <ul className="flex gap-4 text-white">
        <li>
          <NavLink to="/">login</NavLink>
        </li>
        <li>
          <NavLink to="/mozo">Mozo</NavLink>
        </li>
        <li>
          <NavLink to="/admin">Admin</NavLink>
        </li>
      </ul>
    </nav>
  )
}
