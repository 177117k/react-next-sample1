import { delay } from '@/app/utils'

export default async function Delay1() {
  await delay(3000)
  return (
    <>
      <h1>Delay 1 (3초)!!</h1>
    </>
  )
}
