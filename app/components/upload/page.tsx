"use client"
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation"; 

function UploadPage(){
  const { data : session , status } = useSession({
    required: true,
    onUnauthenticated(){
      redirect("/")
    }
  })


  return (
  <>
      {session && (
          <div>
              <header className="d-flex justify-content-between align-items-center">
                  <p>
                    Welcome {session.user?.name?.split("")}
                  </p>
                  <button 
                  className="text-red-600"
                  onClick={() => signOut()}>Sign Out</button>
              </header> 
          </div>  
      )}
  </>
)
}

export default UploadPage;
