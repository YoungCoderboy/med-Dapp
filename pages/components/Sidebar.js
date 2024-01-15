import React from 'react'
import logo from './logo.svg'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { social, links } from './data'
import { useGlobalContext } from './context'

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, userSignOut } = useGlobalContext()
  return (
    <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
      <div className="sidebar-header">
        <h2>Med Easz</h2>
        <button type="button" className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      <ul className="links">
        {links.map((it) => {
          const { id, url, text, icon } = it

          return (
            <li key={id}>
              <a href={url}>
                {icon}
                {text}
              </a>
              <br />
            </li>
          )
        })}
      </ul>
      <Link to="/">
        <button type="submit" className="btn logout-btn" onClick={userSignOut}>
          Logout
        </button>
      </Link>
      <ul className="social-icons">
        {social.map((it) => {
          const { id, url, icon } = it
          return (
            <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
