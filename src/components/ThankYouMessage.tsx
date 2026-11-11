import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CoffeeFormData } from '../types';

interface ThankYouMessageProps {
  data: CoffeeFormData;
  onReset: () => void;
}

const ThankYouMessage: React.FC<ThankYouMessageProps> = ({ data, onReset }) => (
  <div className="text-center" role="status">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-bot-accent/30 bg-bot-accent/10 text-bot-accent">
      <CheckCircle2 aria-hidden="true" size={28} />
    </div>
    <h2 className="mt-4 text-xl font-semibold tracking-tight">Tip sent, {data.name}.</h2>
    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-bot-muted">
      <span className="font-mono font-semibold tabular-nums text-bot-foreground">{data.amount} BOT</span> went straight to the creator's wallet.
    </p>

    {data.memo && (
      <blockquote className="mt-5 rounded-lg border border-bot-border bg-bot-background px-4 py-3 text-left text-sm leading-6 text-bot-muted">
        "{data.memo}"
      </blockquote>
    )}

    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={onReset}
        className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-bot-border bg-bot-elevated px-4 py-2 text-sm font-medium transition-colors hover:border-bot-accent/50 hover:text-bot-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bot-surface"
      >
        Send another tip
      </button>
      <a
        href="https://scan.botchain.ai"
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-bot-accent px-4 py-2 text-sm font-semibold text-bot-accent-foreground transition-colors hover:bg-bot-accent/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bot-surface"
      >
        View explorer <ArrowUpRight aria-hidden="true" size={16} />
      </a>
    </div>
  </div>
);

export default ThankYouMessage;
