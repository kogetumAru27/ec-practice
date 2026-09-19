"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home,User,ShoppingCart} from "lucide-react";
type props = {
    cartItemCount:number
}
const navItems = [
    {href:"/",label:"ホーム",icon:Home},
    { href: "/cart", label: "カート", icon: ShoppingCart },
    { href: "/mypage", label: "マイページ", icon: User },
]
export default function ButtonNav({cartItemCount}:props){
    const pathname = usePathname();
    return(
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
                <Link key={href} href={href} className={`relative flex flex-col items-center gap-1 px-4 py-1 text-xs ${
                    isActive ? "text-emerald-600" : "text-gray-400"
                }`}>
                    <Icon size={22} />
                    {href === "/cart" && cartItemCount > 0 && (
                        <span className="absolute top-0 right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                    <span>{label}</span>
                </Link>
            );
        })}
    </nav>
    )
}