import { createContext, useEffect, useState } from 'react';

import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from '../utils/firebase/firebase.utils.js';
import { gql, useQuery } from '@apollo/client';

export const CategoriesContext = createContext({
  categoriesMap: {},
  loading: false
});

const COLLECTIONS = gql`
  query {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

export const CategoriesProvider = ({ children }) => {
  const {loading, error, data} = useQuery(COLLECTIONS);
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap, loading }

  useEffect(() => {
    if (data) {
      const { collections } = data;
      const collectionsMap = collections.reduce((acc, collection) => {
        const { title, items } = collection;
        acc[title.toLowerCase()] = items;
        return acc
      }, {})

      setCategoriesMap(collectionsMap)
    }
  }, [data])

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
