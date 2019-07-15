import React from 'react';
import ReactDOM from 'react-dom';
import { create, ReactTestRendererJSON } from 'react-test-renderer';
import { RawClock } from './Clock';

describe('Clock (component)', function() {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RawClock name="Robert" loading={false} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('appears with the correct name', () => {
    const elem = create(<RawClock name="Robert" loading={false} />);
    expect((elem.toJSON().children[0] as ReactTestRendererJSON).children[0]).toBe('Robert');
  });

  it('appears as loading', () => {
    const elem = create(<RawClock name="Anon" loading={true} />);
    expect(elem.toJSON().children[0]).toBe('The clock is loading...');
  });
});
