import React from 'react';
import styles from './OrderOption.scss';
import { formatPrice } from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const newValueSet = (currentValue, id, checked) => {
  if(checked){
    return [
      ...currentValue,
      id,
    ];
  } else {
    return currentValue.filter(value => value != id);
  }
};

const OrderOptionCheckboxes = ({currentValue, values, setOptionValue}) => (
  <div className={styles.checkboxes}>
    {values.map(value=> (
      <label key={value.id}>
        <input 
          type='checkbox'
          value={value.id}
          checked={currentValue.indexOf(value.id) != -1}
          onChange={event => setOptionValue(newValueSet(currentValue, value.id, event.currentTarget.checked))}
        /> {value.name} {formatPrice(value.price)}
      </label>
    ))}

  </div>
);

OrderOptionCheckboxes.propTypes = {
  currentValue: PropTypes.array,
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
};

export default OrderOptionCheckboxes;