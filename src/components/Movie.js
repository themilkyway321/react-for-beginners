import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styles from "./Movie.module.css";
function Movie({id,coverImg, title, summary, genres}){
  return (<Link to={`/movie/${id}`} className={styles.mainContents}>
  
  <img className={styles.mainImg} src={coverImg} alt={title} />
  <div className={styles.mainDetail}>
    <h2 className={styles.mainTitle}>{title}</h2>
    <ul className={styles.mainGenres}>
      {genres.map((g) =>( <li key={g}>- {g}</li>))}
    </ul>
  </div>
</Link>);
};

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movie;