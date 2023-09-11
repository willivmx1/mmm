import React from "react";
import * as z from "zod";
import axios from "axios";
import {useToast} from "@/Components/ui/use-toast"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/Components/ui/form";
import {Input} from "@/Components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import {Button} from "@/Components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandSeparator
} from "@/Components/ui/command";
import {ScrollArea} from "@/Components/ui/scroll-area";
import AddCategoryForm from "@/Pages/Forms/AddCategoryForm";
import {Textarea} from "@/Components/ui/textarea";
import {DialogFooter} from "@/Components/ui/dialog";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {router, usePage} from "@inertiajs/react";


const formSchema = z.object({
    title: z.string().min(2, {
        message: "Le titre doit contenir au moins 2 caractères."
    }).max(100, {
        message: "Le titre doit contenir au plus 100 caractères."
    }),
    description: z.string().min(2, {
        message: "La description doit contenir au moins 2 caractères."
    }).max(500, {
        message: "La description doit contenir au plus 500 caractères."
    }),
    amount: z.string().min(1, {
        message: "Le montant ne peut pas être nul"
    }),
    type: z.enum(['income', 'outcome']),
    category: z.number().min(1, {
        message: "Sélectionnez une categorie"
    }),
})

export default function AddOperationForm({auth, categories}: any) {
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            amount: '0',
        },
    })

    categories.sort((a: any, b: any) => b.id - a.id)
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await axios.post('/api/operations', {
            title: values.title,
            description: values.description,
            amount: parseInt(values.amount),
            type: values.type,
            category_id: values.category > 0 ? values.category : 0,
            created_at: new Date()
        }).then(() => {
            toast({
                title: "Opération sauvegardée...",
            })
            router.reload({only: ['operations']})
        }).catch((error: any) => {
            toast({
                variant: "destructive",
                title: "Oooups! quelque chose s'est mal passé.",
                description: error.message,
            })
        })


    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Titre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Donnez un titre cool à cette opération..." {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="row my-3">
                        <div className="col-sm-6">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Montant</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-sm-6">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Type d'opération"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="income">Entrée</SelectItem>
                                                    <SelectItem value="outcome">Sortie</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="category"
                        render={({field}) => (
                            <FormItem className="flex flex-col my-3">
                                <FormLabel>Catégorie</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? categories.find(
                                                            (category: any) => category.id === field.value
                                                        )?.title
                                                        : "Select category"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Rechercher une catégorie"/>
                                                <CommandEmpty>Catégorie non trouvée...</CommandEmpty>
                                                <ScrollArea className="h-[140px] w-full">
                                                    <CommandGroup>
                                                        {categories.map((category: any) => (
                                                            <CommandItem
                                                                value={category.id}
                                                                key={category.id}
                                                                onSelect={() => {
                                                                    form.setValue("category", category.id)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        category.id === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {category.title}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                    <CommandSeparator/>
                                                </ScrollArea>
                                                <CommandGroup>
                                                    <div className="p-0">
                                                        <Popover>
                                                            <PopoverTrigger
                                                                className="w-full">
                                                                <CommandItem
                                                                    className="flex justify-center items-center hover:cursor-pointer px-0 rounded">
                                                                    + Ajouter une catégorie
                                                                </CommandItem>
                                                            </PopoverTrigger>
                                                            <PopoverContent
                                                                className="translate-x-[90%]"><AddCategoryForm
                                                                auth={auth}/></PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Dites en un peu plus sur cette opération..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit" className="text-xs p-2.5 mt-3">Enregistrer</Button>
                    </DialogFooter>

            </form>
        </Form>
    )
}
