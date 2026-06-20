import TanstackProviders from './tanstack';
import { AuthProvider } from './auth-context';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <TanstackProviders>
            <AuthProvider>{children}</AuthProvider>
        </TanstackProviders>
    );
};
