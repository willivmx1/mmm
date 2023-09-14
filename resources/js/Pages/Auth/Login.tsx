import { useEffect, FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button";


export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <Card className="shadow-2xl w-[80%] m-0 border-none text-gray-800 ">
                <CardHeader>
                    <CardTitle className="font-bold text-lg">Se connecter</CardTitle>
                    <CardDescription className="text-gray-800 text-xs">Veuillez renseigner vos identifiants de connexion</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-gray-800 text-sx"/>
                            <Input id="email"
                                   type="email"
                                   name="email"
                                   value={data.email}
                                   className="mt-1 block w-full text-gray-900 h-8"
                                   autoComplete="username"
                                   onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Mot de passe" className="text-gray-800 text-sx"/>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full text-gray-900 h-8"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}

                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600 text-gray-800">Remember me</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end mt-4 gap-5 w-full">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-gray-800 underline text-xs text-gray-600 hover:text-gray-900 rounded-md hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    mot de passe oublié?
                                </Link>
                            )}

                            <PrimaryButton className="ml-4" disabled={processing}>
                                <Link href="/login" className="text-xs capitalize ">Se connecter</Link>
                            </PrimaryButton>
                        </div>
                    </form>
                </CardContent>
              </Card>
        </GuestLayout>
    );
}
