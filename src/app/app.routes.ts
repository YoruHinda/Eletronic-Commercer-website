import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { AdminComponent } from './views/admin/admin.component';
import { UserGuard } from './guards/UserGuard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'admin', component: AdminComponent, canActivate: [UserGuard] }
];
