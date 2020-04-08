import React from 'react';
import styles from './OrderOption.scss';
import { formatPrice } from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const OrderOptionNumber = ({currentValue, limits, price, setOptionValue}) => (
  <div className={styles.number}>
    <input 
      className={styles.inputSmall} 
      type='number' 
      value={currentValue} 
      min={limits.min}
      max={limits.max} 
      onChange={event => setOptionValue(event.currentTarget.value)} 
    /> {formatPrice(price)}
  </div>
);


OrderOptionNumber.propTypes = {
  values: PropTypes.array,
  required: PropTypes.bool,
  currentValue: PropTypes.number,
  setOptionValue: PropTypes.func,
  limits: PropTypes.object,
  price: PropTypes.string,
};

export default OrderOptionNumber;