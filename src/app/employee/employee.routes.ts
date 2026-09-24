import { Routes } from '@angular/router';
import { Dashboard }      from './dashboard/dashboard';
import { MenuView }       from './menu-view/menu-view';
import { Comments }       from './comments/comments';
import { Response }       from './response/response';
import { PaymentHistory } from './payment-history/payment-history';

export const routes: Routes = [
  { path: '',               component: Dashboard      },
  { path: 'menu-view',      component: MenuView       },
  { path: 'payment-history',component: PaymentHistory },
  { path: 'comments',       component: Comments       },
  { path: 'response',       component: Response       },
];
