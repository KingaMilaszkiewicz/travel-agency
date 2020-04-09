import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';

const OrderOptionText = ({currentValue, setOptionValue}) => (
  <div className={styles.text}>
    <input 
      type='text' 
      value={currentValue} 
      onChange={event => setOptionValue(event.currentTarget.value)} 
    />
  </div>
);


OrderOptionText.propTypes = {
  values: PropTypes.array,
  required: PropTypes.bool,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;