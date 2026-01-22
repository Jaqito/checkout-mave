import * as React from "react";

export type Plan = {
  id: string;
  name: string;
  cadenceLabel: string;
  monthlyPrice: number;
  billedToday: number;
  savingsLabel?: string;
};

export const PLANS: Plan[] = [
  {
    id: "monthly",
    cadenceLabel: "Monthly",
    name: "Semaglutide (GLP-1)",
    monthlyPrice: 249,
    billedToday: 249,
    savingsLabel: "Most flexible",
  },
  {
    id: "quarterly",
    cadenceLabel: "Quarterly",
    name: "Semaglutide (GLP-1)",
    monthlyPrice: 199,
    billedToday: 597,
    savingsLabel: "Save $150 vs monthly",
  },
  {
    id: "six",
    cadenceLabel: "Six-Month",
    name: "Semaglutide (GLP-1)",
    monthlyPrice: 179,
    billedToday: 1074,
    savingsLabel: "Save $420 vs monthly",
  },
  {
    id: "yearly",
    cadenceLabel: "Yearly",
    name: "Semaglutide (GLP-1)",
    monthlyPrice: 149,
    billedToday: 1788,
    savingsLabel: "Save $1,200 vs monthly",
  },
];

type PlanContextType = {
  selectedPlan: Plan;
  setSelectedPlan: (plan: Plan) => void;
  discount: number;
};

const PlanContext = React.createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [selectedPlan, setSelectedPlan] = React.useState<Plan>(PLANS[3]); // Default to yearly

  // Discount logic - apply $100 off yearly
  const discount = selectedPlan.id === "yearly" ? 100 : 0;

  return (
    <PlanContext.Provider value={{ selectedPlan, setSelectedPlan, discount }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = React.useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}
