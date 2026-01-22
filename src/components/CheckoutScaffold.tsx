import * as React from "react";

/**
 * Drop-in checkout layout scaffold (Tailwind).
 * - Two-column on desktop (summary left, payment right)
 * - Mobile stacks with sticky CTA
 * - Collapsible sections for reduced scroll
 *
 * Notes:
 * - Replace the placeholder components with your real plan selector + Stripe PaymentElement.
 * - The right column uses sticky positioning on desktop so payment stays in view.
 */

type Plan = {
  id: string;
  name: string;
  cadenceLabel: string; // e.g. "Quarterly"
  monthlyPrice: number; // display only
  billedToday: number;
  savingsLabel?: string;
};

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function Section({
  title,
  children,
  right,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Disclosure({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-zinc-900">{title}</span>
        <span className="text-xs text-zinc-600">{open ? "Hide" : "Show"}</span>
      </button>
      {open ? <div className="border-t border-zinc-200 px-4 py-3">{children}</div> : null}
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs text-zinc-700">
      {children}
    </span>
  );
}

function TrustRow() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Secure checkout</Badge>
      <Badge>Licensed pharmacy</Badge>
      <Badge>No hidden fees</Badge>
      <Badge>Free shipping</Badge>
    </div>
  );
}

function GuaranteeCallout() {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
      <div className="font-semibold">No charge unless approved</div>
      <div className="mt-1 text-xs text-emerald-900/80">
        Your payment method may show a temporary pre-authorization, but you won't be charged if the
        clinician determines treatment isn't right for you.
      </div>
    </div>
  );
}

function OrderSummary({
  billedToday,
  discount,
}: {
  billedToday: number;
  discount: number; // positive number meaning discount amount
}) {
  const totalToday = Math.max(0, billedToday - discount);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-700">Plan total</span>
        <span className="font-medium text-zinc-900">{formatUSD(billedToday)}</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-700">Discount</span>
        <span className="font-medium text-zinc-900">-{formatUSD(discount)}</span>
      </div>

      <div className="h-px w-full bg-zinc-200" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-900">Total today</span>
        <span className="text-lg font-semibold text-zinc-900">{formatUSD(totalToday)}</span>
      </div>
    </div>
  );
}

function PaymentPlaceholder() {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4">
      <div className="text-sm font-semibold text-zinc-900">Stripe Payment Element</div>
      <div className="mt-1 text-xs text-zinc-600">
        Replace this with your &lt;PaymentElement /&gt; container.
      </div>
      <div className="mt-4 grid gap-2">
        <div className="h-10 rounded-lg bg-white" />
        <div className="h-10 rounded-lg bg-white" />
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  selected,
  onSelect,
  recommendedLabel,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
  recommendedLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-full rounded-2xl border p-4 text-left shadow-sm transition",
        selected ? "border-zinc-900 bg-white" : "border-zinc-200 bg-white hover:border-zinc-300",
      ].join(" ")}
      aria-pressed={selected}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-zinc-900">{plan.cadenceLabel}</div>
            {recommendedLabel ? (
              <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white">
                {recommendedLabel}
              </span>
            ) : null}
          </div>
          <div className="mt-1 text-xs text-zinc-600">{plan.name}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-zinc-900">{formatUSD(plan.monthlyPrice)}/mo</div>
          <div className="mt-1 text-xs text-zinc-600">Billed {formatUSD(plan.billedToday)} today</div>
        </div>
      </div>

      {plan.savingsLabel ? (
        <div className="mt-3 text-xs text-zinc-700">{plan.savingsLabel}</div>
      ) : null}
    </button>
  );
}

