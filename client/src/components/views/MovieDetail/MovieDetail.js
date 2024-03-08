import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./sections/MovieInfo";
import GridCards from "../commons/GridCard";
import { Row } from "antd";

function MovieDetail() {
  const { movieId } = useParams();
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    //
    axios
      .get(endpointInfo) //
      .then((res) => {
        // console.log(res.data);
        setMovie(res.data);
      });

    axios
      .get(endpointCrew) //
      .then((res) => {
        console.log(res.data.cast);
        setCasts(res.data.cast);
      });
    //
  }, []);
  return (
    <div>
      {Movie && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        ></MainImage>
      )}
      {/* Body */}
      <dir style={{ width: "85%", margin: "1rem auto" }}>
        {/* movieINfo */}
        <MovieInfo movie={Movie}></MovieInfo>

        <br />
        {/* Actors Grid */}

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button
            onClick={function () {
              setActorToggle(!ActorToggle);
            }}
          >
            Toggle Actor View
          </button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    characterName={cast.name}
                  ></GridCards>
                </React.Fragment>
              ))}
          </Row>
        )}
      </dir>
    </div>
  );
}

export default MovieDetail;
