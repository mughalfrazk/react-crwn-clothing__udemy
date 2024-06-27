import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryItem } from '../../redux/categories/category.types';
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../redux/categories/category.selector';
import './category.styles.scss';

type CategoryRouteParam = {
  category: string;
}

const Category = () => {
  const { category } = useParams<keyof CategoryRouteParam>() as CategoryRouteParam
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState<CategoryItem[]>([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Category;
