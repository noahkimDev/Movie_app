/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainImage from "./Sections/MainImage";
import GridCards from "../commons/GridCard";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../config";
import { Row } from "antd";

function LandingPage() {
  const navigate = useNavigate();
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  // LandingPage가 랜딩되자마자 실행되는 코드
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    axios
      .get(endpoint) //
      .then((res) => {
        console.log(res.data.results, res);
        setMovies([...Movies, ...res.data.results]);
        setMainMovieImage(res.data.results[0]);
        setCurrentPage(res.data.page + 1);
      })
      .catch((err) => console.log("에러", err));
  };
  // console.log(Movies);
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((res) => {
      // console.log(res.data);
      if (res.data.success) {
        return navigate("/login");
      } else {
        alert("failed to logout");
      }
    });
  };

  // loadmore items 버튼
  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage}`;
    fetchMovies(endpoint);
  };

  return (
    <>
      <div style={{ width: "100%", margin: "0" }}>
        {/* main image */}
        {MainMovieImage && (
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview}
          />
        )}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <h2>Movies by latest</h2>
          <hr />
          {/* Movie Grid Cards */}
          <Row gutter={[16, 16]}>
            {Movies &&
              Movies.map((movie, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    landingPage
                    image={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                        : null
                    }
                    movieId={movie.id}
                    movieName={movie.original_title}
                  ></GridCards>
                </React.Fragment>
              ))}
          </Row>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreItems}>Load More</button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <h2>시작페이지</h2>
        <button onClick={onClickHandler}>로그아웃</button>
      </div>
    </>
  );
}

export default LandingPage;
