import React from 'react';
import nutritionFactStyles from './nutrition-fact.module.css';
import { PropTypes } from 'prop-types';

export default function NutritionFact({ title, value }) {
  return (
    <div className={nutritionFactStyles.container}>
      <p className={`text text_type_main-default ${nutritionFactStyles.title}`}>{title}</p>
      <span className={nutritionFactStyles.digits}>{value}</span>
    </div>
  );
}

NutritionFact.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
};
