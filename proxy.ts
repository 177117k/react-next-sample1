//어떤 자원에 접근해도 이 프록시를 통과하게 된다
import { NextResponse } from 'next/server'

export default function proxy() {
  console.log('영화 페이지 접근!! (/movies/:path*) proxy')
  return NextResponse.next()
}

// 'config' 이름 변경 불가
export const config = {
  matcher: ['/movies/:path*']
}
