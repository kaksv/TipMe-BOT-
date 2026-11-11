import React, { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { CoffeeFormData, FormErrors } from '../types';
import { validateForm } from '../utils/validators';

interface BuyCoffeeFormProps {
  onSubmit: (data: CoffeeFormData) => Promise<void>;
  isSubmitting: boolean;
}

const quickAmounts = ['1', '5', '10'];

const BuyCoffeeForm: React.FC<BuyCoffeeFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<CoffeeFormData>({
    name: '',
    memo: '',
    amount: '1',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    const fieldErrors = validateForm(formData);
    setErrors((previous) => ({
      ...previous,
      [name]: fieldErrors[name as keyof FormErrors],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      document.getElementById(Object.keys(formErrors)[0])?.focus();
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} aria-busy={isSubmitting} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Your name <span className="text-bot-muted">(required)</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          spellCheck={false}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          placeholder="Name shown with your tip"
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="min-h-12 w-full rounded-lg border border-bot-border bg-bot-background px-4 py-3 text-sm text-bot-foreground placeholder:text-bot-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent disabled:opacity-60"
        />
        {errors.name && <p id="name-error" className="mt-2 text-sm text-bot-danger">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="memo" className="mb-2 block text-sm font-medium">Message <span className="text-bot-muted">(optional)</span></label>
        <textarea
          id="memo"
          name="memo"
          value={formData.memo}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          placeholder="Add a note for the creator"
          rows={3}
          aria-invalid={errors.memo ? 'true' : undefined}
          aria-describedby={errors.memo ? 'memo-error' : undefined}
          className="w-full resize-y rounded-lg border border-bot-border bg-bot-background px-4 py-3 text-sm text-bot-foreground placeholder:text-bot-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent disabled:opacity-60"
        />
        {errors.memo && <p id="memo-error" className="mt-2 text-sm text-bot-danger">{errors.memo}</p>}
      </div>

      <div>
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Tip amount <span className="text-bot-muted">(BOT)</span>
        </label>
        <div className="flex min-h-12 items-center rounded-lg border border-bot-border bg-bot-background px-4 focus-within:ring-2 focus-within:ring-bot-accent">
          <input
            type="text"
            inputMode="decimal"
            id="amount"
            name="amount"
            autoComplete="off"
            spellCheck={false}
            value={formData.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={errors.amount ? 'true' : undefined}
            aria-describedby={errors.amount ? 'amount-error' : 'amount-hint'}
            className="min-w-0 flex-1 border-0 bg-transparent py-3 pr-3 font-mono text-base tabular-nums text-bot-foreground focus-visible:outline-none disabled:opacity-60"
          />
          <span className="font-mono text-sm font-semibold tabular-nums text-bot-accent">BOT</span>
        </div>
        {errors.amount ? (
          <p id="amount-error" className="mt-2 text-sm text-bot-danger">{errors.amount}</p>
        ) : (
          <p id="amount-hint" className="mt-2 text-xs text-bot-muted">Tips and network fees are paid in BOT.</p>
        )}

        <div className="mt-3 flex flex-wrap gap-2" aria-label="Suggested tip amounts">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setFormData((previous) => ({ ...previous, amount }))}
              disabled={isSubmitting}
              aria-pressed={formData.amount === amount}
              className={`min-h-10 min-w-14 rounded-lg border px-3 text-sm font-mono tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bot-surface disabled:cursor-not-allowed disabled:opacity-50 ${
                formData.amount === amount
                  ? 'border-bot-accent/50 bg-bot-accent/10 text-bot-accent'
                  : 'border-bot-border bg-bot-elevated text-bot-muted hover:border-bot-accent/50 hover:text-bot-foreground'
              }`}
            >
              {amount} BOT
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-bot-accent px-4 py-3 text-sm font-semibold text-bot-accent-foreground transition-colors hover:bg-bot-accent/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bot-surface disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <Send aria-hidden="true" size={18} />}
        {isSubmitting ? 'Sending tip...' : 'Send BOT tip'}
      </button>
    </form>
  );
};

export default BuyCoffeeForm;
