import React from 'react';
import nutritionFactStyles from './nutrition-fact.module.css';

interface INutritionFactProps {
  title?: string;
  value?: number;
}

export default function NutritionFact({ title, value }: INutritionFactProps) {
  return (
    <div className={nutritionFactStyles.container}>
      <p className={`text text_type_main-default ${nutritionFactStyles.title}`}>{title}</p>
      <span className={nutritionFactStyles.digits}>{value}</span>
    </div>
  );
}
