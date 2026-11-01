const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

const normalizeOrigin = (value?: string) => {
    if (!value) return undefined;

    try {
        return new URL(value).origin;
    } catch {
        return undefined;
    }
};

export const SITE_URL = normalizeOrigin(configuredSiteUrl);
export const METADATA_BASE = SITE_URL ? new URL(SITE_URL) : undefined;
export const API_BASE_URL = (process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000').replace(/\/$/, '');

export const absoluteSiteUrl = (path: string) => (SITE_URL ? new URL(path, SITE_URL).toString() : undefined);
