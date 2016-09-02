import devboard from 'devboard';
import React, {Component} from 'react';
import measured from '../src/measured';

class Snitch extends Component {
  render() {
    const {width, height} = this.props;

    return (
      <div>
        <p>My container's width is <strong>{width}</strong> pixels.</p>
        <p>My container's height is <strong>{height}</strong> pixels.</p>
      </div>
    );
  }
}

const MeasuredSnitch = measured({width: '100%',height: '100%'}, Snitch);
const NoDebounceMeasuredSnitch = measured({width: '100%', debounce: null}, Snitch);

const devcard = devboard.ns('measured');

devcard(
  `
  **measured** is a simple higher-order React component that can be used to
  provide dataviz components rendering SVG with the real width and height in
  pixels of their containers.

  Indeed, containers might have their size defined in a relative fashion whereas
  those components often need to deal with absolute sizes in order to be
  able to compute the positions of the SVG elements they render.

  While *measured*, a component will therefore be mounted a first time rendering
  only the container, compute absolute size and only then render the composed
  component.
  `
);

devcard(
  'Usage',
  `
  Using the **measured** higher-order component is as simple as calling it with
  a bunch of options and apply it to the desired component:

  ~~~js
  import measured from '@yomguithereal/react-utilities/measured';

  const MeasuredComponent = measured({width: '100%'}, Component);
  ~~~

  Try to resize the window and you should see the little snitch below re-render
  and display the new width of the container.
  `,
  <MeasuredSnitch />
);

devcard(
  'Options',
  `
  The possible options are (note that at least a width or a height must be
  given):

  * **width**: width of the container (can be relative of course).
  * **height**: height of the container (can be relative of course).
  * **debounce** [\`300\`]: debounce time in milliseconds for the window resize listener.
  `
);

devcard(
  'No debounce',
  `
  Here, we disabled debouncing on the window resize listener.

  ~~~js
  const MeasuredComponent = measured({width: '100%', debounce: null}, Component);
  ~~~

  Try resizing and you'll see.
  `,
  <NoDebounceMeasuredSnitch />
);

devcard(
  'Currying and decorator',
  `
  Note that the **measured** function is curried and can therefore be used as
  an ES7 decorator if needed:

  ~~~js
  // Currying
  const fullWidth = measured({width: '100%'});

  const FullWidthComponent = fullWidth(Component);

  // Decorator
  @measured({width: '100%'})
  class DataViz extends Component {
    render() {
      return (...);
    }
  }
  ~~~
  `
);
