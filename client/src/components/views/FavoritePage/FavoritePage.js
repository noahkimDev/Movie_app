/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "./favorite.css";
import axios from "axios";
import { Popover, Button } from "antd";
import { IMAGE_BASE_URL } from "../../config";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);
  //

  useEffect(() => {
    fetchFavoredMovie();
  }, []);
  //
  const fetchFavoredMovie = () => {
    axios
      .post("/api/favorite/getFavoredMovie", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data);
          setFavorites(res.data.myFavorites);
        } else {
          alert(`영화정보를 가져오는데 실패했습니다`);
        }
      });
  };

  const renderCard = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w300${favorite.moviePost}`} />
        ) : (
          "no image"
        )}
      </div>
    );

    const onClickDelete = (movieId, userFrom) => {
      axios
        .post("/api/favorite/removeFromFavorite", { movieId, userFrom }) //
        .then((res) => {
          if (res.data.success) {
            fetchFavoredMovie();
          } else {
            alert(`Favorite 영화를 삭제하는데 실패하였습니다`);
          }
        });
    };

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} mins</td>
        <td>
          <Button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            Remove
          </Button>
        </td>
      </tr>
    );
  });
  //
  //
  return (
    <div style={{ margin: "0", paddingTop: "90px", width: "100%" }}>
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <h2>Favorite Movies</h2>
        <hr />

        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Movie RunTime</th>
              <th>Remove from favorites</th>
            </tr>
          </thead>
          <tbody>
            {renderCard}
            {/* {Favorites.map((favorite, index) => (
              <tr key={index}>
                <Popover content={content} title={`${favorite.movieTitle}`}>
                  <td>{favorite.movieTitle}</td>
                </Popover>
                <td>{favorite.movieRunTime} mins</td>
                <td>
                  <button>Remove</button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FavoritePage;
