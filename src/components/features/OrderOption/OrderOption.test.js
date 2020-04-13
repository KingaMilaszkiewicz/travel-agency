import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption.js';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should render correctly', () => { //PASS
    const component = shallow(<OrderOption type={'text'} name={'name'} />);
    console.log(component.debug());
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => { //PASS
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render props name correctly', () => { //PASS
    const expectedTitle = 'Lorem ipsum';
    const component = shallow(<OrderOption name={expectedTitle} type={'text'} />);

    const renderedTitle = component.find('.title').text();
    expect(renderedTitle).toEqual(expectedTitle);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
    { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: { currentValue: [mockProps.currentValue] },
  number: { currentValue: 1 },
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for (let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });
    /* common tests */
    it(`renders ${optionTypes[type]}`, () => { //PASS for all
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        it('contains select and options', () => { //PASS
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
        
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
        
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption function on change', () => { //PASS
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'icons': {
        it('contains divs', () => { // PASS
          const div = renderedSubcomponent.find('.outerDiv');
          expect(div.length).toBe(1);
        
          const emptyDiv = div.find('Icon').find('[name="times-circle"]').length;
          expect(emptyDiv).toBe(1);
        
          const iconDiv = div.find('.icon').not('.outerDiv');
          expect(iconDiv.length).toBe(mockProps.values.length);

          const icon = div.find('Icon').not('[name="times-circle"]');
          expect(icon.at(0).prop('name')).toBe(mockProps.values[0].icon);
          expect(icon.at(1).prop('name')).toBe(mockProps.values[1].icon);
        });
        it('should run setOrderOption function on change', () => { // PASS
          renderedSubcomponent.find('.icon').last().simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'checkboxes': {
        it('contains div, label and input', () => { // PASS
          const div = renderedSubcomponent.find('.checkboxes');
          expect(div.length).toBe(1);

          const label = div.find('label').length;
          expect(label).toBe(2);

          const input = div.find('input');
          expect(input.length).toBe(mockProps.values.length);
          expect(input.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(input.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption function on change', () => { // PASS
          renderedSubcomponent.find('[value="' + testValue + '"]').simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });
        break;
      }

      case 'number': {
        it('contains div and input', () => { //PASS
          const div = renderedSubcomponent.find('.number');
          expect(div.length).toBe(1);

          const input = div.find('input');
          expect(input.length).toBe(1);
          expect(input.at(0).prop('min')).toBe(mockProps.limits.min);
          expect(input.at(0).prop('max')).toBe(mockProps.limits.max);
        });
        it('should run setOrderOption function on change', () => { //PASS
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }

      case 'text': {
        it('contains div and input', () => { // PASS
          const div = renderedSubcomponent.find('.text');
          expect(div.length).toBe(1);

          const input = div.find('input');
          expect(input.length).toBe(1);
          expect(input.at(0).prop('value')).toBe(mockProps.currentValue);
        });
        it('should run setOrderOption function on change', () => { //PASS
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'date': {
        it('contains DatePicker', () => { // PASS
          const dateClass = renderedSubcomponent.find(DatePicker);
          expect(dateClass.length).toBe(1);
        }); 
        it('should run setOrderOption function on change', () => { // FAIL
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
    }
  });
}