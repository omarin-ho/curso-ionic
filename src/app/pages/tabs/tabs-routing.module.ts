import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/account',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        children: [
          {
            path: 'account',
            loadChildren: () => import('../avatar/avatar.module').then(m => m.AvatarPageModule)
          },
          {
            path: 'contact',
            loadChildren: () => import('../list/list.module').then(m => m.ListPageModule)
          },
          {
            path: 'settings',
            loadChildren: () => import('../infinite/infinite.module').then(m => m.InfinitePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/schedule',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
