import { HeaderTitle } from '@/components';
import styles from '../user-dashboard.module.css';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
const Comments = () => {
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='نظرات کاربر' />
            <Card>
                <div className='flex gap-4 p-4 items-start'>
                    <img width={100} height={100} src='/image/product.webp' alt='' />
                    <Typography className='flex-1'>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
                        روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
                        ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، مورد نیاز شامل حروفچینی دستاوردهای اصلی،
                        و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                    </Typography>
                </div>
            </Card>
        </div>
    );
};
export default Comments;
