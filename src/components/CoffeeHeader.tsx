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
    <a
      href="https://www.botchain.ai/en/"
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center gap-2 self-start text-sm text-bot-muted transition-colors hover:text-bot-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent sm:self-auto"
    >
      Built for BOT Chain <ArrowUpRight aria-hidden="true" size={15} />
    </a>
  </header>
);

export default CoffeeHeader;
