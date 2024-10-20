"use client";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { baseSepolia } from "viem/chains";
import { useRouter } from "next/navigation";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { createOrUpdateUser } from "@/actions/authActions";

const config = createConfig({
  chains: [baseSepolia],

  multiInjectedProviderDiscovery: false,
  transports: {
    [baseSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function DynamicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <DynamicContextProvider
      settings={{
        handlers: {
          handleAuthenticatedUser: async ({ user }) => {
            console.log("Authenticated user:", user);
            if (
              user.verifiedCredentials &&
              user.verifiedCredentials.length > 0
            ) {
              const address = user.verifiedCredentials.find(
                (cred) => cred.format === "blockchain"
              )?.address;
              const email = user.email;
              if (address && email) {
                try {
                  await createOrUpdateUser({ address, email });
                  console.log("User created or updated successfully");
                } catch (error) {
                  console.error("Error creating or updating user:", error);
                }
              }
            }
          },
        },
        events: {
          onAuthSuccess: () => {
            router.push("/goals");
          },
        },
        environmentId: "b50b74f7-74c0-4e1a-b6d1-aa94595ca609",
        walletConnectors: [EthereumWalletConnectors],
        walletConnectPreferredChains: [`eip155:${baseSepolia.id}`],
        recommendedWallets: [
          {
            walletKey: "coinbase",
          },
        ],
        newToWeb3WalletChainMap: {
          primary_chain: "evm",
          wallets: {
            evm: "coinbase",
          },
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}