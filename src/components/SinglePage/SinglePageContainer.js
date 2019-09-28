import React, { useEffect, useCallback } from 'react';
import { useStore } from '../../store/store';
import { useFetchSingleAndRelated } from '../../actionHooks/singlePageActionHooks';
import SinglePage from './SinglePage';
import './SinglePage.css';

const SinglePageContainer = ({
  match: {
    params: { category, id },
  },
}) => {
  const [state, setState] = useStore('singlePageState');

  console.log('rerender single page');

  const categories = [
    'characters',
    'people',
    'planets',
    'species',
    'starships',
    'vehicles',
    'films',
    'residents',
    'pilots',
  ];

  const fetchSingleAndRelated = useCallback(
    useFetchSingleAndRelated(categories),
    [category, id]
  );

  // Must clean up state on unmount
  useEffect(
    () => () => {
      setState({
        element: null,
        related: {},
        loading: false,
        category: null,
        id: null,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    setState({
      element: null,
      related: {},
      loading: true,
      category: null,
      id: null,
    });
    fetchSingleAndRelated(category, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, fetchSingleAndRelated, id]);

  return (
    <SinglePage
      category={category}
      element={state.element}
      id={id}
      loading={state.loading}
      categories={categories}
      related={state.related}
    />
  );
};

export default SinglePageContainer;
