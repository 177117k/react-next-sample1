import { delay } from '@/app/utils'

export default async function Delay2() {
  await delay(2000)
  return (
    <>
      <h1>Delay 2 (2초)!!</h1>
    </>
  )
}
