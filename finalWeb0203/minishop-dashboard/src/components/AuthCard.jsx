// กรอบของหน้า Login / Register
export default function AuthCard({ icon: Icon, title, subtitle, children }) {
  return (
    <section className="mx-auto w-full max-w-md py-4">
      <div className="rounded-2xl border border-base-300/60 bg-base-100 p-6 sm:p-8">
        <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-3xl font-normal tracking-tight">{title}</h1>
        <p className="mt-1 text-base-content/60">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
}
