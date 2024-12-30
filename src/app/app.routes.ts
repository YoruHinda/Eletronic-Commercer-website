import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { AdminComponent } from './views/admin/admin.component';
import { UserGuard } from './guards/UserGuard';
import { AdminGuard } from './guards/AdminGuard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [UserGuard] },
    { path: 'products', component: ProductsComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] }
];
