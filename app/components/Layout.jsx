import React, { PropTypes } from 'react';
import { Link } from 'react-router';


function nav(text, to) {
  return (
    <Link to={to}>
      {
        ({ isActive, href, onClick }) => (
          <li className={`nav-item ${isActive ? 'active' : ''}`}>
            <a className="nav-link" onClick={onClick} href={href}>
              {text}
            </a>
          </li>
        )
      }
    </Link>
  );
}
const Layout = ({ children }) => (
  <div style={{ paddingTop: '56px' }}>
    <nav
      className="navbar navbar-toggleable-md navbar-inverse bg-primary fixed-top"
    >
      <Link className="navbar-brand" to="/">Hacker News</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {nav('News', '/newstories')}
          {nav('Best', '/beststories')}
          {nav('Ask', '/askstories')}
          {nav('Show', '/showstories')}
          {nav('Job', '/jobstories')}
        </ul>
      </div>
    </nav>
    <br />
    <div className="container-fluid">
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
