'use client';
import { Typography } from '@/components/ui/typography';
import { useWishlist } from './whishlist.model';
import { HeaderTitle } from '@/components/header-title/header-title';
import { Card } from '@/components/ui/card';
import styles from '../user-dashboard.module.css';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pagination } from '@/components/ui/pagination';

const Whishlist = () => {
    const { wishlist, isPending, handleremoveWishlist, openModal, setOpenModal, page, setPage } = useWishlist();
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='محصولات مورد علاقه ' />
            <div className='grid grid-cols-2 gap-4'>
                {isPending
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <div className='flex gap-4' key={index}>
                              <Skeleton className='h-36 flex-1' />
                          </div>
                      ))
                    : wishlist?.data?.map(item => (
                          <Card className='p-4' key={item.id}>
                              <div className='flex '>
                                  <img src={item.product.images[0]} alt={item.product.name} className='h-16 w-16 rounded object-cover' />
                                  <div className='flex flex-col gap-2 items-start'>
                                      <Typography weight='bold'>{item?.product?.name}</Typography>
                                      <Typography>قیمت : {item?.product?.price}</Typography>
                                  </div>
                              </div>
                              <div className='flex gap-3 items-center'>
                                  <Dialog open={openModal} onOpenChange={setOpenModal}>
                                      <DialogTrigger asChild>
                                          <Button variant='outline'>حذف از لیست</Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                          <DialogHeader>
                                              <DialogTitle>
                                                  <Typography>آیا از حذف این محصول از لیست مورد علاقه مطمئن هستید؟</Typography>
                                              </DialogTitle>
                                          </DialogHeader>
                                          <div className='flex gap-2'>
                                              <Button variant='secondary' onClick={() => handleremoveWishlist(item.product.id)}>
                                                  بلی
                                              </Button>
                                              <Button onClick={() => setOpenModal(false)}>خیر</Button>
                                          </div>
                                      </DialogContent>
                                  </Dialog>
                                  <Button>افزودن به سبد خرید</Button>
                              </div>
                          </Card>
                      ))}
            </div>
            <div className='flex w-full justify-center items-center mt-10'>
                <Pagination currentPage={page} onPageChange={setPage} totalPages={wishlist?.pagination?.pages || 1} />
            </div>
        </div>
    );
};
export default Whishlist;
