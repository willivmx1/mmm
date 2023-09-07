import React, { PropsWithChildren, ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import {BarChart2, Database, LogOut, Settings} from "lucide-react";
import { buttonVariants} from "@/Components/ui/button";

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {

    return (
                <div className="min-h-screen w-[250px] flex flex-col shadow-2xl justify-between side-bar">
                    <div>
                        <p className="w-full text-center font-extrabold mt-5 mb-5 text-xl uppercase ">My Money Manager</p>
                        <div className="flex flex-col border-none shadow-none gap-2">
                            <MenuElement title="Tableau de bord" icon={<Database size={24}/>} active></MenuElement>
                            <MenuElement title="Statistiques" icon={<BarChart2 size={24}/>}></MenuElement>
                        </div>
                    </div>
                    <div className="mb-5 flex flex-col gap-2">
                        <MenuElement title="Réglages" icon={<Settings size={24}/>} route="dashboard"/>
                        <div className="w-full px-4 justify-center  items-center">
                            <Link href={route('logout')} as="button" className={`${buttonVariants({ variant: "outline" })} w-full`}><LogOut className="mr-2 h-4 w-4" size={24} />Déconnexion</Link>
                        </div>
                    </div>
                </div>
    )
}

function MenuElement({ children, title, icon, active, routee, variant, ...props }:any) {
    return(
        <div className="w-full px-4 justify-center  items-center">
            <Link href={route(`${routee || "dashboard"}`)} as="button" className={`${buttonVariants({ variant: "default" })} w-full flex content-start`}>
                {React.cloneElement(icon, { className: "mr-2 h-4 w-4" })}
                Réglages</Link>
        </div>
    )
}
