import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { RawNameChange } from './NameChange';

describe('NameChange (component)', function() {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const voidFunc = (value: String) => 0;
    ReactDOM.render(<RawNameChange submit={voidFunc} submitting={false} error="" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('submits the correct name', () => {
    const div = document.createElement('div');
    const submitFunc = jest.fn();
    ReactDOM.render(<RawNameChange submit={submitFunc} submitting={false} error="" />, div);
    
    const input = div.querySelector('input');
    const form = div.querySelector('form');
    TestUtils.Simulate.change(input, { target: { value: 'Peter' } } as InputElementEvent);
    TestUtils.Simulate.submit(form);
    
    expect(submitFunc).toHaveBeenCalledTimes(1);
    expect(submitFunc).toBeCalledWith('Peter');
  });
  
  it('submits the name with corrected casing', () => {
    const div = document.createElement('div');
    const submitFunc = jest.fn();
    ReactDOM.render(<RawNameChange submit={submitFunc} submitting={false} error="" />, div);
    
    const input = div.querySelector('input');
    const form = div.querySelector('form');
    TestUtils.Simulate.change(input, { target: { value: 'PEtEr' } } as InputElementEvent);
    TestUtils.Simulate.submit(form);
    
    expect(submitFunc).toHaveBeenCalledTimes(1);
    expect(submitFunc).toBeCalledWith('Peter');
  });
    
});
