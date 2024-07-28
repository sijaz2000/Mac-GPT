import React from "react";
import './App.css';
import Heading from "./Components/Heading/Heading.js";
import Messaging from "./Components/MessageInterface/Messaging.js";
import Footer from "./Components/Footer.js";
import History from "./Components/PastChats/History.js"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: window.matchMedia("(min-width: 680px)").matches,
            showContent: false
        };
    }

    componentDidMount() {
        const handler = e => this.setState({matches: e.matches});
        window.matchMedia("(min-width: 680px)").addEventListener('change', handler);
        setTimeout(() => {
            this.setState({ showContent: true });
        }, 1000);
    }

    render() {
        const contentClass = this.state.showContent ? 'fade-in' : 'hidden'; // Use 'hidden' or an empty string if you prefer
        return (
            <>
                <div className="slide-in" id="slide-in-blue"></div>
                <div className="slide-in" id="slide-in-orange"></div>
                <div className={contentClass}>
                    {this.state.matches && (
                        <>
                            <Heading />
                            <Messaging userNow={this.props.userNow}/>
                            {/*<AboutUs />*/}
                        </>
                    )}

                    {!this.state.matches && (
                        <>
                            <Heading />
                            <Messaging userNow={this.props.userNow} />
                        </>
                    )}
                    <Footer />
                </div>
            </>
        );
    }
}

export default App;
