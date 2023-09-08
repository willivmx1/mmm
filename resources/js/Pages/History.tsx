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
import { Badge } from "@/Components/ui/badge"
import {ArrowLeftFromLine, ArrowRightFromLine} from "lucide-react";


export default function History({ auth, operations, categories }: any) {
    const showDate = (date: string) => {
        const dateObj = new Date(date)
        return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`
    }

    const getStatus = (type: string) => {
        switch (type) {
            case 'income':
                return <Badge className="mr-2 bg-green-500 text-xs font-bold flex w-[80px] gap-1"><ArrowRightFromLine size={14}/> Entrée</Badge>
            case 'outcome':
                return <Badge className="mr-2 bg-orange-500 text-xs font-bold flex w-[80px] gap-1"><ArrowLeftFromLine size={14}/> Sortie</Badge>
        }
    }

    const getCategoryTitle = (id: number) => {
        const category = categories.find((category: any) => category.id === id)
        return category.title
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Historique</h2>}
        >
            <Head title="Historique" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Checkbox className="flex justify-center items-center"/></TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Montant</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Catégorie</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="overflow-y-scroll">
                    {operations.map((operation: any) => (
                        <TableRow key={operation.id}>
                            <TableCell><Checkbox className="flex justify-center items-center"/></TableCell>
                            <TableCell className="font-medium ">{operation.title}{getStatus(operation.type)} </TableCell>
                            <TableCell>{operation.description}</TableCell>
                            <TableCell className="text-right">{operation.amount} FCFA</TableCell>
                            <TableCell>{showDate(operation.created_at)}</TableCell>
                            <TableCell>{getCategoryTitle(operation.category_id)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </AuthenticatedLayout>
    )
}

