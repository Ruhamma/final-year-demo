import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'am'],
    defaultLocale: 'am',
});

// Middleware to handle empty pathnames (if needed in runtime logic)
export function handleEmptyPath(path: string) {
    return path === '' ? '/' : path;
}

export type Pathnames = string;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
    createNavigation(routing);
