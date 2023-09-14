import * as React from "react"
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible"
import {ChevronsUpDown} from "lucide-react";

export default function Statistics({ auth, operations, categories }: any) {
    // function to get the sum of all incomes for a given category identified by its id
    function getSum(categoryId: number, type: string) {
        let sum = 0
        operations.forEach((operation: any) => {
            if (operation.category_id === categoryId && operation.type === type) {
                sum += operation.amount
            }
        })
        return sum
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Statistiques</h2>}
        >
            <Head title="Statistiques" />
            <div className="container">
                <Collapsible>
                    <CollapsibleTrigger className="flex justify-between w-full items-center px-5 py-2 rounded hover:bg-gray-50 text-sm font-bold">Catégories <ChevronsUpDown size={14}/></CollapsibleTrigger>
                    <CollapsibleContent className="row">
                        <div className="col-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-xs">Titre catégorie</TableHead>
                                        <TableHead className="text-xs text-right">Dépenses</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.sort(
                                        (a: any, b: any) =>
                                            getSum(b.id, 'outcome') - getSum(a.id, 'outcome')
                                    ).map((category: any) => (
                                        <TableRow key={category.id} className="border-orange-50">
                                            <TableCell className="font-medium text-xs">{category.title}</TableCell>
                                            <TableCell className="text-right">{getSum(category.id, 'outcome')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="col-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-xs">Titre catégorie</TableHead>
                                        <TableHead className="text-xs text-right">Entrées</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.sort(
                                        (a: any, b: any) =>
                                            getSum(b.id, 'income') - getSum(a.id, 'income')
                                    ).map((category: any) => (
                                        <TableRow key={category.id} className="border-orange-50">
                                            <TableCell className="font-medium text-xs">{category.title}</TableCell>
                                            <TableCell className="text-right">{getSum(category.id, 'income')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

        </AuthenticatedLayout>
    )
}

