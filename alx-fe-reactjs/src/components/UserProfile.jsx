function UserProfile({ name, age, bio }) {
  return (
    <div style={{
      border: '1px solid gray',
      padding: '15px',
      margin: '15px',
      borderRadius: '5px'
    }}>
      <h2 style={{ color: 'blue' }}>{name}</h2>
      <p>Age: <span style={{ fontWeight: 'bold' }}>{age}</span></p>
      <p style={{ fontStyle: 'italic' }}>Bio: {bio}</p>
    </div>
  );
}
export default UserProfile;
