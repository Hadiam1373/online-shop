import { TCookieOptions } from './cookie.type';

class CookieWrapper {
    private defaultOptions: TCookieOptions = {
        path: '/',
        secure: typeof window !== 'undefined' && window.location.protocol === 'https:',
        domain: typeof window !== 'undefined' ? this.getRootDomain() : undefined,
    };

    /**
     * Set a cookie with type safety and validation
     */
    set<T = string>(name: string, value: T, options: TCookieOptions = {}): boolean {
        try {
            if (typeof window === 'undefined') {
                console.warn('CookieManager: Cannot set cookie on server side');
                return false;
            }

            const serializedValue = this.serialize(value);
            const cookieOptions = { ...this.defaultOptions, ...options };
            const cookieString = this.buildCookieString(name, serializedValue, cookieOptions);

            document.cookie = cookieString;
            return true;
        } catch (error) {
            console.error(`Failed to set cookie "${name}":`, error);
            return false;
        }
    }

    /**
     * Get a cookie with type safety and deserialization
     */
    get<T = string>(name: string, defaultValue?: T): T | undefined {
        try {
            if (typeof window === 'undefined') {
                return defaultValue;
            }

            const cookies = this.parseAll();
            const cookie = cookies[name];

            if (cookie === undefined) {
                return defaultValue;
            }

            return this.deserialize<T>(cookie);
        } catch (error) {
            console.error(`Failed to get cookie "${name}":`, error);
            return defaultValue;
        }
    }
    /**
     * Get all cookies that start with a prefix and deserialize their values
     */
    getByPrefix<T = unknown>(prefix: string): Record<string, T> {
        if (typeof window === 'undefined') {
            return {};
        }

        const cookies = this.parseAll();

        const filtered = Object.entries(cookies).filter(([name]) => name.startsWith(prefix));

        return Object.fromEntries(filtered.map(([name, value]) => [name, this.deserialize<T>(value)]));
    }

    /**
     * delete a cookie
     */
    delete(name: string, options: Pick<TCookieOptions, 'path' | 'domain'> = {}): boolean {
        return this.set(name, '', {
            ...options,
            expires: new Date(0),
            maxAge: -1,
        });
    }

    /**
     * Check if a cookie exists
     */
    has(name: string): boolean {
        return this.get(name) !== undefined;
    }

    /**
     * Get all cookies as an object
     */
    getAll(): Record<string, string> {
        if (typeof window === 'undefined') {
            return {};
        }
        return this.parseAll();
    }

    /**
     * delete all cookies
     */
    deleteAll(): void {
        const cookies = this.getAll();
        Object.keys(cookies).forEach(name => {
            this.delete(name);
        });
    }

    /**
     * Serialize value to string
     */
    serialize<T>(value: T): string {
        if (typeof value === 'string') {
            return value;
        }
        return JSON.stringify(value);
    }

    /**
     * Deserialize string to typed value
     */
    deserialize<T>(value: string): T {
        try {
            return JSON.parse(value) as T;
        } catch {
            return value as unknown as T;
        }
    }

    /**
     * Parse all cookies from document.cookie
     */
    parseAll(): Record<string, string> {
        const cookies: Record<string, string> = {};

        if (!document.cookie) {
            return cookies;
        }

        document.cookie.split(';').forEach(cookie => {
            const [name, ...rest] = cookie.trim().split('=');
            if (name && rest.length > 0) {
                cookies[name] = decodeURIComponent(rest.join('='));
            }
        });

        return cookies;
    }

    /**
     * Build cookie string with options
     */
    buildCookieString(name: string, value: string, options: TCookieOptions): string {
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

        if (options.expires) {
            const expires = options.expires instanceof Date ? options.expires : new Date(Date.now() + options.expires * 1000);
            cookieString += `; expires=${expires.toUTCString()}`;
        }

        if (options.maxAge !== undefined) {
            cookieString += `; max-age=${options.maxAge}`;
        }

        if (options.path) {
            cookieString += `; path=${options.path}`;
        }

        if (options.domain) {
            cookieString += `; domain=${options.domain}`;
        }

        if (options.secure) {
            cookieString += '; secure';
        }

        if (options.httpOnly) {
            cookieString += '; httponly';
        }

        if (options.sameSite) {
            cookieString += `; samesite=${options.sameSite}`;
        }

        return cookieString;
    }

    /**
     * Get the root domain for subdomain cookie sharing
     */
    private getRootDomain(): string {
        if (typeof window === 'undefined') return '';

        const hostname = window.location.hostname.replace('www.', '');

        // For localhost or IP addresses, don't set domain
        if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
            return '';
        }

        // For domains like 'example.com' or 'sub.example.com'
        const parts = hostname.split('.');

        // If it's already a root domain (example.com)
        if (parts.length <= 2) {
            return `.${hostname}`;
        }

        // For subdomains (sub.example.com), get the root domain (.example.com)
        return `.${parts.slice(-2).join('.')}`;
    }
}
export const cookieWrapper = new CookieWrapper();
