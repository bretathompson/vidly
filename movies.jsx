import React, {Component} from 'react';
import Like from '../components/common/like';
import ListGroup from '../components/common/listGroup';
import Pagination from '../components/common/pagination';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import { genres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: {path: 'title', order: 'asc'}
    };

    componentDidMount() {
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
        this.setState({movies: getMovies(), genres });
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleSort = sortColumn => {        
        this.setState({sortColumn });
    };

    getPageData = () => {
        const { pageSize, currentPage, sortColumn, selectedGenre, movies: allMovies} = this.state;

        const filtered = selectedGenre && selectedGenre._id 
            ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies }
    };

    render ()  {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn} = this.state;

        if (count === 0) return <p>There are mo movies in the database.</p>;

        const {totalCount, data: movies} = this.getPageData();

        return (
            <div className='row'>
                <div className="col-3">
                <ListGroup 
                    items={this.state.genres} 
                    selectedItem={this.state.selectedGenre}
                    onItemSelect={this.handleGenreSelect} 
                />

                </div>
                <div className="col">
                <p>Showing {totalCount }  movies in the database.</p>
                <MoviesTable 
                    movies={movies} 
                    sortColumn={sortColumn}
                    onLike={this.handleLike} 
                    onDelete={this.handleDelete}
                    onSort={this.handlePageChange}
                />
                <Pagination 
                    itemsCount={totalCount } 
                    pageSize={pageSize} 
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange} 
                />
                </div>                
            </div>
        
        );
    }
}

export default Movies;