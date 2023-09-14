import ApplicationLogo from '@/Components/ApplicationLogo';
import {Link} from '@inertiajs/react';
import React, {PropsWithChildren} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/Components/ui/tabs"
import 'bootstrap/scss/bootstrap-grid.scss';
import {MoveRight} from "lucide-react";


export default function Guest({children}: PropsWithChildren) {
    return (
        <div className="flex items-center row container-fluid h-[99vh] m-0 p-0 w-full">
            <span className="col-lg-7 d-none d-lg-block bg-gray-100 min-h-screen">

            </span>
            <span className="col-lg-5 flex items-center justify-center relative min-h-screen">
                <Link
                    className="flex gap-2 items-center justify-between right-4 top-0 absolute w-auto bg-transparent p-1 mt-3 hover:cursor-pointer transition-all hover:underline"
                    href={route().current('login') ? route('register') : route('login')}>
                    <span className="font-black text-xs">{route().current('login') ? "S'enregistrer" : "Se connecter"}</span>
                    <MoveRight/>
        </Link>
                {children}</span>
        </div>
    );
}
