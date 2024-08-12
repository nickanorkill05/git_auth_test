    import NextAuth from "next-auth/next"
    import GoogleProvider from "next-auth/providers/google" 

    const authOptions = { 
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID ?? "",
                clientSecret : process.env.GOOGLE_CLIENT_SECRET ?? "",
                authorization: {
                    params : {
                        scope: "openid email profile https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive",
                        access_type: "offline",
                        prompt: "consent",
                    }
                }
            })
        ],
        debug: true,
        secret: process.env.NEXTAUTH_SECRET,
        callbacks : {
            async jwt({token, account , profile} : any){
                console.log("Account Access Token : " , token)
                console.log("Account account:", account); 
                if(account){
                    token.accesstoken = account.access_token
                }
                return token
            },
            async session({session, token, user} : any){
                session.accesstoken = token.access_token
                return session
            }
        }
    }

    const handler = NextAuth(authOptions)
    export {handler as GET, handler as POST}


    // export const authOptions = ({
    //     providers: [
    //         GoogleProvider({
    //             clientId : process.env.GOOGLE_CLIENT_ID ?? "" ,
    //             clientSecret : process.env.GOOGLE_CLIENT_SECRET ?? "",
    //             authorization: { 
    //               params: 
    //               { 
    //                 scope: "openid email profile https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive",
    //                 access_type: "offline",
    //                 prompt: "consent",
    //                 //
    //               } 
    //             },
    //         })
    //     ],
    //     secret: NEXTAUTH_SECRET,  // Use NEXTAUTH_SECRET here
    //     debug: true,
    //     callbacks: {
    //       async jwt({token, user , account} : any){ 
    //         console.log("Account Access Token : " , token)
    //         console.log("Account account:", account);
    //         console.log("Account user:", user);
    //         if (account) {
    //           token.accessToken = account.access_token;
    //         }
    //         return token
    //       },
    //       async session({ session, token } : any) {
    //         const newSession = {
    //           ...session,
    //           accessToken: token.accessToken,
    //         };
        
    //         //console.log("New Session Object:", newSession);
    //         return newSession;
    //       },
    //     }
    // })
    
    // const handler = NextAuth(authOptions)
    // export {handler as GET, handler as POST}