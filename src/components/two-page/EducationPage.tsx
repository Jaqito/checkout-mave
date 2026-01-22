import * as React from "react";
import { usePlan, PLANS } from "../../context/PlanContext";

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs text-zinc-700">
      {children}
    </span>
  );
}

export default function EducationPage({ onContinue }: { onContinue: () => void }) {
  const { selectedPlan, setSelectedPlan } = usePlan();

  return (
    <div className="min-h-dvh bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
          >
            <span aria-hidden>←</span>
            Back
          </button>
          <div className="text-sm font-semibold text-zinc-900">Your Treatment Plan</div>
          <button
            type="button"
            className="rounded-lg px-2 py-1 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
          >
            Help
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* Hero / Product Intro */}
        <section className="text-center space-y-3">
          <h1 className="text-2xl font-semibold text-zinc-900">Your Semaglutide Treatment</h1>
          <p className="text-sm text-zinc-600 max-w-xl mx-auto">
            Semaglutide is a GLP-1 receptor agonist that helps regulate appetite and blood sugar.
            It's the same active ingredient found in Ozempic® and Wegovy®.
          </p>
        </section>

        {/* What's Included */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">What's included</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Clinician Review", desc: "Licensed provider evaluates your health profile" },
              { title: "Prescription", desc: "If approved, sent to a licensed pharmacy" },
              { title: "Medication", desc: "Compounded semaglutide delivered to your door" },
              { title: "Injection Supplies", desc: "Syringes and alcohol pads included" },
              { title: "Free Shipping", desc: "Discreet packaging, no signature required" },
              { title: "Ongoing Support", desc: "Message your care team anytime" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-900">{item.title}</div>
                  <div className="text-xs text-zinc-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dosing Timeline */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Your dosing schedule</h2>
          <p className="text-sm text-zinc-600 mb-4">
            You'll start at a low dose and gradually increase to minimize side effects.
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { week: "Weeks 1-4", dose: "0.25mg" },
              { week: "Weeks 5-8", dose: "0.5mg" },
              { week: "Weeks 9-12", dose: "1.0mg" },
              { week: "Weeks 13+", dose: "Maintenance" },
            ].map((step, i) => (
              <div key={i} className="shrink-0 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-center min-w-[100px]">
                <div className="text-xs text-zinc-600">{step.week}</div>
                <div className="text-sm font-semibold text-zinc-900 mt-1">{step.dose}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Plan Selection */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Choose your plan</h2>
            <p className="text-sm text-zinc-600 mt-1">Longer plans = lower monthly cost</p>
          </div>

          <div className="grid gap-3">
            {PLANS.map((plan) => {
              const active = selectedPlan.id === plan.id;
              const isRecommended = plan.id === "yearly";
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={[
                    "w-full rounded-2xl border p-4 text-left transition relative",
                    active ? "border-zinc-900 bg-white ring-1 ring-zinc-900" : "border-zinc-200 bg-white hover:border-zinc-300",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-zinc-900">{plan.cadenceLabel}</div>
                        {isRecommended && (
                          <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white">
                            Best value
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-zinc-600">{plan.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-zinc-900">{formatUSD(plan.monthlyPrice)}/mo</div>
                      <div className="mt-1 text-xs text-zinc-600">Billed {formatUSD(plan.billedToday)}</div>
                    </div>
                  </div>
                  {plan.savingsLabel && (
                    <div className="mt-2 text-xs text-emerald-700">{plan.savingsLabel}</div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Trust Badges */}
        <section className="flex flex-wrap justify-center gap-2">
          <Badge>Secure checkout</Badge>
          <Badge>Licensed pharmacy</Badge>
          <Badge>HIPAA compliant</Badge>
          <Badge>HSA/FSA eligible</Badge>
        </section>

        {/* Safety Note */}
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="text-sm font-semibold text-emerald-900">No charge unless approved</div>
          <div className="mt-1 text-xs text-emerald-900/80">
            A licensed clinician will review your health information. You won't be charged unless
            they determine treatment is appropriate for you.
          </div>
        </section>

        {/* CTA */}
        <div className="pt-4 pb-8">
          <button
            onClick={onContinue}
            className="w-full rounded-2xl bg-zinc-900 py-4 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Continue to checkout
          </button>
          <p className="mt-3 text-center text-xs text-zinc-600">
            You won't be charged unless approved by a clinician.
          </p>
        </div>
      </main>
    </div>
  );
}
