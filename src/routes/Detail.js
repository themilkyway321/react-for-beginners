import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const [info, setInfo] = useState([]);
  const {id} = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
      setInfo(json.data.movie);
      console.log(info);
  };
  useEffect(()=>{
    getMovie();
  },[]);
  return (
  <div>
    <h1>Details</h1>
    <h2>{info.title}</h2>
     <p>{info.description_full}</p>
    </div>
 );
}

export default Detail;