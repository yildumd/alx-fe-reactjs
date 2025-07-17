function UserProfile({ name, age, bio }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '15px',
      margin: '10px',
      borderRadius: '8px'
    }}>
      <h2 style={{ color: 'navy' }}>{name}</h2>
      <p>Age: {age}</p>
      <p>Bio: {bio}</p>
    </div>
  );
}
export default UserProfile;
