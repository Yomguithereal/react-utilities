import devboard from 'devboard';
import React, {Component} from 'react';
import Fetcher from '../src/Fetcher.jsx';

const devcard = devboard.ns('Fetcher');

class Logger extends Component {
  render() {
    return (
      <div>
        <p>Data:</p>
        <code>{JSON.stringify(this.props.data || '', null, 2)}</code>
      </div>
    );
  }
}

devcard(
  `
  **Fetcher** is a React component aiming at fetching JSON data before
  rendering the wrapped component.

  This component is useful when prototyping dataviz components while
  backend logic might not yet be coded. Developers would then be able to rely
  on static data.
  `
);

devcard(
  'Usage',
  `
  The example below will fetch data from \`/data/list.json\` then pass it as
  \`data\` to the \`DataViz\` component.

  ~~~jsx
  import Fetcher from '@yomguithereal/react-utilities/Fetcher';

  const group = (
    <Fetcher url="/data/list.json">
      <DataViz />
    </Fetcher>
  );
  ~~~
  `,
  (
    <Fetcher url="/data.json">
      <Logger />
    </Fetcher>
  )
);

const reducer = data => data.list.map(n => n * 2);

devcard(
  'Reducer',
  `
  One can alternatively use a reducer to process the retrieved data to better
  adapt it to what the wrapped component expects.

  ~~~jsx
  const group = (
    <Fetcher url="/data/list.json" reducer={data => data.list.map(n => n * 2)}>
      <DataViz />
    </Fetcher>
  );
  ~~~
  `,
  (
    <Fetcher url="/data.json" reducer={reducer}>
      <Logger />
    </Fetcher>
  )
);

devcard(
  'Custom Parameters',
  `
  One can also use custom parameters passed to the **djax** library (jQuery-like
  ajax) if needed.

  ~~~jsx
  const params = {
    url: '/data/list.xml',
    dataType: 'xml'
  };

  const group = (
    <Fetcher params={params}>
      <DataViz />
    </Fetcher>
  );
  ~~~
  `,
  (
    <Fetcher params={{url: '/data.xml', dataType: 'xml'}}>
      <Logger />
    </Fetcher>
  )
);
