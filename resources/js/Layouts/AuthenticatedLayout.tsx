import React, {JSXElementConstructor, PropsWithChildren, ReactNode} from 'react';
import {Head, Link} from '@inertiajs/react';
import { User } from '@/types';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import {Bell, BellDot, UserCircle, Search, Database, History, PieChart, Target, LogOut} from "lucide-react";
import {Input} from "@/Components/ui/input";
import {Label} from "@/Components/ui/label";


export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    return (
        <>
            <Head title="My Money Manager"/>
            <div className="w-full top-0 shadow h-14 flex justify-between items-center px-12 sticky">
            <Link href={route('dashboard')} className="font-black text-xl text-gray-800 flex gap-4 items-center">
                MMM
                <p className="text-xs font-normal">
                    (Salut, {user.name})
                </p>
            </Link>
                <div className="flex gap-3">

                    <Popover>
                        <PopoverTrigger><BellDot strokeWidth={1.75} className="text-gray-800 "/></PopoverTrigger>
                        <PopoverContent className="w-60 mx-2">
                            <div className="flex flex-col border-b pb-1">
                                <span className="font-black text-sm">Notifications</span>
                            </div>
                            <span>Content</span>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger><UserCircle className="text-gray-800"/></PopoverTrigger>
                        <PopoverContent className="w-50 mx-2 py-1.5 px-2">
                            <div className="flex flex-col border-b pb-1">
                                <span className="font-black text-sm">{user.name}</span>
                                <span className="font-normal text-xs">{user.email}</span>
                            </div>

                           <div className="pt-2 flex flex-col gap-0.5">
                               <Link href={route('logout')} method="post" className="flex items-center py-2 text-xs gap-2 hover:cursor-pointer hover:bg-gray-100 rounded px-2"><LogOut size={14} /> Logout</Link>
                           </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="mx-20">
                <div className="font-bold text-2xl pt-8 pb-6">
                    {header}
                </div>
                <div className="flex border-b">
                    <NavLink title="Aperçu général" _href={route('dashboard')} active={route().current('dashboard')} icon={<Target />}/>
                    <NavLink title="Historique" _href={route('history')} active={route().current('history')} icon={<History />}/>
                    <NavLink title="Statistiques" active={route().current('statistics')} icon={<PieChart />}/>
                </div>
            </div>
            <div>{children}</div>
        </>
    )
}


function NavLink({ _href, active, title, icon,  children }: PropsWithChildren<{ _href?: string, active?: boolean, title: string, icon?: any}>) {
    return (
        <Link className={`${active ? "border-b" : "hover:border-b"} mr-4 pb-2.5 text-xs font-semibold border-black items-center flex`} href={_href || ''}>
            {React.cloneElement(icon, { className: "mr-2 h-4 w-4", size: 16 })}
            {title}
        </Link>
    );
}
