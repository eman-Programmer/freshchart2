import { cookies } from "next/headers"
import { decode } from "next-auth/jwt"

export async function getTokenFun(){

    const cookie = await cookies()
    const nextAuthToken = cookie.get('next-auth.session-token')?.value
    const accessToken = await decode({
      secret : process.env.NEXTAUTH_SECRET! ,
      token: nextAuthToken
    })
   return accessToken?.token

}