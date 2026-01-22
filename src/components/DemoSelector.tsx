import * as React from "react";
import CheckoutScaffold from "./CheckoutScaffold";
import TwoPageCheckout from "./two-page/TwoPageCheckout";

type Variant = "selector" | "single-page" | "two-page";

export default function DemoSelector() {
  const [variant, setVariant] = React.useState<Variant>("selector");

  if (variant === "single-page") {
    return (
      <div className="pt-10">
        <DemoBar current="single-page" onSelect={setVariant} />
        <CheckoutScaffold />
      </div>
    );
  }

  if (variant === "two-page") {
    return (
      <div className="pt-10">
        <DemoBar current="two-page" onSelect={setVariant} />
        <TwoPageCheckout />
      </div>
    );
  }

  // Selector view
  return (
    <div className="min-h-dvh bg-zinc-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-zinc-900">Checkout A/B Demo</h1>
          <p className="text-sm text-zinc-600">
            Compare two checkout flow variants for semaglutide treatment
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Variant A - Single Page */}
          <button
            onClick={() => setVariant("single-page")}
            className="rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm hover:border-zinc-300 hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white font-medium">
                A
              </span>
              <h2 className="text-lg font-semibold text-zinc-900">Single Page</h2>
            </div>
            <p className="text-sm text-zinc-600 mb-4">
              Traditional checkout with plan selection and payment on one page. Two-column layout on desktop.
            </p>
            <ul className="text-xs text-zinc-500 space-y-1">
              <li>• All info visible at once</li>
              <li>• Fewer clicks to complete</li>
              <li>• Can feel overwhelming</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-zinc-100">
              <span className="text-sm font-medium text-zinc-900">View demo →</span>
            </div>
          </button>

          {/* Variant B - Two Page */}
          <button
            onClick={() => setVariant("two-page")}
            className="rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm hover:border-zinc-300 hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white font-medium">
                B
              </span>
              <h2 className="text-lg font-semibold text-zinc-900">Two Page</h2>
            </div>
            <p className="text-sm text-zinc-600 mb-4">
              Separate education/plan selection from payment. More focused checkout experience.
            </p>
            <ul className="text-xs text-zinc-500 space-y-1">
              <li>• Education before payment</li>
              <li>• Cleaner checkout page</li>
              <li>• Extra step in flow</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-zinc-100">
              <span className="text-sm font-medium text-zinc-900">View demo →</span>
            </div>
          </button>
        </div>

        <div className="text-center">
          <p className="text-xs text-zinc-500">
            Click either card to preview that checkout variant
          </p>
        </div>
      </div>
    </div>
  );
}

function DemoBar({
  current,
  onSelect,
}: {
  current: "single-page" | "two-page";
  onSelect: (v: Variant) => void;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelect("selector")}
            className="text-sm font-medium hover:text-zinc-300"
          >
            ← Back to selector
          </button>
          <span className="text-zinc-500">|</span>
          <span className="text-sm">
            Viewing: <span className="font-semibold">{current === "single-page" ? "Variant A (Single Page)" : "Variant B (Two Page)"}</span>
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onSelect("single-page")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
              current === "single-page" ? "bg-white text-zinc-900" : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            A: Single
          </button>
          <button
            onClick={() => onSelect("two-page")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
              current === "two-page" ? "bg-white text-zinc-900" : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            B: Two Page
          </button>
        </div>
      </div>
    </div>
  );
}
