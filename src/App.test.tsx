import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


test('aaa', () => {
  const Component = () => {
    return (<>
      <div className="container" style={{ width: 50 }}>
        <a className="selector">
          Click me
      </a>
      </div>
    ...
    </>)
  }

  const container = render(<Component />);

  const mainDiv = container.getByText('Click me').closest('div');
  if (mainDiv)
    mainDiv.getBoundingClientRect = jest.fn().mockReturnValue(
      { width: 200, height: 200, left: 0, top: 0, right: 200, bottom: 200 }
    )

  console.log(container.getByText('Click me').closest('div')?.getBoundingClientRect());
  console.log(container.getByText('Click me').getBoundingClientRect());
});
