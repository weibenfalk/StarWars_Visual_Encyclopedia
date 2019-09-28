import React from 'react';
import Navigation from '../widgets/Navigation/Navigation';
import SingleElement from '../widgets/SingleElement/SingleElement';
import Grid from '../widgets/Grid/Grid';

const SinglePage = ({
  category,
  element,
  id,
  loading,
  categories,
  related,
}) => (
  <div className="wrapper-category">
    <div className="header-category">
      <div
        className="category-logo"
        style={{
          background: 'url(/images/sw_logo.svg)',
        }}
      />
      <Navigation category={category} element={element} />
    </div>
    <SingleElement
      element={element}
      category={category}
      id={id}
      loading={loading}
    />

    {loading && element !== null ? <div className="loader" /> : null}

    {categories.map((cat, i) => {
      if (
        Object.prototype.hasOwnProperty.call(related, cat) &&
        related[cat].length > 0
      ) {
        return (
          <div key={i}>
            <div className="related-header-wrapper">
              <h2>Related {cat}</h2>
            </div>
            <div className="category-grid">
              <Grid
                elements={related[cat]}
                category={
                  cat === 'characters' ||
                  cat === 'pilots' ||
                  cat === 'residents'
                    ? 'people'
                    : cat
                } // The endpoint has "people" in the URL
                loading={loading}
              />
            </div>
          </div>
        );
      }
      return null;
    })}
  </div>
);

export default SinglePage;
