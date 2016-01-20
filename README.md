# react-utilities

## Installation

```bash
npm i --save @yomguithereal/react-utilities
```

## Usage

* [measured](#measured)
* [Fetcher](#fetcher)

## measured

Higher-order component that will wait to be mounted before rendering its target now provided with width & height information.

Will also re-render the target on window resize.

```js
import measured from '@yomguithereal/react-utilities/measured';

const MeasuredComponent = measured({width: '100%', height: '50px', debounce: 300}, Component);

// Using the decorator
import measured from '@yomguithereal/react-utilities/measured-decorator';

@measured({width: '100%'})
class {
  render() {
    return (...);
  }
}
```

## Fetcher

The Fetcher component aims at wrapping another component in order to fetch some JSON data for him before rendering it.

This is mainly useful when prototyping viz components.

```jsx
import Fetcher from '@yomguithereal/react-utilities/Fetcher';

class Wrapper extends Component {
  render() {
    return (
      <Fetcher url="/data.json" reducer={x => x}>
        <DataViz />
      </Fetcher>
    );
  }
}
```
