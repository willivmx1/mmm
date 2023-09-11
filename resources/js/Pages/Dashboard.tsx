import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import * as React from "react";
import {
    AlertCircle,
    ArrowLeftFromLine,
    ArrowRightFromLine,
    BookPlus,
    DollarSign,
    ThumbsUp
} from "lucide-react";
import 'bootstrap/scss/bootstrap-grid.scss';
import {
    Card,
    CardContent,
} from "@/Components/ui/card"
import AddOperationForm from "@/Pages/Forms/AddOperationForm";
import {Alert, AlertDescription, AlertTitle} from "@/Components/ui/alert"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip"

export default function Dashboard({auth, categories, operations}: any) {

    const formatAmount = (amount: number) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " CFA";
    }
    const totalOperations = () => {
        let total = 0;
        for (let i = 0; i < operations.length; i++) {
            if (operations[i].type === "income") {
                total += operations[i].amount;
            } else {
                total -= operations[i].amount;
            }
        }
        return total;
    }
    const totalIncome = () => {
        let total = 0;
        for (let i = 0; i < operations.length; i++) {
            if (operations[i].type === "income") {
                total += operations[i].amount;
            }
        }
        return total;
    }
    const totalOutcome = () => {
        let total = 0;
        for (let i = 0; i < operations.length; i++) {
            if (operations[i].type === "outcome") {
                total += operations[i].amount;
            }
        }
        return total;
    }
    const formatDate = (date: Date) => {
        date = new Date(date);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return day + "/" + month + "/" + year;
    }

    const getProgressionOperation = () => {
        let yesterdayTotalOperations = 0;
        let todayTotalOperations = 0;
        let progression = 0;
        let progressionPercentage = 0;
        for (let i = 0; i < operations.length; i++) {
            if ( formatDate(operations[i].created_at) === formatDate(getYesterdaysDate())) {
                if (operations[i].type === "income") {
                    yesterdayTotalOperations += operations[i].amount;
                } else {
                    yesterdayTotalOperations -= operations[i].amount;
                }
            }
            if (formatDate(operations[i].created_at) === formatDate(new Date())) {
                if (operations[i].type === "income") {
                    todayTotalOperations += operations[i].amount;
                } else {
                    todayTotalOperations -= operations[i].amount;
                }
            }
        }
        progression = todayTotalOperations - yesterdayTotalOperations;
        progressionPercentage = (progression / yesterdayTotalOperations) * 100;
        return truncateFloat(progressionPercentage);
    }

    const getProgressionIncomeOutcomeByMonth = (type: string) => {
        let lastMonthTotalIncome = 0;
        let thisMonthTotalIncome = 0;
        let progression = 0;
        let progressionPercentage = 0;
        for (let i = 0; i < operations.length; i++) {
            if (new Date(operations[i].created_at).getMonth() === getLastMonthDate().getMonth()) {
                if (operations[i].type === type) {
                    lastMonthTotalIncome += operations[i].amount;
                }
            }
            if (new Date(operations[i].created_at).getMonth() === new Date().getMonth()) {
                if (operations[i].type === type) {
                    thisMonthTotalIncome += operations[i].amount;
                }
            }
        }
        progression = thisMonthTotalIncome - lastMonthTotalIncome;
        progressionPercentage = (progression / lastMonthTotalIncome) * 100;
        if (progressionPercentage === Infinity) {
            return 100;
        }
        return truncateFloat(progressionPercentage);
    }
    const getYesterdayTotalOperations = () => {
        let yesterdayTotalOperations = 0;
        for (let i = 0; i < operations.length; i++) {
            if ( formatDate(operations[i].created_at) === formatDate(getYesterdaysDate())) {
                if (operations[i].type === "income") {
                    yesterdayTotalOperations += operations[i].amount;
                } else {
                    yesterdayTotalOperations -= operations[i].amount;
                }
            }
        }
        return yesterdayTotalOperations;
    }
    const getLastMonthTotalIncomeOutcome = (type: string) => {
        let lastMonthTotalIncome = 0;
        for (let i = 0; i < operations.length; i++) {
            if (new Date(operations[i].created_at).getMonth() === getLastMonthDate().getMonth()) {
                if (operations[i].type === type) {
                    lastMonthTotalIncome += operations[i].amount;
                }
            }
        }
        return lastMonthTotalIncome;
    }

    const getLastMonthDate = () => {
        let date = new Date();
        if (date.getMonth() === 0) {
            date.setMonth(11);
            date.setFullYear(date.getFullYear() - 1);
        } else {
            date.setMonth(date.getMonth() - 1);
        }
        return date;
    }
    const getAlert = () => {
        return totalOutcome() > totalIncome() ?
            (<Alert variant="destructive" role="alert">
                <AlertCircle className="h-4 w-4"/>
                <AlertTitle className="font-bold">Attention !</AlertTitle>
                <AlertDescription className="text-sm">Vous dépensez plus que vous ne gagnez, corrigez le tir.</AlertDescription>
            </Alert>) : (<Alert
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <ThumbsUp className="text-green-500 h-4 w-4"/>
                <AlertTitle className="font-bold">Bien joué !</AlertTitle>
                <AlertDescription className="text-sm">Vous gagnez plus que vous ne dépensez, continuez sur cette route.</AlertDescription>
            </Alert>)
    }
    const getYesterdaysDate = () => {
        let date = new Date();
        date.setDate(date.getDate() - 1);
        return date;
    }

    const truncateFloat = (number: number) => {
        return Math.trunc(number * 100) / 100;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vue d'ensemble</h2>}
            actionButtons={[{
                title: "Ajouter une opération",
                description: "Ajouter une opération à votre historique.",
                icon: <BookPlus size={18}/>,
                content: <AddOperationForm auth={auth} categories={categories}/>,
            }]}
        >
            <Head title="Dashboard"/>
            <div className="row gap-6 justify-center">
                {displayCards(
                    "Solde actuel",
                    <DollarSign/>,
                    <h1 className="text-3xl font-bold">{formatAmount(totalOperations())}</h1>,
                    <p className="text-xs font-normal"><span className={`${getProgressionOperation() >=0 ? "text-green-500" : "text-red-500"}`}>{getProgressionOperation() >= 0 ? `+${getProgressionOperation()}`: getProgressionOperation()}%</span> par
                        rapport <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><span className="underline">à hier</span></TooltipTrigger>
                                <TooltipContent>
                                    <p>{formatAmount(getYesterdayTotalOperations())}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </p>
                )}
                {displayCards(
                    "Total des entrées",
                    <ArrowLeftFromLine/>,
                    <h1 className="text-3xl font-bold">{formatAmount(totalIncome())}</h1>,
                    <p className="text-xs font-normal"><span className={`${getProgressionIncomeOutcomeByMonth('income') >=0 ? "text-green-500" : "text-red-500"}`}>{getProgressionIncomeOutcomeByMonth('income') >= 0 ? `+${getProgressionIncomeOutcomeByMonth('income')}`: getProgressionIncomeOutcomeByMonth('income')}%</span> par
                        rapport <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><span className="underline">au mois dernier</span></TooltipTrigger>
                                <TooltipContent>
                                    <p>{formatAmount(getLastMonthTotalIncomeOutcome('income'))}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider></p>
                )}
                {displayCards(
                    "Total des sorties",
                    <ArrowRightFromLine/>,
                    <h1 className="text-3xl font-bold">{formatAmount(totalOutcome())}</h1>,
                    <p className="text-xs font-normal"><span className={`${getProgressionIncomeOutcomeByMonth('outcome') <= 0 ? "text-green-500" : "text-red-500"}`}>{getProgressionIncomeOutcomeByMonth('outcome') >= 0 ? `+${getProgressionIncomeOutcomeByMonth('outcome')}`: getProgressionIncomeOutcomeByMonth('outcome')}%</span> par
                        rapport <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><span className="underline">au mois dernier</span></TooltipTrigger>
                                <TooltipContent>
                                    <p>{formatAmount(getLastMonthTotalIncomeOutcome('outcome'))}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider></p>
                )}
            </div>
            <div className="row mt-4 w-full flex justify-center items-center">
                <div className="col-md-12 col-lg-8">{getAlert()}</div>
            </div>

        </AuthenticatedLayout>
    );
}

function displayCards(title: string, icon: React.ReactNode, content: React.ReactNode, footer: React.ReactNode) {
    return (
        <Card className="col-sm-3 shadow hover:cursor-pointer hover:-translate-y-1 transition-all w-auto break-all px-0">
            <CardContent className="w-full p-3">
                <div className="flex justify-between w-full">
                    <span className="text-xs font-bold">{title}</span>
                    {React.cloneElement(icon as React.ReactElement, {size: 14, strokeWidth: 1.5})}
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

