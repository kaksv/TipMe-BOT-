import { useState } from 'react';
import { ethers } from 'ethers';
import { ArrowUpRight, Check, Loader2, Wallet } from 'lucide-react';
import BuyCoffeeForm from './components/BuyCoffeeForm';
import CoffeeFooter from './components/CoffeeFooter';
import CoffeeHeader from './components/CoffeeHeader';
import ThankYouMessage from './components/ThankYouMessage';
import { CoffeeFormData } from './types';
import abi from './utils/CreatorSupportHub.mts';

const BOT_MAINNET_CHAIN_ID = 677n;
const BOT_MAINNET_CHAIN_HEX = '0x2a5';
const BOT_MAINNET = {
  chainId: BOT_MAINNET_CHAIN_HEX,
  chainName: 'BOT Chain Mainnet',
  nativeCurrency: { name: 'BOT', symbol: 'BOT', decimals: 18 },
  rpcUrls: ['https://rpc.botchain.ai'],
  blockExplorerUrls: ['https://scan.botchain.ai'],
};
const contractAddress = import.meta.env.VITE_DIRECT_CREATOR_SUPPORT_ADDRESS
  || '0x3636B7955805ee9af9A974fa883EC39F10701E9D';

type Status = { kind: 'idle' | 'success' | 'error'; message: string };

