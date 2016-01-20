/**
 * React Measured Higher Order Component
 * ======================================
 *
 * This higher-order component will wait for its target to be mounted to
 * pass its measures through props.
 *
 * This is very useful to render visualizations that need to have some amount
 * of information concerning their dom context.
 *
 * Note that it will also re-render the child Component whenever the window
 * resizes.
 */
import React from 'react';
import debounce from 'lodash/function/debounce';

export default function(opts, Component) {
  if (!opts || (!opts.width && !opts.height))
    throw Error('measured: wrong arguments.');

  return class MeasuredComponent extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        width: null,
        height: null
      };
    }

    componentDidMount() {
      this.listener = debounce(() => this.handleResize(), opts.debounce || 300);
      window.addEventListener('resize', this.listener);
      this.listener();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.listener);
      this.listener = null;
    }

    handleResize() {
      const dom = this.node;

      if (dom)
        this.setState({
          width: dom.offsetWidth,
          height: dom.offsetHeight
        });
    }

    render() {
      const {width, height} = this.state,
            style = {width: opts.width, height: opts.height};

      return (
        <div style={style} ref={node => this.node = node}>
          {width && height ?
            <Component width={width} height={height} {...this.props} /> :
            null
          }
        </div>
      );
    }
  };
}
