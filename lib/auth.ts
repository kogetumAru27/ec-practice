import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
export const {handlers,signIn,signOut,auth} = NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[GitHub,Google,
        Credentials({
            credentials:{
                email:{},
                password:{}
            },
            authorize:async(credentials) => {
                const email = credentials.email as string;
                const password = credentials.password as string;
                const user = await prisma.user.findUnique({
                    where:{email}
                });
                if(!user || !user.password){//git,googleではpassを使用していないからnullをなくしているschemaでもpassはstring?にした
                    return null;
                }
                const isValid = await bcrypt.compare(password,user.password)
                if(!isValid){
                    return null;
                }
                return user;
            }
        })
    ],
    session:{strategy:"jwt"},
    callbacks:{
        ...authConfig.callbacks,
        async jwt({token,user}){
            if(user){
                token.id = user.id as string;
                token.type = user.type;
            }
            if(token.id && !token.type){
                const dbuser = await prisma.user.findUnique({where:{id:token.id as string}});
                if(dbuser) token.type = dbuser.type
            }
            console.log("jwt token after processing:", token);  
            return token
        }
    }
})