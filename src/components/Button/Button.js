import React from 'react';
import './Button.css';

function getButtonProps({className = '', ...rest }) {
  return {
    ...rest,
    className: 'button ' + (className ? className : ''),
  };
}

export default function Button({children, ...rest}) {
  return <span {...getButtonProps(rest)} role="button">
    {children}
  </span>;
}
