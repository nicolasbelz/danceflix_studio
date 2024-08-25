import React, { useState } from 'react';
import styled from 'styled-components'

const MoviePage = (props) => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
  }

  const episodes = [
    {
      title: "The Red Woman",
      season: "6",
      episode: "1",
      airDate: "April 24, 2016",
      synopsis: "Jon Snow's fate is revealed, Bran Stark learns more of his destiny, and Daenerys is held captive."
    },
    {
      title: "Home",
      season: "6",
      episode: "2",
      airDate: "May 1, 2016",
      synopsis: "Jon Snow is resurrected, Bran Stark discovers the origin of the White Walkers, and Ramsay Bolton solidifies his hold on Winterfell."
    },
    // add more episode objects here
  ];

  const MoviePageWrapper = styled.div`
    /* Add styles for the main container */
  `
  const EpisodeListWrapper = styled.div`
    /* Add styles for the episodes list container */
  `
  const EpisodeTitle = styled.div`
    /* Add styles for the episode title */
    &:hover{
        /* Add styles for the hover state of episode title */
    }
  `

  const SelectedEpisodeWrapper = styled.div`
    /* Add styles for the selected episode container */
  `

  return (
    <MoviePageWrapper className="movie-page">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <h2>Episodes:</h2>
      <EpisodeListWrapper className="episodes-list">
        {episodes.map((episode, index) => (
          <EpisodeTitle key={index} onClick={() => handleEpisodeClick(episode)}>
            {episode.title}
          </EpisodeTitle>
        ))}
      </EpisodeListWrapper>
      {selectedEpisode && (
        <SelectedEpisodeWrapper className="selected-episode">
          <Episode
            title={selectedEpisode.title}
            season={selectedEpisode.season}
            episode={selectedEpisode.episode}
            airDate={selectedEpisode.airDate}
            synopsis={selectedEpisode.synopsis}
          />
        </SelectedEpisodeWrapper>
      )}
    </MoviePageWrapper>
  );
}

export default MoviePage;
