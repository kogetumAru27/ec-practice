import type { NextAuthConfig } from "next-auth";
export const authConfig:NextAuthConfig = {
    providers:[],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id as string
            }
            return token
        },
         async session({session,token}){
            if(session.user){
                session.user.id = token.id as string;
                session.user.type = token.type;
            }
            return session
         }
    }
}