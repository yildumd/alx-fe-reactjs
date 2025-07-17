const UserProfile = (props) => {
    return (
        <div style={{ 
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            margin: '10px',
            maxWidth: '300px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ 
                color: '#2c3e50',
                borderBottom: '1px solid #eee',
                paddingBottom: '5px'
            }}>{props.name}</h2>
            <p style={{ margin: '8px 0' }}>
                Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>
            </p>
            <p style={{ 
                fontStyle: 'italic',
                color: '#7f8c8d'
            }}>{props.bio}</p>
        </div>
    );
};

export default UserProfile;
