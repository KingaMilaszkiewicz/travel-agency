import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../utils/formatPrice';
import Icon from '../../common/Icon/Icon';
import classNames from 'classnames';

const OrderOptionIcons = ({ values, required, currentValue, setOptionValue }) => (
  <div className={classNames({ [styles.icon]: true, ['outerDiv']: true })}>
    {!required && (
      <div onClick={() => { setOptionValue(''); }}><Icon name='times-circle' />none</div>
    )}
    {values.map(value => (
      <div className={classNames({ [styles.icon]: true, [styles.iconActive]: value.id === currentValue })}
        key={value.id} onClick={() => { setOptionValue(value.id); }}>
        <Icon name={value.icon} />
        {value.name}  {formatPrice(value.price)}
      </div>
    ))}
  </div>
);

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  required: PropTypes.bool,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionIcons;