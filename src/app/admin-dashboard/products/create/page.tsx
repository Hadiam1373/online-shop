'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useGetAdminCategories } from '@/lib/api/admin/admin.query.categories';
import { useState } from 'react';
import styles from '../../admin-dashboard.module.css';
import { useCreateProductModel } from '../products.model';

export default function CreateProductPage() {
    const { form, onSubmit, isCreating, watch, setValue, attributesFieldArray } = useCreateProductModel();
    const { register, handleSubmit } = form;
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const { data: categories } = useGetAdminCategories();

    const images = watch('images');

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages: string[] = [...(images || [])];
        const newPreviews: string[] = [...imagePreviews];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = event => {
                const result = event.target?.result as string;
                newImages.push(result);
                newPreviews.push(result);
                if (i === files.length - 1) {
                    setValue('images', newImages);
                    setImagePreviews(newPreviews);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const removeImage = (index: number) => {
        const updatedImages = images?.filter((_: any, i: number) => i !== index) || [];
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        setValue('images', updatedImages);
        setImagePreviews(updatedPreviews);
    };

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='ایجاد محصول' />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full grid grid-cols-3 gap-5'>
                    <Input label='نام محصول' {...register('name')} placeholder='نام محصول' required />
                    <Input label='قیمت' {...register('price')} type='number' placeholder='قیمت' required />
                    <Input label='موجودی' {...register('stock')} type='number' placeholder='موجودی' required />
                    <Select onValueChange={e => setValue('categoryId', e)} {...register('categoryId')} required>
                        <SelectTrigger className='h-9 w-full rounded-lg border border-transparent bg-input/50 px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30'>
                            <SelectValue placeholder='انتخاب دسته‌بندی' />
                        </SelectTrigger>
                        <SelectContent>
                            {categories?.data?.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Textarea label='توضیحات' className='w-full cols-span-3' {...register('description')} placeholder='توضیحات' />

                <div className='w-full rounded-xl border border-border bg-muted/30 p-4 space-y-3'>
                    <div className='font-medium text-sm text-foreground'>ویژگی‌های محصول</div>
                    {attributesFieldArray.fields.map((field, index) => (
                        <div key={field.id} className='grid gap-2 md:grid-cols-[1fr_1fr_auto] items-end'>
                            <Input label='کلید' {...register(`attributes.${index}.key` as const)} placeholder='کلید' />
                            <Input label='مقدار' {...register(`attributes.${index}.value` as const)} placeholder='مقدار' />
                            <Button
                                type='button'
                                variant='outline'
                                size='sm'
                                className='h-10'
                                onClick={() => attributesFieldArray.remove(index)}
                                disabled={attributesFieldArray.fields.length <= 1}
                            >
                                حذف
                            </Button>
                        </div>
                    ))}
                    <Button type='button' variant='ghost' size='sm' onClick={() => attributesFieldArray.append({ key: '', value: '' })}>
                        افزودن ویژگی جدید
                    </Button>
                </div>

                <div className='w-full'>
                    <div className='rounded-xl border-2 border-dashed border-border p-6 text-center hover:border-primary/40 transition-colors'>
                        <input type='file' multiple accept='image/*' onChange={handleImageSelect} className='hidden' id='image-input' />
                        <label htmlFor='image-input' className='cursor-pointer'>
                            <div className='text-sm text-muted-foreground'>عکس‌ها را انتخاب کنید</div>
                        </label>
                    </div>

                    {imagePreviews.length > 0 && (
                        <div className='grid grid-cols-4 gap-4 mt-4'>
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className='relative'>
                                    <img src={preview} alt={`Preview ${index}`} className='size-24 object-cover rounded-xl' />
                                    <button
                                        type='button'
                                        onClick={() => removeImage(index)}
                                        className='absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs'
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles['form_wrapper--submit_wrapper']}>
                    <Button type='submit' disabled={isCreating}>
                        ایجاد
                    </Button>
                </div>
            </form>
        </div>
    );
}
