import { Routes } from '@angular/router';
import { Dashboard }     from './dashboard/dashboard';
import { MenuUpload }    from './menu-upload/menu-upload';
import { Responses }     from './responses/responses';
import { CommentsView }  from './comments-view/comments-view';

export const routes: Routes = [
  { path: '',              component: Dashboard    },
  { path: 'menu-upload',  component: MenuUpload   },
  { path: 'responses',    component: Responses    },
  { path: 'comments-view',component: CommentsView },
];
