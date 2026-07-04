import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export interface ResponseValue {
  Search?: Movie[]
  //totalResults?: string // "812"... 숫자가 들어간 문자열
  totalResults?: `${number}` // 좀 더 엄격하게 (문자열이지만 안에 숫자만 있다)
  //totalResults?: `v: ${number}` // 고급 패턴 예시
  Error?: string
  Response: 'True' | 'False'
}
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export const useMovieStore = create(
  combine(
    {
      // 상태 정의
      searchText: ''
      // movies: [] as Movie[]
      // useQuery에 데이터를 return 해주게 되면서 필요 없어짐
      // as => assertion (단언) : 타입 단언 키워드
    },
    (set, get) => ({
      // 액션 정의
      setSearchText(searchText: string) {
        set({ searchText })
      },
      // fetchMovies: async function() {
      async fetchMovies(pageParam: number) {
        const { searchText } = get()
        if (searchText.trim().length < 3) return null
        const res = await fetch(
          `https://omdbapi.com/?apikey=7035c60c&s=${searchText}&page=${pageParam}`
        )
        const data: ResponseValue = await res.json()
        // setMovies(data.Search)
        // set({
        //   movies: data.Search || []
        // })
        return data
        //  useQuery 가 쓸수 있도록 return 해 줌
      }
    })
  )
)
