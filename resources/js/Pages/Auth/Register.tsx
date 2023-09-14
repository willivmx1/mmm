import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/Components/ui/card";
import {Input} from "@/Components/ui/input";
import Checkbox from "@/Components/Checkbox";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <Card className="shadow-2xl w-[80%] m-0 border-none text-gray-800 ">
                <CardHeader>
                    <CardTitle className="font-bold text-lg">S'inscrire</CardTitle>
                    <CardDescription className="text-gray-800 text-xs">Veuillez renseigner vos informations</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Nom d'utilisateur" className="text-xs" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full h-8"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="email" value="Email" className="text-xs" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full h-8"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="password" value="Mot de passe" className="text-xs"/>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full h-8"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="password_confirmation" value="Confirmation du mot de passe" className="text-xs"/>

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full h-8"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-2">
                            <Link
                                href={route('login')}
                                className="underline text-xs text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Vous avez déja un compte?
                            </Link>

                            <PrimaryButton className="ml-4" disabled={processing}>
                                <Link href="/register" className="text-xs capitalize ">S'enregistrer</Link>
                            </PrimaryButton>
                        </div>
                    </form>
                </CardContent>
            </Card>


        </GuestLayout>
    );
}
