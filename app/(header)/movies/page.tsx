'use client'
import MovieList from '@/components/movies/MovieList'
import MovieSearch from '@/components/movies/MovieSearch'

// http://localhost:3000/movies/tt123455123
export default function Movies() {
  return (
    <>
      <h1>Movies Page!!</h1>
      <MovieSearch />
      <MovieList />
    </>
  )
}
