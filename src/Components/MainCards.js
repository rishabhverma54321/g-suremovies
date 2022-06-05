import React, { Component } from "react";
// import {movies} from './getmovies'
import axios, { Axios } from "axios";
// import {Link} from 'react-dom'
import "../App.css";

export default class MovieCards extends Component {
  constructor() {
    super();
    this.state = {
      prr: [1],
      currpage: 1,
      movies: [],
      favourite:[]
    };
  }
  async componentDidMount() {
    console.log("mounting done");
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currpage}`
    );
    let data = res.data;
    console.log(data);
    this.setState({
      movies: [...data.results],
    });
  }

  //   async componentDidMount() {
  //     console.log("mounting Starts form here");
  //     let url = 'https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page'
  //    await fetch(url).then(res=>{
  //     res.json()
  //   .then(res=>{
  //     console.log(res)
  //   })})
  // }

  changemovies = async () => {
    console.log("mounting done");
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currpage} `
    );
    let data = res.data;
    console.log(data);
    this.setState({
      movies: [...data.results],
    });
  };

  pagination = () => {
    let temp = [];
    for (let i = 1; i <= this.state.prr.length + 1; i++) {
      temp.push(i);
    }
    this.setState(
      {
        prr: [...temp],
        currpage: this.state.currpage + 1,
      },
      this.changemovies
    );
  };

  paginationLeft = () => {
    if (this.state.currpage != 1) {
      this.setState({
        currpage: this.state.currpage - 1,
      }, this.changemovies
      );
    }
  };

  currpage = (value) => {
    if (value != this.state.currpage) {
      this.setState({
        currpage: value
      }, this.changemovies)
    }

  }

  handleFavourite=(movie)=>{
    let favmovies = JSON.parse(localStorage.getItem("fav-movie")|| "[]");
    if(this.state.favourite.includes(movie.id)){
      favmovies = favmovies.filter((m)=>m.id!==movie.id )
    }else
    {
      favmovies.push(movie)
    }
    localStorage.setItem("fav-movie", JSON.stringify(favmovies))


    this.handleFavouritestate(); 
    console.log(this.state.favourite)
    
  }

  handleFavouritestate=()=>{
    let favmovies = JSON.parse(localStorage.getItem("fav-movie")|| "[]");
    let temp = favmovies.map(movie=>movie.id) 
    this.setState ({
      favourite:[...temp]
    })
  }

  render() {

    return (
      <>
        {this.state.movies.length === 0 ? (
          <div className=" mt-5 spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> ) : 
          ( <div>
            <div className="text-center fs-1 mt-4">
              <strong>Trending</strong>
            </div>
            <div className="movie-card">
              {this.state.movies.map((movieobj) => (
                <div className="card mt-5 d-flex movies-card">
                  <div>
                    <img className="card-img"  src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} alt={movieobj.original_title} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title movie-card-title">{movieobj.original_title.substring(0,100)}</h5>
                    <p className="card-text movie-card-paragraph"> {movieobj.overview.substring(0,200)+"....."} </p>
                    <div className="movie-card-buttons">
                    <button className="movie-card-button" onClick={()=>this.handleFavourite(movieobj)}><a style={{letterSpacing:"1px",fontSize:"18px"}}>{this.state.favourite.includes(movieobj.id)?"REMOVE":"FAVOURITE"}</a></button>
                    <button className="movie-card-button"><a style={{letterSpacing:"1px", fontSize:"18px"}}>Download</a></button>
                    </div>
                  </div>
                </div> ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100px",
                alignItems: "center",
              }}
            >
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" onClick={this.paginationLeft}>
                      Previous
                    </a>
                  </li>

                  {this.state.prr.map((value) => (
                    <li class="page-item">
                      <a class="page-link" onClick={() => this.currpage(value)}>
                        {value}
                      </a>
                    </li>
                  ))}
                  <li class="page-item">
                    <a class="page-link" href="#" onClick={this.pagination}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
