import Link from "next/link";

const calculators = [
  {
    title: "Mortgage Repayment Calculator",
    description:
      "Estimate your monthly payments, total interest, and loan payoff timeline based on your loan amount, interest rate, and term.",
    bullets: [
      "Monthly payment breakdown",
      "Principal vs interest split",
      "Total cost over the loan lifetime",
    ],
    href: "/calculators/mortgage",
    accent: "bg-emerald-500",
  },
  {
    title: "Compound Interest Calculator",
    description:
      "See how your savings grow over time. Adjust the principal, interest rate, contribution, and compounding frequency.",
    bullets: [
      "Daily, monthly & yearly compounding",
      "Recurring contribution support",
      "Final balance projection chart",
    ],
    href: "/calculators/compound-interest",
    accent: "bg-sky-500",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 flex-col items-center px-6 pb-24 sm:px-16">
        <section className="flex w-full max-w-5xl flex-col items-center py-24 text-center sm:py-32">
          <span className="rounded-full border border-zinc-200 bg-white px-4 py-1 text-sm font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            Free, fast, no sign-up required
          </span>
          <h1 className="mt-8 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-black sm:text-6xl sm:leading-[1.1] dark:text-zinc-50">
            Financial calculators that make the numbers simple.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Plan your mortgage or grow your savings with clear, easy-to-read
            results in seconds. Pick a calculator and see the full picture
            before you commit.
          </p>
        </section>

        <section className="grid w-full max-w-5xl gap-6 sm:grid-cols-2">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-8 transition-colors hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
            >
              <span
                className={`h-1.5 w-12 rounded-full ${calc.accent}`}
                aria-hidden="true"
              />
              <h2 className="mt-6 text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
                {calc.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                {calc.description}
              </p>
              <ul className="mt-6 flex flex-col gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                {calc.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2.5">
                    <svg
                      className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {bullet}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Open calculator
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.2 14.8a1 1 0 0 1 0-1.4L10.6 10 7.2 6.6a1 1 0 1 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}