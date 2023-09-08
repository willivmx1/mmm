import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import {Button} from "@/Components/ui/button";
import * as React from "react";
import {ArrowLeftFromLine, ArrowRightFromLine, BookPlus, DollarSign, Plus, PlusSquare} from "lucide-react";
import 'bootstrap/scss/bootstrap-grid.scss';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vue d'ensemble</h2>}
            actionButton={
             [{
                    title: "Ajouter une opération",
                    description: "Ajouter une opération à votre historique.",
                    icon: <BookPlus size={18} />,
                    content: (
                        <h1>Hello World</h1>
                    ),
                    action: () => {
                        console.log("action done...")
                    }
             }]
            }
        >
            <Head title="Dashboard" />

            <div className="row gap-6 justify-center">
                {displayCards(
                    "Solde actuel",
                    <DollarSign />,
                    <h1 className="text-3xl font-bold">25.000 CFA</h1>,
                    <p className="text-xs font-normal">+0% par rapport à hier</p>
                )}
                {displayCards(
                    "Total des entrées",
                    <ArrowLeftFromLine />,
                    <h1 className="text-3xl font-bold">75.500 CFA</h1>,
                    <p className="text-xs font-normal"><span className="text-red-500">-8%</span> par rapport au mois dernier</p>
                )}
                {displayCards(
                    "Total des sorties",
                    <ArrowRightFromLine />,
                    <h1 className="text-3xl font-bold">50.000 CFA</h1>,
                    <p className="text-xs font-normal"><span className="text-green-500">-8%</span> par rapport au mois dernier</p>
                )}
            </div>

        </AuthenticatedLayout>
    );
}

function displayCards(title: string, icon: React.ReactNode, content: React.ReactNode, footer: React.ReactNode) {
    return (
        <Card className="col-sm-3 shadow-xl hover:cursor-pointer hover:-translate-y-2 hover:transition-all">
            <CardContent className="w-full p-3">
                <div className="flex justify-between w-full">
                    <span className="text-xs font-bold">{title}</span>
                    {React.cloneElement(icon as React.ReactElement, { size: 14, strokeWidth: 1.5})}
                </div>
                <div>
                    {content}
                </div>
                <div>
                    {footer}
                </div>
            </CardContent>
        </Card>
    )
}