function isUnknownChainError(error: unknown): boolean {
  return typeof error === 'object'
    && error !== null
    && 'code' in error
    && (error.code === 4902 || error.code === '4902');
}

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [creatorAddress, setCreatorAddress] = useState('');
  const [creatorAddressTouched, setCreatorAddressTouched] = useState(false);
  const [formData, setFormData] = useState<CoffeeFormData | null>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getProvider = async () => {
    if (!window.ethereum) throw new Error('Install a browser wallet to continue.');

    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (typeof currentChainId !== 'string') throw new Error('Could not read the wallet network.');

    if (currentChainId.toLowerCase() !== BOT_MAINNET_CHAIN_HEX) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: BOT_MAINNET_CHAIN_HEX }],
        });
      } catch (error) {
        if (!isUnknownChainError(error)) throw error;

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [BOT_MAINNET],
        });
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: BOT_MAINNET_CHAIN_HEX }],
        });
      }
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    if (network.chainId !== BOT_MAINNET_CHAIN_ID) throw new Error('Switch your wallet to BOT Chain Mainnet to continue.');
    return provider;
  };

  const getContract = async () => {
    if (!ethers.isAddress(contractAddress)) throw new Error('The BOT support contract address is not configured correctly.');
    const provider = await getProvider();
    const signer = await provider.getSigner();
    return { contract: new ethers.Contract(contractAddress, abi, signer), address: await signer.getAddress() };
  };

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      const provider = await getProvider();
      const accounts = await provider.send('eth_requestAccounts', []);
      if (!Array.isArray(accounts) || typeof accounts[0] !== 'string') {
        throw new Error('No wallet account was returned. Please try connecting again.');
      }
      setWalletAddress(accounts[0]);
      setStatus({ kind: 'success', message: 'Connected to BOT Chain Mainnet.' });
    } catch (error) {
      setStatus({ kind: 'error', message: error instanceof Error ? error.message : 'Could not connect wallet.' });
    } finally {
      setIsConnecting(false);
    }
  };

  const appreciate = async (data: CoffeeFormData) => {
    try {
      setStatus({ kind: 'idle', message: '' });
      setCreatorAddressTouched(true);
      if (!ethers.isAddress(creatorAddress)) {
        document.getElementById('creator-address')?.focus();
        throw new Error('Enter a valid BOT wallet address for the creator.');
      }
      if (!walletAddress) throw new Error('Connect your wallet before sending a tip.');
      setIsSubmitting(true);
      const { contract } = await getContract();
      const message = data.name.trim() ? `${data.name}: ${data.memo}` : data.memo;
      const tx = await contract.appreciateCreator(creatorAddress, message, { value: ethers.parseUnits(data.amount, 18) });
      await tx.wait();
      setFormData(data);
      setStatus({ kind: 'success', message: 'Tip confirmed on BOT Chain Mainnet.' });
    } catch (error) {
      setStatus({ kind: 'error', message: error instanceof Error ? error.message : 'Appreciation failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const creatorAddressError = creatorAddressTouched && !ethers.isAddress(creatorAddress)
    ? 'Enter a valid EVM wallet address.'
    : '';

  return (
    <main className="min-h-screen bg-bot-background px-4 py-6 text-bot-foreground sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <CoffeeHeader />
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:gap-12">
          <section className="min-w-0 space-y-8 py-2">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-bot-accent/30 bg-bot-accent/10 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-bot-accent">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-bot-accent" />
                BOT CHAIN MAINNET
              </p>
              <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Support the people building on <span className="text-bot-accent">BOT.</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-bot-muted">
                Send a direct, on-chain tip to a creator. Your tip goes straight to their wallet in BOT.
              </p>
            </div>

            <dl className="max-w-lg divide-y divide-bot-border border-y border-bot-border">
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="text-sm text-bot-muted">Network</dt>
                <dd className="text-sm font-medium">BOT Chain Mainnet</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="text-sm text-bot-muted">Chain ID</dt>
                <dd className="font-mono text-sm tabular-nums">677</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="text-sm text-bot-muted">Tip &amp; gas token</dt>
                <dd className="font-mono text-sm font-semibold tabular-nums">BOT</dd>
              </div>
            </dl>

            <a
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-bot-accent underline-offset-4 transition-colors hover:text-bot-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bot-background"
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noreferrer"
            >
              Explore BOT Chain <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </section>

          <section className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-bot-border bg-bot-surface p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-bot-border bg-bot-elevated text-bot-accent">
                  {walletAddress ? <Check aria-hidden="true" size={18} /> : <Wallet aria-hidden="true" size={18} />}
                </div>
                <div>
                  <p className="text-sm font-medium">{walletAddress ? 'Wallet connected' : 'Connect your wallet'}</p>
                  <p className="mt-1 text-xs text-bot-muted">
                    {walletAddress ? 'Ready to send a BOT tip' : 'Your wallet will switch to BOT Mainnet'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={connectWallet}
                disabled={isConnecting || isSubmitting}
                aria-busy={isConnecting}
                aria-label={walletAddress ? `Connected wallet ${walletAddress}` : 'Connect wallet to BOT Chain Mainnet'}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-bot-accent px-4 py-2 text-sm font-semibold text-bot-accent-foreground transition-colors hover:bg-bot-accent/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bot-surface disabled:cursor-wait disabled:opacity-60"
              >
                {isConnecting && <Loader2 aria-hidden="true" className="animate-spin" size={16} />}
                {isConnecting ? 'Connecting' : walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect wallet'}
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-bot-border bg-bot-surface">
              <div className="border-b border-bot-border px-5 py-5 sm:px-6">
                <h3 className="text-lg font-semibold tracking-tight">Send a tip</h3>
                <p className="mt-1 text-sm text-bot-muted">A direct payment to the creator's wallet.</p>
                <label className="mb-2 mt-5 block text-sm font-medium" htmlFor="creator-address">
                  Creator wallet address <span className="text-bot-muted">(required)</span>
                </label>
                <input
                  id="creator-address"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  spellCheck={false}
                  value={creatorAddress}
                  onBlur={() => setCreatorAddressTouched(true)}
                  onChange={(event) => setCreatorAddress(event.target.value)}
                  placeholder="0x..."
                  aria-invalid={creatorAddressError ? 'true' : undefined}
                  aria-describedby={creatorAddressError ? 'creator-address-error' : 'creator-address-hint'}
                  className="min-h-12 w-full rounded-lg border border-bot-border bg-bot-background px-4 py-3 font-mono text-sm text-bot-foreground placeholder:text-bot-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bot-accent"
                />
                {creatorAddressError ? (
                  <p id="creator-address-error" className="mt-2 text-sm text-bot-danger">{creatorAddressError}</p>
                ) : (
                  <p id="creator-address-hint" className="mt-2 text-xs text-bot-muted">The tip is sent directly to this address.</p>
                )}
              </div>

              {formData ? (
                <div className="p-5 sm:p-6">
                  <ThankYouMessage data={formData} onReset={() => setFormData(null)} />
                </div>
              ) : (
                <div className="p-5 sm:p-6">
                  <BuyCoffeeForm onSubmit={appreciate} isSubmitting={isSubmitting} />
                </div>
              )}
            </div>
          </section>
        </div>

        {status.message && (
          <p
            role={status.kind === 'error' ? 'alert' : 'status'}
            className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
              status.kind === 'error'
                ? 'border-bot-danger/30 bg-bot-danger/10 text-bot-danger'
                : 'border-bot-accent/30 bg-bot-accent/10 text-bot-foreground'
            }`}
          >
            {status.message}
          </p>
        )}
        <CoffeeFooter />
      </div>
    </main>
  );
}

export default App;
