import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const CoffeeFooter: React.FC = () => (
  <footer className="mt-12 flex flex-col gap-3 border-t border-bot-border pt-5 text-xs text-bot-muted sm:flex-row sm:items-center sm:justify-between">
    <p>Direct creator tips on BOT Chain Mainnet.</p>
    <a
      href="https://scan.botchain.ai"
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-10 items-center gap-1 self-start transition-colors hover:text-bot-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent sm:self-auto"
    >
      BOT Chain Explorer <ArrowUpRight aria-hidden="true" size={14} />
    </a>
  </footer>
);

export default CoffeeFooter;
