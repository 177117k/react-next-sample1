import Button from '@/components/Button'
import { useMovieStore } from '@/store/movie'
import { useState } from 'react'

export default function MovieSearch() {
  const [inputText, setInputText] = useState('')
  const setSearchText = useMovieStore(state => state.setSearchText)

  function fetchMovies() {
    setSearchText(inputText)
  }

  return (
    <div className="border-line bg-surface shadow-card rounded-[16px] border p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <svg
            aria-hidden
            className="text-ink-4 pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round">
            <circle
              cx="11"
              cy="11"
              r="6"
            />
            <path d="M20 20l-3.2-3.2" />
          </svg>
          <input
            type="text"
            value={inputText}
            placeholder="영화 제목을 검색하세요 (3글자 이상)"
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => {
              if (e.nativeEvent.isComposing) return
              if (e.key === 'Enter') fetchMovies()
            }}
            className="border-line-2 bg-surface text-ink placeholder:text-ink-4 focus:border-kb-yellow focus:ring-kb-yellow/40 h-14 w-full rounded-[12px] border pr-5 pl-11 text-[17px] transition outline-none focus:ring-2"
          />
        </div>
        <Button
          className="h-14 shrink-0 px-7 text-[16px]"
          onClick={() => fetchMovies()}>
          검색
        </Button>
      </div>
    </div>
  )
}
