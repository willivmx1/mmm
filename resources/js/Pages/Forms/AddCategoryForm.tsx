import React from "react";
import * as z from "zod";
import axios from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/Components/ui/form";
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Textarea} from "@/Components/ui/textarea";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {DialogFooter} from "@/Components/ui/dialog";
import {useToast} from "@/Components/ui/use-toast"
import {router} from "@inertiajs/react";

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
    user_id: z.number().int(),
})

export default function AddCategoryForm({auth}: any){
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            user_id: auth.user.id,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await axios.post('/api/categories', {
            title: values.title,
            description: values.description,
            created_at: new Date(),
            user_id: auth.user.id,
        }).then(() => {
            toast({
                title: "Catégorie sauvegardée...",
            })
            router.reload({only: ['categories']})
        }).catch((error: any) => {
            toast({
                variant: "destructive",
                title: "Oooups! quelque chose s'est mal passé.",
                description: error.message,
            })
        })

        document.getElementById('app')?.click()

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                                <Input placeholder="Titre..." {...field} />
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
                                    placeholder="Description..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="submit" className="text-xs p-2.5">Enregistrer</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
