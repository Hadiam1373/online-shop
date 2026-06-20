# سیستم Authorization و دسترسی کاربری

## نمای کلی

این سیستم درخواست کاربر برای مدیریت دسترسی بر اساس نقش (Role-Based Access Control - RBAC) است. پس از لاگین، کاربر بر اساس نقشش (ADMIN، OPERATOR، یا USER) دسترسی‌های مختلفی دریافت می‌کند.

---

## اجزاء اصلی

### 1. **AuthContext** (`src/providers/auth-context.tsx`)

- مدیریت حالت (state) کاربر و نقش‌اش
- فراهم کردن hook `useAuth()` برای دسترسی به اطلاعات کاربر
- ایجاد hook `useAuthGuard()` برای بررسی دسترسی

**استفاده:**

```typescript
const { user, role, isAuthenticated, hasRole, logout } = useAuth();
```

### 2. **Authorization Utilities** (`src/lib/authorization.ts`)

- تعریف نقش‌ها و دسترسی‌ها
- توابع بررسی دسترسی به مسیرها و عملیات

**توابع اصلی:**

- `hasPermission(role, permission)` - بررسی دسترسی به عملیات
- `canAccessRoute(role, route)` - بررسی دسترسی به مسیر
- `getRoleLabel(role)` - دریافت نام نقش به فارسی

### 3. **Permission Hooks** (`src/hooks/usePermission.ts`)

- `usePermission(permission)` - بررسی دسترسی کاربر
- `useCanAccessRoute(route)` - بررسی دسترسی به مسیر
- `useUserPermissions()` - دریافت تمام دسترسی‌های کاربر
- `useLogout()` - لاگ‌آوت کاربر

### 4. **Protected Components** (`src/components/route-protection/protected-route.tsx`)

- `ProtectedRoute` - محافظت کامپوننت‌ها
- `AdminRoute` - محافظت مسیرهای ادمینی
- `UserRoute` - محافظت مسیرهای کاربری

---

## نقش‌ها و دسترسی‌ها

### ADMIN

- مدیریت کاملِ محصولات، دسته‌بندی‌ها، کوپن‌ها
- مدیریت سفارشات، پرداخت‌ها، نظرات
- مدیریت کاربران
- دسترسی به داشبورد و گزارش‌ها

### OPERATOR

- مدیریت محصولات و دسته‌بندی‌ها
- مدیریت سفارشات
- دسترسی به داشبورد و گزارش‌ها
- **بدون دسترسی به:** مدیریت کاربران، مدیریت پرداخت‌ها

### USER

- مشاهده محصولات
- ایجاد سفارش
- مشاهده سفارشات خود
- ایجاد نظر/دیدگاه

---

## نحوه استفاده

### 1. **بررسی دسترسی در کامپوننت‌ها**

```typescript
import { usePermission } from '@/hooks/usePermission';

export default function ProductManagement() {
  const { canAccess } = usePermission('manage_products');

  if (!canAccess) {
    return <div>دسترسی رد شد</div>;
  }

  return <div>صفحه مدیریت محصولات</div>;
}
```

### 2. **محافظت مسیرهای ادمینی**

```typescript
import { AdminRoute } from '@/components/route-protection/protected-route';

export default function AdminDashboard() {
  return (
    <AdminRoute>
      <div>محتوای فقط برای ادمین‌ها</div>
    </AdminRoute>
  );
}
```

### 3. **دسترسی به اطلاعات کاربر**

```typescript
import { useAuth } from '@/providers/auth-context';

export default function Header() {
  const { user, role, logout } = useAuth();

  return (
    <div>
      <p>خوش آمدید، {user?.email}</p>
      <p>نقش: {role}</p>
      <button onClick={logout}>خروج</button>
    </div>
  );
}
```

### 4. **بررسی نقش‌های مختلف**

