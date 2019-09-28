import React from 'react';
import PropTypes from 'prop-types';
import './LoadMoreButton.css';

const LoadMoreButton = ({ clickCallback }) => (
  <div
    role="button"
    className="load-more-button"
    onClick={() => clickCallback(true)}
    onKeyDown={() => clickCallback(true)}
    tabIndex={0}
  >
    <p>Load more</p>
  </div>
);

LoadMoreButton.propTypes = {
  clickCallback: PropTypes.func,
};

export default LoadMoreButton;
