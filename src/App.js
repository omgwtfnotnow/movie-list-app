//src//App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChakraProvider, Box, Text, Button, Image, Input, InputGroup, InputRightElement, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; 
import MovieDetails from '/Users/parth/Local Space 01/movie-list-app/src/components/moviedetails.js'; // CHANGE THE PATH

const API_KEY = 'da88cd8c747f0c0132b5875c29e15194';
const POPULAR_MOVIES_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [showWelcomePage, setShowWelcomePage] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!query && !showWelcomePage && !showSearchResults) {
      fetchPopularMovies();
    }
  }, [page, query, showWelcomePage, showSearchResults]);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`${POPULAR_MOVIES_URL}&page=${page}`);
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error(err);
    }
  };

  const searchMovies = async () => {
    if (query.trim() === '') return;
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
      setMovies(response.data.results);
      setPage(1);
      setTotalPages(response.data.total_pages);
      setShowSearchResults(true);
    } catch (err) {
      console.error(err);
    }
  };

  const loadMoreMovies = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleEnterClick = () => {
    setShowWelcomePage(false);
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); 
  };

  const handleBackToMovies = () => {
    setShowSearchResults(false);
    setQuery('');
    setMovies([]);
    setPage(1);
    navigate('/'); 
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        {showWelcomePage ? (
          <Box textAlign="center" mt={10}>
            <Text fontSize="2xl" mb={4}>Welcome to Movie List App</Text>
            <Button onClick={handleEnterClick} colorScheme="blue" size="lg">
              Enter
            </Button>
          </Box>
        ) : (
          <>
            <InputGroup mb={4}>
              <Input
                placeholder="Search for movies"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={searchMovies} colorScheme="blue">
                  Search
                </Button>
              </InputRightElement>
            </InputGroup>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
              {movies.map((movie) => (
                <Box
                  key={movie.id}
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  m={2}
                  flexBasis="24%"
                  onClick={() => handleMovieClick(movie.id)} 
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <Box p="6">
                    <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                      {movie.title}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
            <Flex justifyContent="center" alignItems="center" my={4}>
              {showSearchResults && (
                <Button onClick={handleBackToMovies} colorScheme="blue" mr={4}>
                  Back to Movies
                </Button>
              )}
              {(query || page < totalPages) && (
                <Button onClick={loadMoreMovies} colorScheme="blue" isDisabled={page >= totalPages}>
                  Load More
                </Button>
              )}
            </Flex>
          </>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  </Router>
);