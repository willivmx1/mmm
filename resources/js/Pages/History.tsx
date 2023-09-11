import * as React from "react"
import {Head, usePage} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {ArrowUpDown, ChevronDown, MoreHorizontal, ArrowLeftFromLine, ArrowRightFromLine, BookPlus} from "lucide-react"
import {Button} from "@/Components/ui/button"
import {Checkbox} from "@/Components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {Input} from "@/Components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/Components/ui/hover-card"
import {Badge} from "@/Components/ui/badge"
import axios from "axios";
import AddOperationForm from "@/Pages/Forms/AddOperationForm";

export type Operation = {
    id: string
    title: string
    description: string
    amount: number
    status: "income" | "outcome"
    created_at: string
    category_id: number
}

export type Category = {
    id: string
    title: string
    description: string
}
const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
export const columns: ColumnDef<Operation>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({column}) => {
            return (
                <div className="flex items-center gap-1 hover:cursor-pointer text-right"
                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Titre
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </div>
            )
        },
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({row}) => {
            return (
                <HoverCard>
                    <HoverCardTrigger>
                        {truncate(row.getValue("description"), 20)}
                        <HoverCardContent>
                            {row.getValue("description")}
                        </HoverCardContent>
                    </HoverCardTrigger>
                </HoverCard>
            )
        },
    },
    {
        accessorKey: "amount",
        header: ({column}) => {
            return (
                <div className="flex items-center gap-1 hover:cursor-pointer text-right"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Montant
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const amount = parseFloat(row.getValue("amount"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "CFA",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "type",
        header: ({column}) => {
            return (
                <div className="flex items-center gap-1 hover:cursor-pointer text-right"
                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </div>
            )
        },
        cell: ({row}) => <div className="font-medium">{row.getValue("type") === 'income' ? <span
            className="mr-2 text-xs font-bold flex items-center justify-center w-[80px] gap-1"><ArrowRightFromLine
            size={14} className="text-green-500"/> Entrée</span> : <span
            className="mr-2 text-xs font-bold flex items-center justify-center w-[80px] gap-1"><ArrowLeftFromLine
            size={14} className="text-red-500"/> Sortie</span>}</div>,
    },
    {
        accessorKey: "created_at",
        header: ({column}) => {
            return (
                <div className="flex items-center gap-1 hover:cursor-pointer text-right"
                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const showDate = (date: string) => {
                const dateObj = new Date(date)
                return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`
            }

            return <div className="font-medium">{showDate(row.getValue("created_at"))}</div>
        }
        ,
    },
    {
        accessorKey: "category_id",
        header: ({column}) => {
            return (
                <div className="flex items-center gap-1 hover:cursor-pointer text-right"
                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Catégorie
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const getCategoryTitle = (id: number) => {
                const {categories}: any = usePage().props
                const category = categories.find((category: any) => category.id === id)
                return category.title
            }

            return(
                <HoverCard>
                    <HoverCardTrigger>
                        {truncate(getCategoryTitle(row.getValue("category_id")), 20)}
                        <HoverCardContent>
                            {getCategoryTitle(row.getValue("category_id"))}
                        </HoverCardContent>
                    </HoverCardTrigger>
                </HoverCard>
            )
        }
        ,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function History({auth, operations, categories}: any) {
    operations.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const data: Operation[] = operations;

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Historique</h2>}
            actionButtons={[{
                title: "Ajouter une opération",
                description: "Ajouter une opération à votre historique.",
                icon: <BookPlus size={18}/>,
                content: <AddOperationForm auth={auth} categories={categories}/>,
            }]}
        >
            <Head title="Historique"/>
            <div className="w-full">
                <div className="flex items-center py-3">
                    <Input
                        placeholder="Filtrer par titre..."
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Colonnes <ChevronDown className="ml-2 h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className="hover:cursor-pointer">
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell className="text-xs py-2" key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        Aucune opération trouvée.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} parmi{" "}
                        {table.getFilteredRowModel().rows.length} colonnes sélectionnées.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Suivant
                        </Button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}


