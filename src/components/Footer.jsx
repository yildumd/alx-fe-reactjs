function Footer() {
  return (
    <footer style={{
      backgroundColor: '#333',
      color: 'white',
      textAlign: 'center',
      padding: '15px',
      marginTop: '20px',
      borderRadius: '8px'
    }}>
      <p>© {new Date().getFullYear()} My Travel Journal</p>
    </footer>
  )
}
export default Footer
