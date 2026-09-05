"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home,User,ShoppingCart,Search} from "lucide-react";

const navItems = [
    {href:"/",label:"ホーム",icon:Home},
    {href:"/category",label:"検索",icon:Search},
    { href: "/cart", label: "カート", icon: ShoppingCart },
    { href: "/mypage", label: "マイページ", icon: User },
]
export default function ButtonNav(){
    const pathname = usePathname();
    return(
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
                <Link 
                    key={href} 
                    href={href} 
                    className={`flex flex-col items-center gap-1 px-4 py-1 text-xs ${
                        isActive ? "text-emerald-600" : "text-gray-400"
                    }`}
                >
                    <Icon size={22} />
                    <span>{label}</span>
                </Link>
            );
        })}
    </nav>
    )
}