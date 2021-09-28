import React, { Component } from 'react'
import Footer from '../../Parts/Footer/Footer'
import CenteredHero from '../../Parts/Heros/CenteredHero'
import Navbar from '../../Parts/Navbar/Navbar'



export default class Landing extends Component {
    render() {
        return (
            <>
              <Navbar/>
              <CenteredHero/>
              <Footer/>  
            </>
        )
    }
}
