/**
 * React Fetcher Component
 * ========================
 *
 * Component used to wrap another one by providing him some necessary data
 * fetched through AJAX for developing purposes.
 */
import React, {Component, PropTypes} from 'react';
import djax from 'djax';

const identity = x => x;

export default class Fetcher extends Component {
  constructor(props, context) {
    super(props, context);

    this.call = null;
    this.rawData = null;
    this.state = {data: null};
  }

  componentDidMount() {
    this.fetch(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const {url, params, reducer} = nextProps;

    if (url !== this.props.url)
      return this.fetch(nextProps);

    if (params !== this.props.params)
      return this.fetch(nextProps);

    if (reducer !== this.props.reducer &&
        typeof reducer === 'function' &&
        this.rawData) {
      this.setState({data: reducer(this.rawData)});
    }
  }

  fetch(props) {
    if (this.call)
      this.call.abort();

    const {reducer = identity, url} = props;

    const call = djax(props.params || {
      contentType: 'application/json',
      dataType: 'json',
      url
    });

    // Throwing on error
    call.fail(() => {
      throw Error('Fetcher: could not retrieve data at ' + url)
    });

    call.then(data => {
      this.call = null;
      this.rawData = data;
      this.setState({data: reducer(data)});
    });

    this.call = call;
  }

  render() {
    const child = React.Children.only(this.props.children),
          data = this.state.data;

    if (!data)
      return null;

    return React.cloneElement(child, {data});
  }
}

Fetcher.propTypes = {
  params: PropTypes.object,
  reducer: PropTypes.func,
  url: PropTypes.string
};
