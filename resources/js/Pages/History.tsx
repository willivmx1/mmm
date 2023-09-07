import * as React from "react"
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import {PageProps} from "@/types";

export default function History({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Historique</h2>}
        >
            <Head title="Historique" />
            <h1>
                Historique
            </h1>
        </AuthenticatedLayout>
    )
}
