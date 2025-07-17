import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const buttonStyle = {
    padding: '8px 16px',
    margin: '0 5px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <div style={{
      textAlign: 'center',
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h2>Counter</h2>
      <p style={{ fontSize: '24px' }}>Count: {count}</p>
      <div>
        <button 
          style={buttonStyle}
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button 
          style={{...buttonStyle, backgroundColor: '#e74c3c'}}
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>
        <button 
          style={{...buttonStyle, backgroundColor: '#2c3e50'}}
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
