"use client";
import { useState } from "react";
import {Eye,EyeOff} from "lucide-react";
type passwordProps = {
    name:string;
    label:string;
}
export function PasswordInput({name,label}:passwordProps){
    const [showPass,setShowPass] = useState(false);
    return(
        <div>
            <label htmlFor={name} className="block text-sm mb-1">{label}</label>
            <div className="relative">
                <input type={showPass?"text":"password"} id={name} name={name} placeholder="password" className="w-full border rounded px-3 py-2 pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)}  className="absolute right-2 top-1/2 -translate-y-1/2">{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
        </div>
    )
}