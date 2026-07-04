export function delay(ms = 1000) {
  // 기본값이 추론되기 때문에 타입 생략 'number'
  return new Promise((resolve, reject) => {
    if (ms >= 10000) {
      return reject(new Error('10초 이상은 기다리기 싫어!'))
    }
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}

export function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const imgEl = document.createElement('img')
    imgEl.addEventListener('load', () => {
      resolve(true)
    })

    //에러 시 약속 거부 함수
    // => 사용하는 쪽에서 try catch가 있어야 한다
    imgEl.addEventListener('error', () => {
      reject(new Error('이미지를 불러오지 못했어요~'))
    })
    imgEl.src = src
    // 'load' 이벤트가 등록이 되어 있는 상태에서 src 값을 할당 해줘야 'load' 이벤트가 발생함
  })
}

// try {
//   const res = await delay(11000)
//   console.log(res)
// } catch (error) {
//   if (error instanceof Error) {
//     console.log(error.message)
//   }
// }
