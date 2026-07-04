import { delay } from '@/app/utils'
import Delay1 from './Delay1'
import Delay2 from './Delay2'
import { Suspense } from 'react'

// 비동기 컴포넌트 스트리밍!!!
export default async function AsyncPage() {
  await delay(1000)
  return (
    <>
      <h1>Async Page!!</h1>
      <Suspense fallback={<h2>Delay1 로딩 중</h2>}>
        <Delay1 />
      </Suspense>
      <Suspense fallback={<h2>Delay2 로딩 중</h2>}>
        <Delay2 />
      </Suspense>
      {/* Suspense로 감싸서 서로 기다리지 않고 각각 비동기로 출력되게 한다 */}
    </>
  )
}
