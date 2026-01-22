import * as React from "react";
import { PlanProvider } from "../../context/PlanContext";
import EducationPage from "./EducationPage";
import CheckoutPage from "./CheckoutPage";

export default function TwoPageCheckout() {
  const [step, setStep] = React.useState<"education" | "checkout">("education");

  return (
    <PlanProvider>
      {step === "education" ? (
        <EducationPage onContinue={() => setStep("checkout")} />
      ) : (
        <CheckoutPage onBack={() => setStep("education")} />
      )}
    </PlanProvider>
  );
}
