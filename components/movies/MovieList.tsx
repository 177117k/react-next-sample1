import Link from 'next/link'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMovieStore } from '@/store/movie'
import type { ResponseValue, Movie } from '@/store/movie'
import Button from '@/components/Button'
import { useOnInView } from 'react-intersection-observer'
import Image from 'next/image'

const FilmIcon = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect
      x="3"
      y="4"
      width="18"
      height="16"
      rx="2"
    />
    <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
  </svg>
)

function EmptyState({
  icon,
  title,
  desc
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="border-line bg-surface shadow-card mt-6 flex flex-col items-center justify-center rounded-[16px] border px-6 py-16 text-center">
      <div className="bg-kb-yellow-soft text-kb-black mb-4 flex h-14 w-14 items-center justify-center rounded-full">
        {icon}
      </div>
      <h2 className="text-ink text-[17px] font-bold">{title}</h2>
      <p className="text-ink-3 mt-1.5 text-[14px]">{desc}</p>
    </div>
  )
}

export default function MovieList() {
  const fetchMovies = useMovieStore(state => state.fetchMovies)
  const searchText = useMovieStore(state => state.searchText)
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } =
    // eslint-disable-next-line
    useInfiniteQuery<ResponseValue | null>({
      queryKey: ['movies', searchText],
      queryFn: ({ pageParam }) => {
        return fetchMovies(pageParam as number)
      },
      staleTime: 1000 * 60 * 60 * 2, // ms
      enabled: Boolean(searchText),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        // '812' => 82
        if (lastPage) {
          const maxPage = Math.ceil(Number(lastPage.totalResults) / 10)
          if (pages.length < maxPage) {
            // [{1}, {2}, {3}]
            return pages.length + 1
          }
        }
        return null
      }
    })
  const ref = useOnInView(inView => {
    if (inView) fetchNextPage()
  })

  const movies: Movie[] = data?.pages.flatMap(page => page?.Search ?? []) ?? []
  const showSkeleton = isFetching && movies.length === 0

  if (!searchText) {
    return (
      <EmptyState
        icon={<FilmIcon />}
        title="영화를 검색해 보세요"
        desc="위 검색창에 보고 싶은 영화의 제목을 입력하세요."
      />
    )
  }

  if (showSkeleton) {
    return (
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <li
            key={index}
            className="border-line bg-surface overflow-hidden rounded-[16px] border">
            <div className="bg-line aspect-2/3 w-full animate-pulse" />
            <div className="p-3">
              <div className="bg-line h-3.5 w-3/4 animate-pulse rounded" />
              <div className="bg-line mt-2 h-3 w-1/3 animate-pulse rounded" />
            </div>
          </li>
        ))}
      </ul>
    )
  }

  if (movies.length === 0) {
    return (
      <EmptyState
        icon={<FilmIcon />}
        title="검색 결과가 없어요"
        desc="다른 검색어로 다시 시도해 보세요."
      />
    )
  }

  return (
    <>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {movies.map(movie => {
          return (
            <li key={movie.imdbID}>
              <Link
                href={`/movies/${movie.imdbID}`}
                className="group border-line bg-surface shadow-card hover:border-line-2 block overflow-hidden rounded-[16px] border transition hover:-translate-y-0.5">
                <div className="bg-line text-ink-4 relative aspect-2/3 w-full overflow-hidden">
                  <Image
                    src={movie.Poster}
                    alt={movie.Title}
                    width={200}
                    height={300}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-ink truncate text-[14px] font-bold">
                    {movie.Title}
                  </h3>
                  <p className="text-ink-3 mt-0.5 text-[12px] tabular-nums">
                    {movie.Year}
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

      {hasNextPage && (
        <div className="mt-6 flex justify-center">
          <Button
            ref={ref}
            variant="secondary"
            loading={isFetchingNextPage}
            onClick={() => fetchNextPage()}>
            더보기
          </Button>
        </div>
      )}
    </>
  )
}
