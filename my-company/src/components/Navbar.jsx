import { Link } from "react-router-dom";

export default function Navbar() {
  const navStyle = {
    backgroundColor: 'hsl(0, 0%, 20%)',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    borderRadius: "0.7rem",
    width: '650px',
    margin: '0 auto'
  };

  const linkStyle = {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'white',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/services" style={linkStyle}>Services</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
    </nav>
  );
}