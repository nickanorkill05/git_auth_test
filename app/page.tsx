"use client"
import { useSession , signIn } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Home() {

  const {data:session} = useSession()

  if(session) redirect('/components/upload')

  return (
    <>
      {!session && (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="row justify-conent-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body text-center">
                  <p className="pb-5">Upload TEST??</p>
                  <button onClick={() => signIn("google" ,{ callbackUrl: "/components/upload"})} className="border-4 border-indigo-200 border-x-indigo-500 p-2">Sign-in with Google</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
