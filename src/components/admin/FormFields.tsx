export function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  step,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
  step?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        step={step}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="glass mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm text-ink transition-colors focus:border-accent-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
      />
    </div>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="glass mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm text-ink transition-colors focus:border-accent-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
      />
    </div>
  );
}

export function Select({
  label,
  name,
  defaultValue,
  children,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="glass mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm text-ink transition-colors focus:border-accent-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
      >
        {children}
      </select>
    </div>
  );
}

export function Checkbox({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-ink">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-line text-accent-blue focus:ring-accent-blue/30"
      />
      {label}
    </label>
  );
}

export function FormError({ error }: { error: string | null }) {
  if (!error) return null;
  return <p className="alert-danger !px-4 !py-3">{error}</p>;
}
