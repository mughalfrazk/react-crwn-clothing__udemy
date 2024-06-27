import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';
import { gql, useQuery } from '@apollo/client';

const GET_CATEGORY = gql`
  query ($title: String!) {
    getCollectionsByTitle(title: $title) {
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

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: {
      title: category,
    },
  });

  useEffect(() => {
    if (data) {
      const {
        getCollectionsByTitle: { items }
      } = data;
      setProducts(items)
    }
  }, [category, data])


  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Fragment>
  );
};

export default Category;
