   function Services() {

    const listStyle = {listStyle: 'none'}

     return (
       <div style={{ padding: '20px' }}>
         <h1>Our Services</h1>
         <ul>
           <li style={listStyle}>Technology Consulting</li>
           <li style={listStyle}>Market Analysis</li>
           <li style={listStyle}>Product Development</li>
         </ul>
       </div>
     );
   }

   export default Services;