import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'addstudent',
    loadChildren: () => import('./addstudent/addstudent.module').then( m => m.AddstudentPageModule)
  },
  {
    path: 'deletestudent',
    loadChildren: () => import('./deletestudent/deletestudent.module').then( m => m.DeletestudentPageModule)
  },
  {
    path: 'module-details',
    loadChildren: () => import('./module-details/module-details.module').then( m => m.ModuleDetailsPageModule)
  },
  {
    path: 'module-details/:moduleNo',
    loadChildren: () => import('./module-details/module-details.module').then( m => m.ModuleDetailsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
