'use client'
interface Props {
  error: Error
}

export default function Error({ error }: Props) {
  return (
    <>
      <h1>영화 정보를 가져오는 중에 에러가 발생했어요..</h1>
      <h2>{error.message}</h2>
    </>
  )
}
