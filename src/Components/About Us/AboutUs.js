import '../../CSS/About.css'
import React from "react";
import image from './aalyan.jpg'
import image2 from './salman.jpg'
import image3 from './tenzin.jpg'
import image4 from './haris.jpg'
import {IStackProps, Stack} from '@fluentui/react/lib/Stack';

class AboutUs extends React.Component
{
    constructor() {
        super();
        this.state =
            {
                matches: window.matchMedia("(min-width: 680px)").matches
            }
    }

    componentDidMount() {
        const handler = e => this.setState({matches: e.matches});
        window.matchMedia("(min-width: 680px)").addEventListener('change', handler);
    }

    render()
    {
        return (
            <>

                <div style={{textAlign: 'center'}}>
                    <h1 style={{color: "#444444",marginTop: '8vh', fontSize: '4vw', fontFamily: 'Newslab, georgia, Bakersville'}}>The Developers</h1>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <section id={"aalyan"} style={{textAlign: "center"}}>
                        <h1 style={{fontSize: '3vh', fontFamily: 'Newslab, georgia, Bakersville', color: '#444444'}}>Aalyan Mahmood</h1>
                        <img src={image} alt="aalyan" style={{marginLeft: '12%', borderRadius: '100%', width: '25vh', height: '25vh'}}/>
                        <h1 style={{fontSize: '2vh', fontFamily: 'Newslab, georgia, Bakersville', color: '#808080'}}>Front End Developer </h1>
                    </section>

                    <section id={"salman"} style={{textAlign: "center"}}>
                        <h1 style={{fontSize: '3vh', fontFamily: 'Newslab, georgia, Bakersville', color: '#444444'}}>Salman Ijaz</h1>
                        <img src={image2} alt="salman" style={{borderRadius: '100%', width: '25vh', height: '25vh'}}/>
                        <h1 style={{fontSize: '2vh', fontFamily: 'Newslab, georgia, Bakersville', color: '#808080'}}>Back End Developer </h1>
                    </section>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-evenly' }}>
                    <section id={"Tenzin"} style={{textAlign: "center"}}>
                        <h1 style={{fontSize: '3vh', fontFamily: 'Newslab, georgia, Bakersville', color: '#444444', marginRight: '-25%'}}>Tenzin Gyaltsen</h1>
                        <img src={image3} alt="tenzin" style={{marginLeft: '20%', borderRadius: '100%', width: '25vh', height: '25vh'}}/>
                        <h1 style={{fontSize: '2vh', fontFamily: 'Newslab, georgia, Bakersville', color: '#808080', marginLeft: '40%'}}>Full Stack Developer </h1>
                    </section>


                    <section id={"haris"} style={{textAlign: "center", marginLeft: '5%'}}>
                        <h1 style={{fontSize: '3vh', fontFamily: 'Newslab, georgia, Bakersville', color: '#444444', marginRight: '-5%'}}>Haris Ahmed</h1>
                        <img src={image4} alt="haris" style={{marginLeft: '4%', borderRadius: '100%', width: '25vh', height: '25vh'}}/>
                        <h1 style={{fontSize: '2vh', fontFamily: 'Newslab, georgia, Bakersville', color: '#808080'}}>Project Manager </h1>
                    </section>
                </div>
                <div className="separator" />
            </>
        );
    }

}

export default AboutUs;