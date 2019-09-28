import React, { useEffect, useRef, useCallback } from 'react';
import { useStore } from '../../store/store';
import {
  useInitialiseCategory,
  useUpdateCategoryItems,
} from '../../actionHooks/categoryActionHooks';
import Category from './Category';
import './Category.css';

const CategoryContainer = ({
  match: {
    params: { category },
  },
}) => {
  const [state, setState] = useStore('categoryState');
  const initialiseCategory = useCallback(useInitialiseCategory(), [category]);
  const updateCategoryItems = useUpdateCategoryItems();
  const savedState = useRef();

  console.log('render');

  // Remember the latest state for saving in localStorage.
  useEffect(() => {
    savedState.current = state;
  });
  // // Triggers one time when component has mounted
  useEffect(() => {
    if (localStorage.getItem(`${category}State`)) {
      const persistedState = JSON.parse(
        localStorage.getItem(`${category}State`)
      );
      setState(prev => ({ ...prev, ...persistedState }));
    } else {
      initialiseCategory(category);
    }
    return () => {
      localStorage.setItem(
        `${savedState.current.category}State`,
        JSON.stringify(savedState.current)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, initialiseCategory]);

  const updateItems = (loadMore, searchTerm) => {
    updateCategoryItems(loadMore, category, searchTerm);
  };

  return (
    <Category
      navCategory={category}
      updateItems={updateItems}
      loading={state.loading}
      elements={state.elements}
      nextPage={state.nextPage}
      category={state.category}
    />
  );
};

export default CategoryContainer;
