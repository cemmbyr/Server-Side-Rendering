import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const BultenContext = createContext({
  applyEventItems: [],
  setApplyEventItems: () => {},
});

const BultenProvider = ({ children }) => {
  const [applyEventItems, setApplyEventItems] = useState([]);
  const store = useMemo(() => ({ applyEventItems, setApplyEventItems }), [applyEventItems]);

  return (
    <BultenContext.Provider value={store}>
      {children}
    </BultenContext.Provider>
  );
};

BultenProvider.propTypes = {
  children: PropTypes.node,
};

export default BultenProvider;
