import { usePlan } from "../../context/PlanContext";

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function CheckoutPage({ onBack }: { onBack: () => void }) {
  const { selectedPlan, discount } = usePlan();
  const totalToday = Math.max(0, selectedPlan.billedToday - discount);

  return (
    <div className="min-h-dvh bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
          >
            <span aria-hidden>←</span>
            Back
          </button>
          <div className="text-sm font-semibold text-zinc-900">Secure Checkout</div>
          <button
            type="button"
            className="rounded-lg px-2 py-1 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
          >
            Help
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left - Summary */}
          <div className="space-y-4">
            <h1 className="text-xl font-semibold text-zinc-900">Complete your order</h1>

            {/* Plan Summary Card */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-zinc-900 mb-3">Plan summary</h2>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-zinc-900">
                    {selectedPlan.cadenceLabel} Semaglutide
                  </div>
                  <div className="mt-1 text-xs text-zinc-600">{selectedPlan.name}</div>
                  {selectedPlan.savingsLabel && (
                    <div className="mt-2 text-xs text-emerald-700">{selectedPlan.savingsLabel}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-zinc-900">
                    {formatUSD(selectedPlan.monthlyPrice)}/mo
                  </div>
                </div>
              </div>
              <button
                onClick={onBack}
                className="mt-3 text-xs font-medium text-zinc-600 underline"
              >
                Change plan
              </button>
            </section>

            {/* Order Summary */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-zinc-900 mb-3">Order summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Plan total</span>
                  <span className="text-zinc-900">{formatUSD(selectedPlan.billedToday)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Discount</span>
                    <span className="text-emerald-600">-{formatUSD(discount)}</span>
                  </div>
                )}
                <div className="h-px bg-zinc-200 my-2" />
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-zinc-900">Total today</span>
                  <span className="text-lg font-semibold text-zinc-900">{formatUSD(totalToday)}</span>
                </div>
              </div>
            </section>

            {/* Guarantee */}
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="text-sm font-semibold text-emerald-900">No charge unless approved</div>
              <div className="mt-1 text-xs text-emerald-900/80">
                Your payment method may show a temporary pre-authorization, but you won't be
                charged if the clinician determines treatment isn't right for you.
              </div>
            </section>
          </div>

          {/* Right - Payment */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-zinc-900 mb-4">Payment method</h2>

              {/* Stripe Placeholder */}
              <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4">
                <div className="text-sm font-medium text-zinc-700">Stripe PaymentElement</div>
                <div className="mt-1 text-xs text-zinc-500">
                  Replace with &lt;PaymentElement /&gt;
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-10 rounded-lg bg-white border border-zinc-200" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 rounded-lg bg-white border border-zinc-200" />
                    <div className="h-10 rounded-lg bg-white border border-zinc-200" />
                  </div>
                </div>
              </div>

              {/* HSA/FSA Note */}
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-600">
                <span className="rounded bg-zinc-100 px-1.5 py-0.5 font-medium">HSA/FSA</span>
                <span>Eligible expense</span>
              </div>
            </section>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-zinc-900 py-4 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Start treatment — {formatUSD(totalToday)}
            </button>

            <p className="text-center text-xs text-zinc-500">
              Secure checkout • 256-bit encryption
            </p>
          </div>
        </div>
      </main>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-600">Total today</span>
            <span className="text-sm font-semibold text-zinc-900">{formatUSD(totalToday)}</span>
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-zinc-900 py-3 text-sm font-semibold text-white"
          >
            Start treatment
          </button>
        </div>
      </div>
      <div className="lg:hidden h-28" /> {/* Spacer for mobile sticky */}
    </div>
  );
}
