import React from "react";
import axios from "axios";
import "./App.css";

function Movie({ title, genres, rating, summary, poster }){
  return (
    <div>
      <img src={poster} alt={title} title={title} />
      <h3>{title} {rating}/10.0</h3>
      <ul>
        {genres.map((genre, index)=>(
        <li key={index}>{genre}</li>))}  
      </ul>
      <p>
        {summary}
      </p>
    </div>
  );

}

class App extends React.Component {
  state = {
    isLoading : true,
    movies: []
  };

  async componentDidMount(){
    const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    this.setState({movies:movies.data.data.movies, isLoading:false});
  }

  render() {
    const { isLoading, movies } = this.state;
    return(
      <div>
        {isLoading ? "Loading..." : movies.map(movie => (
        <Movie key={movie.id} title={movie.title} genres={movie.genres} rating={movie.rating} summary={movie.summary} poster={movie.medium_cover_image} />))}
      </div>
    );
  }
}
    
export default App;