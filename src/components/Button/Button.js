/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner';
import styles from './Button.css';

export type Props = {
  id: string,
  className?: string,
  children: any,
  disabled: boolean,
  wide: boolean,
  rounded: boolean,
  loading: boolean,
  view: 'default' | 'outline' | 'link',
  type: 'submit' | 'reset' | 'button' | 'menu',
  theme: 'primary' | 'success' | 'danger' | 'info' | 'warning' | 'link',
  size: 'small' | 'normal' | 'large',
  onClick: () => any
}

class Button extends PureComponent {
  props: Props;

  static defaultProps = {
    type: 'button',
    theme: 'primary',
    view: 'default',
    size: 'normal',
    wide: false,
    rounded: true,
    loading: false,
    disabled: false
  };

  renderLoading(): ?React.Element<any> {
    const { loading } = this.props;

    if (!loading) {
      return null;
    }

    return (
      <Spinner type="dotted" className={styles.loading} />
    );
  }

  render(): React.Element<any> {
    const { id, type, disabled, theme, size, wide, rounded, children, view, loading } = this.props;
    const className = classNames(styles.button, styles[theme], styles[view], styles[size], {
      [styles.wide]: wide,
      [styles.rounded]: rounded
    }, this.props.className);

    return (
      <button
        id={id}
        className={className}
        type={type}
        disabled={disabled || loading}
        onClick={this.props.onClick}
      >
        {children}
        {this.renderLoading()}
      </button>
    );
  }
}

export default Button;
