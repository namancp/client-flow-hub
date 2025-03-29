import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BadgeDollarSign,
  Target,
  CalendarClock,
  Award,
  TrendingUp,
  EditIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category:
    | "retirement"
    | "education"
    | "home"
    | "travel"
    | "emergency"
    | "other";
  completed: boolean;
}

const mockGoals: FinancialGoal[] = [
  {
    id: "1",
    name: "Retirement Fund",
    targetAmount: 800000,
    currentAmount: 325000,
    targetDate: "2045-01-01",
    category: "retirement",
    completed: false,
  },
  {
    id: "2",
    name: "College Education",
    targetAmount: 120000,
    currentAmount: 85000,
    targetDate: "2030-09-01",
    category: "education",
    completed: false,
  },
  {
    id: "3",
    name: "Emergency Fund",
    targetAmount: 30000,
    currentAmount: 30000,
    targetDate: "2023-12-31",
    category: "emergency",
    completed: true,
  },
  {
    id: "4",
    name: "Down Payment",
    targetAmount: 60000,
    currentAmount: 15000,
    targetDate: "2025-06-30",
    category: "home",
    completed: false,
  },
];

export const FinancialPlanning = () => {
  const [initialVar, setInitialVar] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getTimeRemaining = (dateString: string) => {
    const targetDate = new Date(dateString);
    const currentDate = new Date();

    const diffInMonths =
      (targetDate.getFullYear() - currentDate.getFullYear()) * 12 +
      (targetDate.getMonth() - currentDate.getMonth());

    if (diffInMonths <= 0) return "Expired";
    if (diffInMonths < 12)
      return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""}`;

    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;

    if (months === 0) return `${years} year${years !== 1 ? "s" : ""}`;
    return `${years} year${years !== 1 ? "s" : ""}, ${months} month${
      months !== 1 ? "s" : ""
    }`;
  };

  const getCategoryIcon = (category: FinancialGoal["category"]) => {
    switch (category) {
      case "retirement":
        return <BadgeDollarSign className="h-5 w-5 text-blue-600" />;
      case "education":
        return <Award className="h-5 w-5 text-purple-600" />;
      case "home":
        return <Target className="h-5 w-5 text-green-600" />;
      case "travel":
        return <TrendingUp className="h-5 w-5 text-amber-600" />;
      case "emergency":
        return <BadgeDollarSign className="h-5 w-5 text-red-600" />;
      default:
        return <Target className="h-5 w-5 text-gray-600" />;
    }
  };
  const setModal = () => {
 
    setInitialVar(initialVar+5)
    setIsOpen(!isOpen);
  };
  return (
    <div className="space-y-6">
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50" onClick={setModal}>
          <div
            className="w-1/3 bg-gray-900 text-white h-full p-8 transform transition-all duration-300 ease-in-out translate-x-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-xl font-semibold">Modal Title</h2>
            <p className="mt-4">This is a simple modal using Tailwind CSS.</p>
            <input 
              type="text"
              className="w-full mt-4 p-2 bg-gray-800 text-white border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="mt-4">This is a 2nd simple modal using Tailwind CSS.</p>
            <input
              type="text"
              className="w-full mt-4 p-2 bg-gray-800 text-white border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="mt-6 gap-1 flex justify-end">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={setModal}>
                Close
              </button>
              <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={setModal}>
                Confirm_Botton
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Financial Planning
          </h2>
          <p className="text-muted-foreground">
            Track progress towards your financial goals
          </p>
        </div>
        <Button onClick={setModal}>
          <Target className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGoals.map((goal) => {
          const progress = calculateProgress(
            goal.currentAmount,
            goal.targetAmount
          );

          return (
            <Card
              key={goal.id}
              className={cn(
                "overflow-hidden transition-all duration-300 border card-hover",
                goal.completed
                  ? "border-l-financial-positive border-l-4"
                  : "border-l-primary border-l-4"
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {getCategoryIcon(goal.category)}
                    <CardTitle className="text-xl font-medium ml-2">
                      {goal.name}
                    </CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <EditIcon className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Target: {formatCurrency(goal.targetAmount)} by{" "}
                  {formatDate(goal.targetDate)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>
                        {formatCurrency(goal.currentAmount)}
                        <span className="text-muted-foreground ml-1">
                          of {formatCurrency(goal.targetAmount)}
                        </span>
                      </span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress
                      value={progress}
                      className={goal.completed ? "bg-muted h-2" : "h-2"}
                      indicatorClassName={
                        goal.completed ? "bg-financial-positive" : undefined
                      }
                    />
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarClock className="h-4 w-4 mr-1.5" />
                    {goal.completed ? (
                      <span className="text-financial-positive font-medium">
                        Completed
                      </span>
                    ) : (
                      <span>{getTimeRemaining(goal.targetDate)} remaining</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
