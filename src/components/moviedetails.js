//components/moviedetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, Button, Image, HStack, VStack } from '@chakra-ui/react';

const API_KEY = 'da88cd8c747f0c0132b5875c29e15194';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        setMovie(movieResponse.data);

        const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
        setCast(castResponse.data.cast);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <Text>Loading...</Text>;

  return (
    <Box minH="100vh" d="flex" flexDirection="column" p={4} justifyContent="center" alignItems="center">
      <Box d="flex" flexDirection="column" alignItems="center" mb={4} textAlign="center">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          boxSize="300px"
          objectFit="cover"
          mb={4}
        />
        <Text fontSize="2xl" fontWeight="bold" mb={2}>{movie.title}</Text>
        <Text mt={2} mb={4} maxW="container.md">{movie.overview}</Text>
        <Text fontSize="lg" fontWeight="bold" mb={2}>Cast:</Text>
        <HStack spacing={4} wrap="wrap" justifyContent="center">
          {cast.slice(0, 10).map(actor => (
            <VStack key={actor.cast_id} spacing={2} align="center" p={2} borderWidth="1px" borderRadius="md">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
                boxSize="100px"
                borderRadius="full"
                objectFit="cover"
              />
              <Text fontSize="sm">{actor.name}</Text>
            </VStack>
          ))}
        </HStack>
      </Box>
      <Box textAlign="center" mb={4}>
        <Button
          onClick={() => navigate('/')}
          colorScheme="blue"
          variant="solid"
          size="lg"
        >
          Back to Movies
        </Button>
      </Box>
    </Box>
  );
};

export default MovieDetails;