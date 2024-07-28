import React from 'react';
import Scrollspy from 'react-scrollspy';
import '../../CSS/Heading.css';
import image from "../../Resources/MacLogo.png";
import "../../CSS/About.css"


const headingStyle = {
    backgroundColor: "#4F42B5",
    padding: "0.1vh",
    boxShadow: '1px 7px 9px #0f0f0f',
    marginBottom: '1rem',
    textAlign: "center",
    position: "absolute",
    width: "100%",
    top: 0
};


class Heading extends React.Component {
    constructor() {
        super();
        this.state=
            {
                matches: window.matchMedia("(min-width: 680px)").matches
            }
    }

    componentDidMount() {
        const handler = e => this.setState({matches: e.matches});
        window.matchMedia("(min-width: 680px)").addEventListener('change', handler);
    }

    render() {
        return (
            <>
                {this.state.matches && (
                    <div>
                        <h1 style={{
                            color: "#FFFFFF", // Pure white for better contrast
                            marginTop: '2%',
                            fontSize: '9.5vh',
                            fontFamily: 'Newslab, georgia, Bakersville',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                        }}>Mac GPT</h1>
                        <h2 style={{
                            color:"#FFFFFF", // Pure white for subheading
                            marginTop: '1%', // Adjusted margin
                            fontSize: '3vh',
                            fontFamily: 'Newslab, georgia, Bakersville',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            fontWeight: 'bold'
                        }}>Your AI assistant for all things Macalester</h2>
                    </div>
                )}
                {!this.state.matches &&(
                    <div>
                        <h1 style={{
                            color: "#FFFFFF", // Pure white for better contrast
                            marginTop: '2%',
                            fontSize: '8.5vh',
                            fontFamily: 'Newslab, georgia, Bakersville',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                        }}>Mac GPT</h1>
                        <h2 style={{
                            color:"#FFFFFF", // Pure white for subheading
                            marginTop: '-9%', // Adjusted margin
                            fontSize: '4vw',
                            fontFamily: 'Newslab, georgia, Bakersville',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            fontWeight: 'bold'
                        }}>Your AI assistant for all</h2>
                        <h2 style={{
                            color:"#FFFFFF", // Pure white for subheading
                            marginTop: '-3%', // Adjusted margin
                            fontSize: '4vw',
                            fontFamily: 'Newslab, georgia, Bakersville',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            fontWeight: 'bold'
                        }}>things Macalester</h2>
                    </div>
                )}
                <div className={"separator"} />
            </>
        );
    }
}

export default Heading;