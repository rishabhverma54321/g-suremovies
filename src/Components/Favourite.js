import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {movies} from './getmovies'
export default class Favourite extends Component {
    constructor() {
            super();
            this.state= {
            gener :[],
            generdefault:"All geners",
            movie:[],
            searchvalue:"",
            limit:5,
            curpage:1
            };
        };

  componentDidMount(){
         let data = JSON.parse(localStorage.getItem("fav-movie")||"[]")
         let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                         27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
         
         let temp = [];
         data.forEach((movieObj)=>{
          if(!temp.includes(genreids[movieObj.genre_ids[0]])){
              temp.push(genreids[movieObj.genre_ids[0]] )
                }
            })
            temp.unshift("All geners")
              this.setState({
             gener:[...temp],
             movie:[...data]
             
          });
        
         console.log("here is the datqa");
        }

 handlecall=(gener)=>{
     this.setState({
         generdefault:gener
     })
 }

 handledecending=()=>{
   let temp = this.state.movie;
     temp.sort(function(a,b){
         return b.popularity-a.popularity;
     })
     this.setState({
         movie:[...temp]
     })
 }

 handleaccending=()=>{
    let temp = this.state.movie;
    temp.sort(function(a,b){
        return a.popularity-b.popularity;
    })
    this.setState({
        movie:[...temp]
    })
 }

 handleaccendingrating=()=>{
    let temp = this.state.movie;
      temp.sort(function(a,b){
          return b.vote_average-a.vote_average;
      })
      this.setState({
          movie:[...temp]
      })
  }
 
  handledecendingrating=()=>{
     let temp = this.state.movie;
     temp.sort(function(a,b){
         return a.vote_average-b.vote_average;
     })
     this.setState({
         movie:[...temp]
     })
  }

  handlepage=(e)=>{  
      this.setState({
          curpage:e
      })
  }

  handledelete=(id)=>{
   let newarr = [];
   newarr = this.state.movie.filter(e=>e.id!==id)
   this.setState({
       movie:[...newarr]
   })
   localStorage.setItem("fav-movie", JSON.stringify(newarr))
  }
     

    render() {
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}

           
        let filterarr = []; 

          
       if(this.state.searchvalue===""){
           filterarr=this.state.movie
       }else{
           filterarr=this.state.movie.filter((e)=>{
               let title = e.original_title.toLowerCase()
               return title.includes(this.state.searchvalue.toLowerCase())
           })
       }


        if(this.state.generdefault!=="All geners"){
            filterarr = this.state.movie.filter((e)=>genreids[e.genre_ids[0]]===this.state.generdefault)
        }
        // console.log(this.state.movie)

        let pagearr =[];
        let page = Math.ceil(filterarr.length/this.state.limit);
        for(let i=1; i<=page; i++){
          pagearr.push(i)
        }
        
        let si = (this.state.curpage-1)*this.state.limit
        let ei = si+this.state.limit
        filterarr =filterarr.slice(si,ei)
   
        return (
            < >
            <div className="fav-heading">
            <div className="back-button"><Link className="back-button" to="/" ><i class="fas fa-backward"></i>  Back</Link></div>
            <div style={{display:"block",}}>
            <h1 style={{textAlign:"center"}} >FAVOURITE MOVIES </h1>
            </div>
               <div className="fav-main">
                   <div className="row ">
                       <div className="col-lg-9 col-sm-12 fav-list">
                       <ul class="list-group">
                       {
                          this.state.gener.map((geners)=>(
                         this.state.generdefault === geners?
                        <li style={{background:"#3D56B2", color:"white", cursor:"pointer"}} className="list-group-item">{geners}</li>:
                        <li style={{backgroundColor:"white", color:"#3D56B2", cursor:"pointer"}} className="list-group-item" onClick={()=>this.handlecall(geners)}>{geners}</li>
                           ))
                        }

                        </ul>
                    </div>
                       <div className="col-lg-9 col-sm-12 " style={{overflow:"auto"}}>
                       <div className="fav-search input-group-text">
                       <input type="text" placeholder="search" className="col" value={this.state.searchvalue} onChange={(e)=>this.setState({searchvalue:e.target.value})}/>
                       <input type="number" placeholder="rating" className="col" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})} />  
                       </div> 
                       <div className="fav-table">
                       <table class="table">
                       <thead>
                            <tr style={{color:"white"}}>
                            <th scope="col">Title</th>
                            <th scope="col">Gener</th>
                            <th scope="col"><i onClick={this.handledecending} class="fas fa-sort-up"></i>Popularity<i  onClick={this.handleaccending} class="fas fa-sort-down"/></th>
                            <th scope="col"><i onClick={this.handledecendingrating} class="fas fa-sort-up"></i>Rating<i  onClick={this.handleaccendingrating} class="fas fa-sort-down"/></th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            filterarr.map(movieObj=>(
                                <tr style={{color:"white"}}>
                            <th scope="row"> <img style={{width:"80px"}} src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.original_title} />   {movieObj.original_title}</th>
                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                            <td>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average}</td>
                            <td>
                            <button type="button" class="btn btn-info" onClick={()=>this.handledelete(movieObj.id)}>Delete</button>
                            </td>
                            </tr>
                            ))
                        }
                        </tbody>
                        </table>
                       </div> 
                       <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    {/* <li class="page-item"><a class="page-link" href="#">Previous</a></li> */}
                                 {   pagearr.map((e)=>(
                                    <li class="page-item"><a class="page-link" onClick={()=>this.handlepage(e)} >{e}</a></li>
                                    ))}
                                    {/* <li class="page-item"><a class="page-link" href="#">Next</a></li> */}
                                </ul>
                        </nav>               
                       </div>
                   </div>
               </div>
            </div>
            </>
        )
    }
}

