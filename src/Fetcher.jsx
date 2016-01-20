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

    this.state = {data: null};
  }

  componentDidMount() {
    const {reducer = identity, url} = this.props;

    const call = djax({
      contentType: 'application/json',
      dataType: 'json',
      url
    });

    // Throwing on error
    call.fail(() => {
      throw Error('Fetcher: could not retrieve data at ' + url)
    });

    call.then(data => {
      this.setState({data: reducer(data)});
    });
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
  reducer: PropTypes.func,
  url: PropTypes.string.isRequired
};
