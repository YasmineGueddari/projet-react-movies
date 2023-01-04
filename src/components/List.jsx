import React, { useState } from "react";
import Card from "./Card.jsx";
import { connect } from "react-redux";

import Checkbox from '@mui/material/Checkbox';
import ReactPaginate from "react-paginate";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const List = ({ list, titleSearched }) => {
  //FOR THE PAGINATION
  const [pageNumber, setPageNumber] = useState(0);
  const moviesPerPage = 6;
  const pagesVisited = pageNumber * moviesPerPage;
  const pageCount = Math.ceil(list.length / moviesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // FILTER BY CATEGORY
  const [filter, setFilter] = useState(new Set());
  const filterCheck = (value) => {
    if (filter.has(value)) {
      setFilter(prevFilter => {
        const newSetFilter = new Set(prevFilter);
        newSetFilter.delete(value);
        return newSetFilter;
      });
    } else {
      setFilter(prevFilter => {
        const newSetFilter = new Set(prevFilter);
        newSetFilter.add(value);
        return newSetFilter;
      });
    }
  }
  return (
    <main className="main-content">
      {/* FILTER */}
      <form className="filter-form">
        <div className="checkbox-select">
          <Checkbox {...label} selected={filter.has("Comedy")} data-testid="cheking" onClick={() => filterCheck("Comedy")} />

          <span class="label info">Comedy</span>
          <Checkbox {...label} selected={filter.has("Animation")} onClick={() => filterCheck("Animation")} />
          <span class="label info">Anime</span>
          <Checkbox {...label} selected={filter.has("Thriller")} onClick={() => filterCheck("Thriller")} />
          <span class="label info">Thriller</span>
          <Checkbox {...label} selected={filter.has("Drame")} onClick={() => filterCheck("Drame")} />
          <span class="label info">Drama</span>

        </div>
      </form>
      {/* MOVIES */}
      <div className="movies">
        <div className="row">

          {list
            // FILTER BY MOVIEE TITLE
            .filter(
              el =>
                el.title
                  .toLocaleLowerCase()
                  .includes(titleSearched.toLocaleLowerCase())
            )
            // FILTER BY CATEGORY 
            .filter(el => {
              if (filter.size > 0 && !filter.has(el.category))
                return false;
              return true;
            })

            //THIS SLICE FOR THE PAGINATION
            .slice(pagesVisited, pagesVisited + moviesPerPage)

            .map((el) => {
              return <Card key={el.id} movie={el} />;
            })

          }

        </div >
        <div className="Containerrr">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = state => {
  return {
    list: state.movies,
    titleSearched: state.titleFilter
  };
};
const MovieListContainer = connect(mapStateToProps)(
  List
);

export default MovieListContainer;