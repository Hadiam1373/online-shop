'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { TProductsSort } from '@/lib/api/admin/admin.products.dto';
import { ICategory } from '@/lib/api/categories/categories.dto';
import { cn } from '@/lib/utils';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const SORT_OPTIONS: { value: TProductsSort; label: string }[] = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'price-asc', label: 'ارزان‌ترین' },
    { value: 'price-desc', label: 'گران‌ترین' },
];

const selectClassName =
    'h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-sm text-foreground outline-none transition-[color,box-shadow,background-color] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30';

interface ProductFiltersProps {
    categories?: ICategory[];
    searchInput: string;
    setSearchInput: (value: string) => void;
    categoryId: string;
    setCategoryId: (value: string) => void;
    minPrice: string;
    setMinPrice: (value: string) => void;
    maxPrice: string;
    setMaxPrice: (value: string) => void;
    sort: TProductsSort;
    setSort: (value: TProductsSort) => void;
    hasActiveFilters: boolean;
    clearFilters: () => void;
}

const Chip = ({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) => (
    <button
        type='button'
        onClick={onRemove}
        className='group flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground transition-colors hover:border-destructive/40 hover:text-destructive'
    >
        {children}
        <X className='size-3.5 text-muted-foreground transition-colors group-hover:text-destructive' />
    </button>
);

export const ProductFilters = ({
    categories,
    searchInput,
    setSearchInput,
    categoryId,
    setCategoryId,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sort,
    setSort,
    hasActiveFilters,
    clearFilters,
}: ProductFiltersProps) => {
    const selectedCategory = categories?.find(cat => cat.id === categoryId);

    return (
        <div className='flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 md:p-5'>
            <div className='flex items-center gap-2 text-muted-foreground'>
                <SlidersHorizontal className='size-4 text-primary' />
                <Typography variant='body2' weight='bold' className='text-foreground'>
                    فیلتر و جستجو
                </Typography>
            </div>

            <div className='flex flex-wrap items-center gap-3'>
                <div className='relative min-w-[200px] flex-1'>
                    <Search className='pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        placeholder='جستجوی محصول...'
                        className='pr-9'
                    />
                </div>

                <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className={cn(selectClassName, 'sm:w-44')}>
                    <option value=''>همه دسته‌بندی‌ها</option>
                    {categories?.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <div className='flex items-center gap-2'>
                    <Input
                        type='number'
                        min={0}
                        inputMode='numeric'
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                        placeholder='از قیمت'
                        className='w-28'
                    />
                    <span className='text-muted-foreground'>تا</span>
                    <Input
                        type='number'
                        min={0}
                        inputMode='numeric'
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                        placeholder='تا قیمت'
                        className='w-28'
                    />
                </div>

                <select
                    value={sort}
                    onChange={e => setSort(e.target.value as TProductsSort)}
                    className={cn(selectClassName, 'sm:w-32')}
                >
                    {SORT_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {hasActiveFilters && (
                    <Button variant='ghost' size='sm' onClick={clearFilters} className='gap-1 text-muted-foreground'>
                        <X className='size-4' />
                        حذف فیلترها
                    </Button>
                )}
            </div>

            {hasActiveFilters && (
                <div className='flex flex-wrap items-center gap-2 border-t border-border pt-3'>
                    {searchInput && <Chip onRemove={() => setSearchInput('')}>جستجو: {searchInput}</Chip>}
                    {selectedCategory && <Chip onRemove={() => setCategoryId('')}>{selectedCategory.name}</Chip>}
                    {minPrice && <Chip onRemove={() => setMinPrice('')}>از {Number(minPrice).toLocaleString('fa')} تومان</Chip>}
                    {maxPrice && <Chip onRemove={() => setMaxPrice('')}>تا {Number(maxPrice).toLocaleString('fa')} تومان</Chip>}
                </div>
            )}
        </div>
    );
};
