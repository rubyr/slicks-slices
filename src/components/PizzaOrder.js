import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => (
  <>
    <p>{order.length} items</p>
    {order.map((singleOrder, index) => {
      const pizza = pizzas.find((za) => za.id === singleOrder.id);
      return (
        <MenuItemStyles key={singleOrder.id + singleOrder.size + index}>
          <Img fluid={pizza.image.asset.fluid} />
          <h2>{pizza.name}</h2>
          <p>
            {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
          </p>
          <button
            type="button"
            className="remove"
            title={`Remove ${singleOrder.size} ${pizza.name} from order`}
            onClick={() => removeFromOrder(index)}
          >
            &times;
          </button>
        </MenuItemStyles>
      );
    })}
  </>
);

export default PizzaOrder;
