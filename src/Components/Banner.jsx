import React, { Component } from 'react'
import bannerimg from '../Images/popcorn.svg'
import '../App.css'
import { Link } from 'react-router-dom';

class Banner extends Component {
    render () {
        return (
            <>
              <div className='banner-box'>
                  <div className='banner-img'>
                  <img  src={bannerimg} alt="" />
                  </div>
                  <div className='banner-text'>
                      <h1 className="famous-font">Welcome To <br /> M-Sur Movies</h1>
                      <h3> A place where you searching ends</h3>
                      <Link to="/favourite"><button className='banner-button famous-font '> <i class="fas fa-search"></i>   Search </button></Link>
                      </div>
              </div>
            </>
        )
    }
}

export default Banner;