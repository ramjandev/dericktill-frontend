import { useState } from "react";

import { WHOP_CHECKOUT_URLS } from "@/config/runtime";
import { RxCheck } from "react-icons/rx";

type BillingCycle = "monthly" | "yearly";

interface SeatPlan {
  seats: number;
  price: number;
  url: string;
}

const INDIVIDUAL_FEATURES = ["1 seat", "Core features", "Email support"];

const BUSINESS_FEATURES = [
  "All individual features",
  "Team billing",
  "Priority support",
];

function SeatDots({ count, filled }: { count: number; filled: number }) {
  return (
    <div className="flex flex-wrap gap-1.5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < filled ? "bg-amber-400" : "bg-slate-700"
          }`}
        />
      ))}
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="mb-8 flex-1 space-y-3 text-sm text-[#C9D2E0]">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-1">
          <span className="text-[#E8A33D] text-2xl">
            <RxCheck />
          </span>
          {feature}
        </li>
      ))}
    </ul>
  );
}

export default function PricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const redirectToCheckout = (url: string) => {
    if (!url) {
      return;
    }

    window.location.href = url;
  };

  const individualPrice = cycle === "monthly" ? 10 : 110;
  const individualUrl =
    cycle === "monthly"
      ? WHOP_CHECKOUT_URLS.individualMonthly
      : WHOP_CHECKOUT_URLS.individualYearly;

  const businessPlans: SeatPlan[] = [
    { seats: 5, price: 25, url: WHOP_CHECKOUT_URLS.business5 },
    { seats: 10, price: 70, url: WHOP_CHECKOUT_URLS.business10 },
  ];

  return (
    <div className=" text-[#F2EFE9] pb-16">
      <div className="">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#E8A33D]">
            Pricing
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Pick your plan
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[#7C8AA5]">
            Simple pricing that scales with your team. Cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setCycle("monthly")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition cursor-pointer ${
                cycle === "monthly"
                  ? "bg-[#E8A33D] text-[#1a1305]"
                  : "text-[#7C8AA5] hover:text-[#F2EFE9]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setCycle("yearly")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition cursor-pointer ${
                cycle === "yearly"
                  ? "bg-[#E8A33D] text-[#1a1305]"
                  : "text-[#7C8AA5] hover:text-[#F2EFE9]"
              }`}
            >
              Yearly
              <span className="ml-1.5 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-semibold text-black">
                Save
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Individual */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-[#16213A] p-7">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Individual</h2>
              <p className="mt-1 text-sm text-[#7C8AA5]">
                For solo builders getting started.
              </p>
            </div>

            <div className="mb-6 flex items-baseline gap-1">
              <span className="font-mono text-4xl font-bold">
                ${individualPrice}
              </span>
              <span className="text-sm text-[#7C8AA5]">
                /{cycle === "monthly" ? "mo" : "yr"}
              </span>
            </div>

            <FeatureList features={INDIVIDUAL_FEATURES} />

            <button
              type="button"
              onClick={() => redirectToCheckout(individualUrl)}
              disabled={!individualUrl}
              className="rounded-lg border border-[#E8A33D] py-2.5 text-center text-sm font-semibold text-[#E8A33D] transition hover:bg-[#E8A33D] hover:text-[#1a1305]"
            >
              {individualUrl ? "Get individual" : "Checkout unavailable"}
            </button>
          </div>

          {/* Business plans */}
          {businessPlans.map((plan) => (
            <div
              key={plan.seats}
              className={`relative flex flex-col rounded-2xl p-7 ${
                plan.seats === 5
                  ? "border-2 border-[#E8A33D] bg-[#16213A]"
                  : "border border-white/10 bg-[#16213A]"
              }`}
            >
              {plan.seats === 5 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#E8A33D] px-3 py-1 text-xs font-semibold text-[#1a1305]">
                  Most popular
                </span>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-semibold">Business</h2>
                <p className="mt-1 text-sm text-[#7C8AA5]">
                  For teams of up to {plan.seats}.
                </p>
              </div>

              <div className="mb-2 flex items-baseline gap-1">
                <span className="font-mono text-4xl font-bold">
                  ${plan.price}
                </span>
                <span className="text-sm text-[#7C8AA5]">/mo</span>
              </div>
              <p className="mb-4 font-mono text-xs text-[#7C8AA5]">
                ${(plan.price / plan.seats).toFixed(2)} per seat
              </p>

              <div className="mb-6">
                <SeatDots count={plan.seats} filled={plan.seats} />
                <p className="mt-2 text-xs text-[#7C8AA5]">
                  {plan.seats} seats included
                </p>
              </div>

              <FeatureList features={BUSINESS_FEATURES} />

              <button
                type="button"
                onClick={() => redirectToCheckout(plan.url)}
                disabled={!plan.url}
                className={`rounded-lg py-2.5 text-center text-sm font-semibold transition ${
                  plan.seats === 5
                    ? "bg-[#E8A33D] text-[#1a1305] hover:bg-[#d4922f]"
                    : "border border-[#E8A33D] text-[#E8A33D] hover:bg-[#E8A33D] hover:text-[#1a1305]"
                }`}
              >
                {plan.url ? "Get business" : "Checkout unavailable"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
