import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render correct link', () => {
    const expectedRenderedLink = '/trip/abc';
    const component = shallow(<TripSummary id='abc' name='name' cost='$10'/>);
    expect(component.find('Link').prop('to')).toEqual(expectedRenderedLink);
  });
  
  it('should render correct src and alt', () => {
    const expectedSource = 'image.jpg';
    const expectedAlternative = 'alternative';
    const component = shallow(<TripSummary image={expectedSource} name={expectedAlternative} cost='$10'/>);

    expect(component.find('img').prop('src')).toEqual(expectedSource);
    expect(component.find('img').prop('alt')).toEqual(expectedAlternative);
  });

  it('render correct props names', () => {
    const expectedName = 'name';
    const expectedCost = '$10';
    const expectedDays = 10;

    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays}/>);
    
    const renderedName = component.find('.title').text();
    const renderedDetails = component.find('.details').text();
    expect(renderedName).toEqual(expectedName);
    expect(renderedDetails).toEqual(expectedDays + ' daysfrom ' + expectedCost);
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render tags in proper order', () => {
    const expectedTags = ['tag1', 'tag2', 'tag3'];
    
    const component = shallow(<TripSummary tags={expectedTags} name='name' cost='$10' />);

    const renderedTag1 = component.find('.tag').at(0).props().children;
    const renderedTag2 = component.find('.tag').at(1).props().children;
    const renderedTag3 = component.find('.tag').at(2).props().children;

    const renderedTags = [];
    renderedTags.push(renderedTag1, renderedTag2, renderedTag3);

    expect(renderedTags).toEqual(expectedTags);
  });

  it('should not render tag div if tag is false', () => {
    const component = shallow(<TripSummary name='name' cost='$10'/>);
    expect(component.hasClass('tags')).toBe(false);
  });
});