export default function CheckoutScaffold() {
  const plans: Plan[] = [
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
      savingsLabel: "Best value for most people",
    },
    {
      id: "six",
      cadenceLabel: "Six-Month",
      name: "Semaglutide (GLP-1)",
      monthlyPrice: 179,
      billedToday: 1074,
      savingsLabel: "Lower monthly cost",
    },
    {
      id: "yearly",
      cadenceLabel: "Yearly",
      name: "Semaglutide (GLP-1)",
      monthlyPrice: 149,
      billedToday: 1788,
      savingsLabel: "Lowest monthly cost",
    },
  ];

  const [selectedPlanId, setSelectedPlanId] = React.useState<string>("quarterly");
  const selectedPlan = plans.find((p) => p.id === selectedPlanId) ?? plans[0];

  // Example: if you auto-apply promo, set this dynamically from backend.
  const discount = selectedPlanId === "yearly" ? 100 : 0;

  return (
    <div className="min-h-dvh bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
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

      {/* Main */}
      <main className="mx-auto grid max-w-6xl gap-4 px-4 py-6 lg:grid-cols-12">
        {/* Page header - spans full width */}
        <div className="lg:col-span-12">
          <h1 className="text-xl font-semibold text-zinc-900">Review & checkout</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Confirm your plan and complete secure payment. No charge unless approved.
          </p>
        </div>

        {/* Left column: summary */}
        <div className="space-y-4 lg:col-span-7">
          <Section title="Select plan" right={<span className="text-xs text-zinc-600">Desktop: compare fast</span>}>
            <div className="grid gap-3">
              {plans.map((p) => (
                <PlanCard
                  key={p.id}
                  plan={p}
                  selected={p.id === selectedPlanId}
                  onSelect={() => setSelectedPlanId(p.id)}
                  recommendedLabel={p.id === "yearly" ? "Best value" : undefined}
                />
              ))}
            </div>
          </Section>

          <Section title="Plan summary">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-zinc-900">{selectedPlan.cadenceLabel} Semaglutide</div>
                <div className="mt-1 text-xs text-zinc-600">{selectedPlan.name}</div>
                {selectedPlan.savingsLabel ? (
                  <div className="mt-2 text-xs text-zinc-700">{selectedPlan.savingsLabel}</div>
                ) : null}
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-zinc-900">
                  {formatUSD(selectedPlan.monthlyPrice)}/mo
                </div>
                <div className="mt-1 text-xs text-zinc-600">Billed today: {formatUSD(selectedPlan.billedToday)}</div>
              </div>
            </div>

            <div className="mt-4">
              <TrustRow />
            </div>
          </Section>

          <Disclosure title="What's included" defaultOpen={false}>
            <ul className="space-y-2 text-sm text-zinc-700">
              <li>Clinician-reviewed prescription eligibility</li>
              <li>Medication from a licensed/regulated pharmacy</li>
              <li>Free discreet shipping</li>
              <li>Injection kit included</li>
              <li>Ongoing support</li>
            </ul>
          </Disclosure>

          <Disclosure title="Terms & privacy" defaultOpen={false}>
            <p className="text-xs leading-relaxed text-zinc-600">
              By continuing, you agree to the Terms of Service and Privacy Policy. You attest the
              information provided is accurate and complete. (Replace with your real legal copy.)
            </p>
          </Disclosure>
        </div>

        {/* Right column: payment */}
        <div className="space-y-4 lg:col-span-5">
          <div className="lg:sticky lg:top-[76px] space-y-4">
            <Section title="Payment">
              <PaymentPlaceholder />

              <div className="mt-4">
                <GuaranteeCallout />
              </div>
            </Section>

            <Section title="Order summary">
              <OrderSummary billedToday={selectedPlan.billedToday} discount={discount} />
              {discount > 0 ? (
                <div className="mt-3 text-xs text-zinc-600">Discount applied automatically.</div>
              ) : (
                <button type="button" className="mt-3 text-left text-xs font-medium text-zinc-900 underline">
                  Have a promo code?
                </button>
              )}
            </Section>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <button
                type="submit"
                className="w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Start treatment
              </button>
              <div className="mt-2 text-center text-xs text-zinc-600">No charge unless approved.</div>
            </div>
          </div>
        </div>

        {/* Mobile sticky CTA */}
        <div className="lg:hidden">
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/90 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-xs text-zinc-600">Total today</div>
                <div className="text-sm font-semibold text-zinc-900">
                  {formatUSD(Math.max(0, selectedPlan.billedToday - discount))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Start treatment
              </button>
              <div className="mt-1 text-center text-[11px] text-zinc-600">No charge unless approved.</div>
            </div>
          </div>

          {/* Spacer so content doesn't hide behind sticky bar */}
          <div className="h-24" />
        </div>
      </main>
    </div>
  );
}
