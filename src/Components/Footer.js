import React from "react";
import '../CSS/Footer.css'

class Footer extends React.Component {
    render() {
        return (
            <footer style={{
                color:"#FFFFFF", // Pure white for subheading
                marginTop: '70px', // Adjusted margin
                fontFamily: 'Newslab, georgia, Bakersville',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}>
                &copy; 2023 Shatbot Co.
            </footer>
        );
    }
}

export default Footer;