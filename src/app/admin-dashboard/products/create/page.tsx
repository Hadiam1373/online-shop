'use client';
import { HeaderTitle } from '@/components';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import styles from '../../admin-dashboard.module.css';
import { useCreateProductModel } from '../products.model';
import { useEffect, useState } from 'react';

export default function CreateProductPage() {
    const { form, onSubmit, isCreating, watch, setValue, attributesFieldArray } = useCreateProductModel();
    const { register, handleSubmit } = form;
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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
            <form onSubmit={handleSubmit(onSubmit)} className={styles['form_wrapper--inputs']}>
                <Input {...register('name')} placeholder='نام محصول' required />
                <Textarea {...register('description')} placeholder='توضیحات' />
                <Input {...register('price')} type='number' placeholder='قیمت' required />
                <Input {...register('stock')} type='number' placeholder='موجودی' required />
                <Input {...register('categoryId')} placeholder='دسته‌بندی (id)' required />

                <div className='w-full rounded border border-gray-200 p-4 space-y-3'>
                    <div className='font-medium text-sm'>ویژگی‌های محصول</div>
                    {attributesFieldArray.fields.map((field, index) => (
                        <div key={field.id} className='grid gap-2 md:grid-cols-[1fr_1fr_auto] items-end'>
                            <Input {...register(`attributes.${index}.key` as const)} placeholder='کلید' />
                            <Input {...register(`attributes.${index}.value` as const)} placeholder='مقدار' />
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
                    <div className='border-2 border-dashed rounded p-4 text-center'>
                        <input type='file' multiple accept='image/*' onChange={handleImageSelect} className='hidden' id='image-input' />
                        <label htmlFor='image-input' className='cursor-pointer'>
                            <div className='text-sm text-gray-600'>عکس‌ها را انتخاب کنید</div>
                        </label>
                    </div>

                    {imagePreviews.length > 0 && (
                        <div className='grid grid-cols-4 gap-4 mt-4'>
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className='relative'>
                                    <img src={preview} alt={`Preview ${index}`} className='size-24 object-cover rounded' />
                                    <button
                                        type='button'
                                        onClick={() => removeImage(index)}
                                        className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs'
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
