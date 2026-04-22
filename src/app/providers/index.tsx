import TanstackProviders from "./tanstack";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <TanstackProviders>{children}</TanstackProviders>;
};
