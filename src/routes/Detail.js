import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const [loading, setLoading] = useState(true);

  const [info, setInfo] = useState([]);
  const {id} = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
      setInfo(json.data.movie);
      setLoading(false);
  };
  useEffect(()=>{
    getMovie();
  },[]);
  return (
  <div>
    {loading ? null : <div className={styles.detailsInfo}>
    <img className={styles.detailsImg} src={info.background_image_original} alt="detailsImg"/>
    <div className={styles.detailsContent}>
      <h2><a href={info.url}>{info.title_long}</a></h2>
       <p>Rating: {info.rating}</p>
       <p>{(info.description_intro).length > 1000 ? `${info.description_intro.slice(0,1000)}...` : info.description_intro}</p>
       
    </div>

   </div>}
  </div>
 );
}

export default Detail;