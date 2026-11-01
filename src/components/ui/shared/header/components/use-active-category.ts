'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useActiveCategory = () => {
    const pathname = usePathname();
    const [activeCategoryId, setActiveCategoryId] = useState('');

    useEffect(() => {
        const syncCategoryFromUrl = () => {
            setActiveCategoryId(new URLSearchParams(window.location.search).get('categoryId') ?? '');
        };

        syncCategoryFromUrl();
        window.addEventListener('popstate', syncCategoryFromUrl);
        return () => window.removeEventListener('popstate', syncCategoryFromUrl);
    }, [pathname]);

    return { activeCategoryId, setActiveCategoryId };
};
