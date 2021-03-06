import * as React from 'react';

import { Link } from '@waldur/core/Link';
import { defaultCurrency } from '@waldur/core/services';
import { Product } from '@waldur/marketplace/types';

import './ShoppingCartItem.scss';

interface ShoppingCartItemProps {
  item: Product;
  editable: boolean;
}

export const ShoppingCartItem = (props: ShoppingCartItemProps) => (
  <tr>
    <td>
      <div className="product-item">
        <Link
          state="marketplace-product"
          className="product-thumb">
          <img src={props.item.thumb}/>
        </Link>
        <div className="product-info">
          <h4 className="product-title">
          <Link state="marketplace-product">
            {props.item.title}
          </Link>
          </h4>
          <p>
            <b>Details:</b> {props.item.subtitle}
          </p>
        </div>
      </div>
    </td>
    <td className="text-center text-lg">
      {defaultCurrency(props.item.price)}
    </td>
    {props.editable && (
      <td className="text-center">
        <span className="btn-group">
          <a className="btn btn-outline btn-success">
            Edit
          </a>
        </span>
      </td>
    )}
  </tr>
);
