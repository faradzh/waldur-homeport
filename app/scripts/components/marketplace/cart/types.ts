import { Product } from '@waldur/marketplace/types';

export type OrderState = 'Configure' | 'Approve' | 'Review';

export interface State {
  items: Product[];
  state: OrderState;
}
