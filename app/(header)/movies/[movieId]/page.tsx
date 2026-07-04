// case 'client component'
// 'use client'
// import { use } from 'react'
// export default function MovieDetails({ params }) {
//   const { movieId } = use(params)
//   return <></>
// }

// case 'server component'
import axios from 'axios'
import Image from 'next/image'

interface Props {
  params: Promise<{ movieId: string }>
}
export interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
export interface Rating {
  Source: string
  Value: string
}
// export const metadata = {
//   title: '영화 상세 정보',
//   description: '영화 상세 정보 설명입니다',
//   openGraph: {
//     type: 'website',
//     siteName: 'next.js 연습 project',
//     title: '영화 상세 정보',
//     description: '영화 상세 정보 설명입니다',
//     images: 'https://picsum.photos/700/500'
//   }
// }

async function fetchMovie(movieId: string) {
  // const { data: movie } = await axios.get<Movie>(
  //   `https://omdbapi.com?apikey=${process.env.OMDB_APIKEY}&i=${movieId}`
  // )
  // 여기서의 fetch함수는 오리지널이 아닌 next.js용 fetch 함수이다
  const res = await fetch(
    `https://omdbapi.com?apikey=${process.env.OMDB_APIKEY}&i=${movieId}`,
    {
      method: 'GET', //생략해도 됨
      cache: 'force-cache' // next.js 전용 기능(서버에서 캐시됨)
    }
  )
  const movie = await res.json()
  return movie
}

// 'generateMetadata' 이름 변경 불가
export async function generateMetadata({ params }: Props) {
  const { movieId } = await params
  const movie = await fetchMovie(movieId)
  return {
    title: movie.Title,
    description: movie.Plot,
    openGraph: {
      type: 'website',
      siteName: 'next.js 연습 project',
      title: movie.Title,
      description: movie.Plot,
      images: movie.Poster
    }
  }
}

// 애초에 params가 들어온다, promise 객체이기 때문에 이행 해야만 값을 얻을 수 있다
export default async function MovieDetails({ params }: Props) {
  const { movieId } = await params
  const movie = await fetchMovie(movieId)
  return (
    <>
      <h1>{movie.Title}</h1>
      <p>{movie.Plot}</p>
      <Image
        src={movie.Poster}
        alt={movie.Title}
        width={500}
        height={750}
      />
    </>
  )
}
//params를 Promise객체로 이행 헀을 때 반환된 string 형식의 movieId 결과값을 await해서 받을거야
