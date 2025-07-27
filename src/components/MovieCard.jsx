import React from 'react'

const MovieCard = ({ movie: { title, id, poster_path, release_path, original_language, vote_average } }) => {
    return (
        <div className='movie-card'>
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
                alt={title}
            />

            <div className='mt-4'>
                <h3>{title}</h3>

                <div className='content'>
                    <div className='rating'>
                        <img src='star.svg' alt='star icon' />
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;