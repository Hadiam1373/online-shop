type TableProps = {
    theadData: THeadData[];
};

type THeadData = {
    title: string;
    hasSort?: boolean;
};

type TBodyData = {};

const Table: React.FC = () => {
    return (
        <table className='w-full'>
            <thead>
                <tr className='h-12 bg-accent'>
                    <th>ردیف</th>
                    <th>نام محصول</th>
                    <th>قیمت</th>
                    <th>وضعیت سفارش</th>
                    <th>موجودی</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>تست</td>
                    <td>100000</td>
                    <td>موجود</td>
                    <td>فعال</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>تست</td>
                    <td>100000</td>
                    <td>موجود</td>
                    <td>فعال</td>
                </tr>
            </tbody>
        </table>
    );
};
