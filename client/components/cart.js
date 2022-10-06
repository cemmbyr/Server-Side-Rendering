import React, { useContext } from 'react';
import { BultenContext } from '../context/context';

const Cart = () => {
  const { applyEventItems } = useContext(BultenContext);
  const sumRate = applyEventItems.reduce((pre, curr) => pre + Number(curr.rate), 0);

  return (
    <div className="cart">
      {applyEventItems.map(
        (
          {
            id,
            matchName,
            bultenKey,
            rate,
            mbs,
          },
          index,
        ) => {
          return (
            <div className={`${index + 1 === applyEventItems.length && 'cart-last_item'} cart-wrapper`}>
              <div>
                <span>4</span>
                <span>Kod: {id}</span>
                <span>Maç: {matchName}</span>
              </div>
              <div>
                <span>Oran: {rate}</span>
                <span>MBS: {mbs}</span>
                <span>Tür: {bultenKey}</span>
              </div>
            </div>
          );
        },
      )}
      <div className="cart-sum" data-testid="sum">Toplam Tutar: {sumRate}</div>
    </div>
  );
};

export default Cart;
