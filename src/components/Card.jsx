import React, { useState } from "react";
import { connect } from "react-redux";
import { FaHeart, FaThumbsDown } from "react-icons/fa";
import Button from '@mui/material/Button';


const Card = props => {
    const { movie = {}, deleteMovie = () => { } } = props;
    const {
        id,
        title,
        category,
        thumbnail,
        likes,
        dislikes,
    } = movie;
//like and deslike
    const [isLiked, updateLike] = useState(false);
    const [like, setLike] = useState(likes);
    const [dislike, setDislike] = useState(dislikes);

    const handleLike = () => {
        let currentLikedBands = props.likedBands;
        if (!isLiked) {
            setLike(prevCount => prevCount + 1);
            {
                dislike === 0 ?
                    setDislike(prevCount => prevCount)
                    :
                    setDislike(prevCount => prevCount - 1)
            }
            updateLike(true);

            if (!currentLikedBands.includes(title))
                props.updateLikedBands([...currentLikedBands, title]);
        } else {
            setDislike(prevCount => prevCount + 1);
            {
                like === 0 ?
                    setLike(prevCount => prevCount)
                    :
                    setLike(prevCount => prevCount - 1)
            }
            updateLike(false);

            if (currentLikedBands.includes(title))
                props.updateLikedBands(currentLikedBands.filter(band => band !== title));
        }
    };

    return (
        <div className="col-lg-4 col-md-5 col-sm-8">
            <div className="card movie-card text-center my-3 mx-3 p-2">
                <h5 className="card-title pt-2">{title}</h5>
                <img
                    className="card-img-top img-responsive"
                    src={thumbnail}
                    alt={title}
                />
                <div className="card-body">
                    <p className="card-text"><strong>Category</strong>: {category}</p>
                    <p>
                        <button className={isLiked ? "active-btn btn" : "btn"} onClick={handleLike}>
                            <FaHeart /> {like}
                        </button>
                        <button className={!isLiked ? "active-bttn btn" : "btn"} onClick={handleLike}>
                            <FaThumbsDown /> {dislike}
                        </button>
                    </p>
                    <div className="text-center">
                        <Button variant="outlined" color="error" onClick={() => deleteMovie(id)} >Delete</Button>
                    </div>
                </div>
            </div>

        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        deleteMovie: id => {
            dispatch({
                type: "DELETE_MOVIE",
                id: id
            });
        },
    };
};

const MovieCard = connect(null, mapDispatchToProps)(Card);

export default MovieCard;