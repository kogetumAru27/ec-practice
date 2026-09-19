import { Roletype } from "@prisma/client";
import { DefaultSession } from "next-auth";
import "next-auth";
import "next-auth/jwt";
declare module "next-auth" {
    interface User {
        type:Roletype
    }
    interface Session {
        user:{
            id:string,
            role:Roletype,
        } & DefaultSession["user"];
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        id:string,
        type:Roletype
    }
}