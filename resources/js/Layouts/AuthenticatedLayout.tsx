import React, {PropsWithChildren, ReactNode} from 'react';
import {Head, Link} from '@inertiajs/react';
import {User} from '@/types';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import {Bell, BellDot, UserCircle, Search, Database, History, PieChart, Target, LogOut} from "lucide-react";
import {Input} from "@/Components/ui/input";
import {Label} from "@/Components/ui/label";
import {Button} from "@/Components/ui/button";
import {
    Dialog, DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";
import 'bootstrap/scss/bootstrap-grid.scss';
import { Toaster } from "@/Components/ui/toaster"


export default function Authenticated({user, header, children, actionButtons}: PropsWithChildren<{ user: User, header?: ReactNode, actionButtons?: Array<{ title: string, description: string, icon: ReactNode, content: ReactNode }>, children?: ReactNode }>) {
    return (
        <>
            <Head title="My Money Manager"/>
            <div className="w-full top-0 shadow h-14 flex justify-between items-center px-12 sticky bg-white ">
                <Link href={route('dashboard')} className="font-black text-xl text-gray-800 flex gap-4 items-center">
                    MMM
                    <p className="text-xs font-normal">
                        (Salut, {user.name})
                    </p>
                </Link>

                <div className="font-bold text-2xl">
                    {header}
                </div>
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
                        <PopoverContent className="w-50 mx-2 py-1 px-2">
                            <div className="flex flex-col border-b py-1.5">
                                <span className="font-black text-sm">{user.name}</span>
                                <span className="font-normal text-xs">{user.email}</span>
                            </div>

                            <div className="pt-2 flex flex-col gap-0.5">
                                <Link href={route('logout')} method="post"
                                      className="flex items-center py-2 text-xs gap-2 hover:cursor-pointer hover:bg-gray-100 rounded px-2"><LogOut
                                    size={14}/> Logout</Link>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="container my-3 items-center justify-center flex">
                <div className="row gap-4 justify-center border-b col-12">
                    <div className="col-lg-8 col-md-8 col-12 flex">
                        <NavLink title="Aperçu général" _href={route('dashboard')} active={route().current('dashboard')}
                                 icon={<Target/>}/>
                        <NavLink title="Historique" _href={route('history')} active={route().current('history')}
                                 icon={<History/>}/>
                        <NavLink title="Statistiques" _href={route('statistics')} active={route().current('statistics')}
                                 icon={<PieChart/>}/>
                    </div>
                    <div className="row col-lg-3 col-md-4 col-12 justify-center ">
                        {actionButtons && showActionButtons(actionButtons)}
                    </div>
                </div>
            </div>
            <div className="mx-20 mt-8">
                {children}
            </div>
            <Toaster />
        </>
    )
}


function NavLink({_href, active, title, icon}: PropsWithChildren<{ _href?: string, active?: boolean, title: string, icon?: ReactNode }>) {
    return (
        <Link
            className={`${active ? "border-b" : "hover:border-b"} mr-4 pb-2.5 text-xs font-semibold border-black items-center flex`}
            href={_href || ''}>
            {React.cloneElement(icon as React.ReactElement, {className: "mr-2 h-4 w-4", size: 16})}
            {title}
        </Link>
    );
}

function showActionButtons(actionButtons: Array<{ title: string, description: string, icon: ReactNode, content: ReactNode }>) {
    return actionButtons && (actionButtons.map((actionButton, index) => {
                    return (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    className="flex items-center h-8  mb-2.5 text-xs font-semibold">{React.cloneElement(actionButton.icon as React.ReactElement, {className: "mr-2 h-4 w-4", size: 16})} {actionButton.title} </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] flex flex-col py-3">
                                <DialogHeader>
                                    <DialogTitle>{actionButton.title}</DialogTitle>
                                    <DialogDescription>
                                        {actionButton.description}
                                    </DialogDescription>
                                </DialogHeader>
                                {
                                    actionButton.content
                                }
                            </DialogContent>
                        </Dialog>
                    )
                }
            )
    )
}
