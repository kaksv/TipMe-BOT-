import React from 'react';
import { ArrowUpRight, Bot } from 'lucide-react';

const CoffeeHeader: React.FC = () => (
  <header className="flex flex-col gap-5 border-b border-bot-border pb-6 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-bot-accent/30 bg-bot-accent/10 text-bot-accent">
        <Bot aria-hidden="true" size={24} strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-bot-accent">CREATOR SUPPORT</p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight">Tip Me</h1>
      </div>
    </div>
    <nav aria-label="BOT Chain resources" className="flex flex-wrap items-center gap-2">
      <a
        href="https://botchain.ai"
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-bot-border bg-bot-surface px-4 text-sm font-medium text-bot-foreground transition-colors hover:border-bot-accent/50 hover:bg-bot-elevated hover:text-bot-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bot-background"
      >
        BOT Chain <ArrowUpRight aria-hidden="true" size={15} />
      </a>
      <a
        href="https://scan.botchain.ai"
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-bot-border bg-bot-surface px-4 text-sm font-medium text-bot-foreground transition-colors hover:border-bot-accent/50 hover:bg-bot-elevated hover:text-bot-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bot-background"
      >
        Explorer <ArrowUpRight aria-hidden="true" size={15} />
      </a>
    </nav>
  </header>
);

export default CoffeeHeader;
