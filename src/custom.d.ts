// File should be a module. For this file should have an import or export statement
import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CAMPAIGN_FACTORY_ADDRESS?: string;
    }
  }
}
