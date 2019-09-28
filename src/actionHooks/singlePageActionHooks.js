import { useEffect, useCallback } from 'react';
import { useStore } from '../store/store';
import { createEndpointSingle, fetchItems } from '../utils';

export const useFetchSingle = () => {
  const [, setState] = useStore('singlePageState');
  return async (category, id) => {
    const fetchedItem = await fetchItems(createEndpointSingle(category, id));
    setState({
      loading: true,
      category,
      id,
      element: fetchedItem,
      related: {},
    });
  };
};

export const useFetchRelated = () => {
  const [state, setState] = useStore('singlePageState');
  return async categories => {
    const related = {};
    const filteredCategories = categories.filter(cat =>
      Object.prototype.hasOwnProperty.call(state.element, cat)
    );

    await Promise.all(
      filteredCategories.map(async cat => {
        const catElements = await Promise.all(
          state.element[cat].map(async element => fetchItems(element))
        );
        return cat === 'people'
          ? (related.character = catElements)
          : (related[cat] = catElements);
      })
    );
    setState(prevState => ({
      ...prevState,
      related: { ...related },
      loading: false,
    }));
  };
};

export const useFetchSingleAndRelated = categories => {
  const [state] = useStore('singlePageState');
  const fetchSingle = useFetchSingle();
  const fetchRelated = useCallback(useFetchRelated(), [categories]);

  // Fetch related when we have got the single item into our state
  useEffect(() => {
    if (state.element) {
      fetchRelated(categories);
    }
  }, [state.element]);

  return async (category, id) => {
    await fetchSingle(category, id);
  };
};
