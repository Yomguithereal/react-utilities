import devcards from 'devcards';
import React, {Component} from 'react';
import measured from '../src/measured';

class Snitch extends Component {
  render() {
    const {width, height} = this.props;

    return (
      <div>
        <p>My container's width is <strong>{width}</strong> pixels.</p>
        <p>My container's height is <strong>{height}</strong> pixels</p>
      </div>
    );
  }
}

const MeasuredSnitch = measured({width: '100%'}, Snitch);

const devcard = devcards.ns('measured');

devcard(
  `
  **measured** is a simple higher-order React component that can typically be
  used to provide dataviz components rendering SVG the real width and height in
  pixels of their containers.

  Indeed, those components often need to know the absolute size of their
  containers in order to be able to compute the size of their rendered
  elements.
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
  and display the new sizes of the container.
  `,
  <MeasuredSnitch />
);

devcard(
  `
  The possible options are:
  `
);
