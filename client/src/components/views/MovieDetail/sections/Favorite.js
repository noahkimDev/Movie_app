import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "antd";

function Favorite(props) {
  const { movieId, userFrom, movieInfo } = props;

  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.backdrop_path;
  const movieRunTime = movieInfo.runtime;
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const variables = { userFrom, movieId, movieTitle, movieRunTime, moviePost };
  //!같다
  // const variables = { userFrom:userFrom, movieId:movieId,movieTitle:movieTitle,movieRunTime,moviePost };

  useEffect(() => {
    // userFrom : 로그인 한 user가 누구인지
    // movieId : user가 보고 있는 영화가 무엇인지
    // useEffect: 해당 컴포넌트(Favorite)가 렌더링 되자마자 해야할 일
    // 얼마나 많은 사람이 이 영화를 Favorite 리스트에 넣었는지 몽고db로부터 숫자 data 얻기
    // db에 요청을 보낼 때는 db에서 기준이 될 수 있는 데이터를 보내줘야 해당 기준을 가지고 데이터를 가져옴
    // variables
    axios
      .post("/api/favorite/favoriteNumber", variables) //
      .then((res) => {
        console.log(res.data, "favoriteNumber");
        if (res.data.success) {
          setFavoriteNumber(res.data.favoriteNumber);
        } else {
          alert(`숫자 정보를 가져오는데 실패했습니다`);
        }
      })
      .catch((err) => console.log(err));

    axios
      .post("/api/favorite/favorited", variables) //
      .then((res) => {
        console.log(res.data, "favorited");
        if (res.data.success) {
          setFavorited(res.data.favorited);
        } else {
          alert(`정보를 가져오는데 실패했습니다`);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  
  const onClickFavorite = () => {
    // 이미 favorite list에 추가되어 있는지 확인

    //! 이미 추가했다면 => remove
    if (Favorited) {
      axios //
        .post("/api/favorite/removeFromFavorite", variables)
        .then((res) => {
          console.log(res.data, "romoveFromFavorite");
          if (res.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Favorite list에서 삭제 실패");
          }
        });
      //! 추가하지않았다면
    } else {
      axios //
        .post("/api/favorite/addToFavorite", variables)
        .then((res) => {
          console.log(res.data, "addToFavorite");
          if (res.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
            setFavorited(!Favorited);
          } else {
            alert("Favorite list에 추가 실패");
          }
        });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {Favorited
          ? `already favorite ${FavoriteNumber}`
          : `add to favorite ${FavoriteNumber}`}{" "}
      </Button>
    </div>
  );
}

export default Favorite;
