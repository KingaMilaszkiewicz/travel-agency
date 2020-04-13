import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from './OrderOption.scss';
 
const OrderOptionDate = ({ setOptionValue, currentValue }) => (
  <div>
    <DatePicker
      className={styles.pointer}
      selected={currentValue}
      onChange={(event) => setOptionValue(event)}
    />
  </div>
);
 
OrderOptionDate.propTypes = {
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
};
 
export default OrderOptionDate;