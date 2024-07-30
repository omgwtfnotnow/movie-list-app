// components/movielist.js
import React from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import MovieItem from '/Users/parth/Local Space 01/movie-list-app/src/components/movieitems.js'; //CHANGE THE PATH

const MovieList = ({ movies, loadMore, onMoviePress, isLoading }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieItem movie={item} onPress={onMoviePress} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
});

export default MovieList;