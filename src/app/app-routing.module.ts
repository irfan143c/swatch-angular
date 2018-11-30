import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './shared/auth/auth-guard.service';
import { UsersComponent } from './components/users/users.component';
import { DashboradComponent } from './components/dashborad/dashborad.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { ChangeLogComponent } from './changelog/changelog.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path : 'dashboard', component : DashboradComponent },
  { path : 'users', component : UsersComponent },
  { path : 'facilities', component : FacilitiesComponent },
  { path : 'error', component : ErrorComponent },
  { path : 'login', component : LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full'},

  // { path: '', component: OneColumnLayoutComponent, data: { title: '' }, children: ONE_COLUMN_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: TwoColumnsLayoutComponent, data: { title: '' }, children: TWO_COLUMN_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: BoxedLayoutComponent, data: { title: '' }, children: BOXED_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: DarkLayoutComponent, data: { title: '' }, children: DARK_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: DetachedLeftSidebarLayoutComponent, data: { title: '' }, children: DETACHED_LEFT_SIDEBAR_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: DetachedRightSidebarLayoutComponent, data: { title: '' }, children: DETACHED_RIGHT_SIDEBAR_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: DetachedStickyLeftSidebarLayoutComponent, data: { title: '' }, children: DETACHED_STICKY_LEFT_SIDEBAR_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: DetachedStickyRightSidebarLayoutComponent, data: { title: '' }, children: DETACHED_STICKY_RIGHT_SIDEBAR_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: FixedLayoutComponent, data: { title: '' }, children: FIXED_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: FixedNavbarFooterLayoutComponent, data: { title: '' }, children: FIXED_NAVBAR_FOOTER_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: FixedNavbarLayoutComponent, data: { title: '' }, children: FIXED_NAVBAR_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: FixedNavbarNavigationLayoutComponent, data: { title: '' }, children: FIXED_NAVBAR_NAVIGATION_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: FixedNavigationLayoutComponent, data: { title: '' }, children: FIXED_NAVIGATION_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: LightLayoutComponent, data: { title: '' }, children: LIGHT_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: SemiDarkLayoutComponent, data: { title: '' }, children: SEMI_DARK_ROUTES, canActivate: [AuthGuard] },
  // { path: '', component: StaticLayoutComponent, data: { title: '' }, children: STATIC_ROUTES, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
