import * as React from "react"
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import {PageProps} from "@/types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { Checkbox } from "@/Components/ui/checkbox"
import {Button} from "@/Components/ui/button";


export default function Statistics({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Statistiques</h2>}
        >
            <Head title="Statistiques" />
            <Table>
                <TableCaption>Une liste de vos récentes opérations.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead><Checkbox className="flex justify-center items-center"/></TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Montant</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Catégorie</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell><Checkbox className="flex justify-center items-center"/></TableCell>
                        <TableCell className="font-medium">Quelque chose</TableCell>
                        <TableCell>Description de fouuuuuu</TableCell>
                        <TableCell className="text-right">25000</TableCell>
                        <TableCell>Sortie</TableCell>
                        <TableCell>Aujourd'hui</TableCell>
                        <TableCell>Loisirs</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </AuthenticatedLayout>
    )
}