```typescript
import { useAuth } from '@/providers/auth-context';

export default function Navigation() {
  const { hasRole } = useAuth();

  return (
    <div>
      {hasRole(['ADMIN', 'OPERATOR']) && (
        <a href="/admin-dashboard">پنل مدیریت</a>
      )}

      {hasRole('USER') && (
        <a href="/user-dashboard">داشبورد کاربر</a>
      )}
    </div>
  );
}
```

---

## جریان لاگین

### پیش از تغییر:

1. کاربر OTP را وارد می‌کند
2. توکن‌ها ذخیره می‌شوند
3. کاربر به صفحه‌ای ثابت هدایت می‌شود

### بعد از تغییر:

1. کاربر OTP را وارد می‌کند
2. توکن‌ها ذخیره می‌شوند
3. **پروفایل کاربر دریافت می‌شود** ⭐
4. **بر اساس نقش (role)، کاربر هدایت می‌شود:**
    - ADMIN/OPERATOR → `/admin-dashboard`
    - USER → `/user-dashboard`

### کد مربوطه (`login.model.ts`):

```typescript
const userProfile = await queryClient.fetchQuery({
    queryKey: ['user-profile'],
    queryFn: () => getUserProfile(),
});

if (userProfile?.role === 'ADMIN' || userProfile?.role === 'OPERATOR') {
    router.push('/admin-dashboard');
} else {
    router.push('/user-dashboard');
}
```

---

## ساختار فایل‌ها

```
src/
├── providers/
│   ├── auth-context.tsx          # AuthContext و useAuth hook
│   └── index.tsx                 # Providers wrapper
├── components/
│   ├── route-protection/
│   │   └── protected-route.tsx   # ProtectedRoute, AdminRoute, UserRoute
│   └── ...
├── hooks/
│   ├── usePermission.ts          # Permission hooks
│   └── ...
├── lib/
│   ├── authorization.ts          # Authorization utilities
│   └── ...
└── ...
```

---

## نکات مهم

1. **AuthProvider باید در سطح ریشه‌ای (root) استفاده شود** - در `providers/index.tsx`

2. **useAuth را تنها درون AuthProvider استفاده کنید** - در غیر این صورت خطای "useAuth must be used within AuthProvider" دریافت می‌کنید

3. **دسترسی‌ها می‌تواند توسع یابند** - برای اضافه کردن دسترسی جدید، آن را به `ROLE_PERMISSIONS` در `authorization.ts` اضافه کنید

4. **Logout کاربر توکن‌ها را حذف می‌کند** - و AuthContext خودکار آپدیت می‌شود

---

## مثال‌های پیشرفته

### شرطی نمایش دکمه‌ی حذف

```typescript
import { usePermission } from '@/hooks/usePermission';

export default function ProductCard({ product }) {
  const { canAccess } = usePermission('manage_products');

  return (
    <div>
      <h3>{product.name}</h3>
      {canAccess && (
        <button onClick={() => deleteProduct(product.id)}>حذف</button>
      )}
    </div>
  );
}
```

### محافظت مسیر کاملاً سفارشی

```typescript
import { useAuthGuard } from '@/providers/auth-context';
import { useRouter } from 'next/navigation';

export default function SpecialPage() {
  const { canAccess } = useAuthGuard(['ADMIN']);
  const router = useRouter();

  if (!canAccess) {
    router.push('/');
    return null;
  }

  return <div>فقط برای ادمین‌ها</div>;
}
```

---

## تغییرات اعمال‌شده

✅ **AuthContext ایجاد شد** - مدیریت کاملِ دسترسی  
✅ **Authorization utilities ایجاد شد** - تعریف نقش‌ها و دسترسی‌ها  
✅ **Permission hooks ایجاد شد** - برای بررسی دسترسی‌ها  
✅ **Protected components ایجاد شد** - محافظت مسیرها  
✅ **Login flow بهبود یافت** - هدایت بر اساس نقش  
✅ **Admin layout آپدیت شد** - استفاده از AuthContext

---

## نوشتار بعدی (Optional)

- ایجاد middleware برای بررسی توکن در سرور
- ایجاد error boundary برای مدیریت خطاهای authorization
- ایجاد page برای "Access Denied" سفارشی‌تر
