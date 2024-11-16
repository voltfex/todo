import React from 'react';

interface Props {
  className?: string;
}

export const PlaceholderProject: React.FC<Props> = ({ className }) => {
  return (
    <div className="placeholder-cart ">
      <div className="placeholder-title">Название</div>
      <div className="placeholder-category">Категория</div>
      <div className="placeholder-progress">Задачи</div>
      <div className="placeholder-status">Статус</div>
      <div className="placeholder-date">Дата создания</div>
      <div className="placeholder-actions">Действия</div>
    </div>
  );
};
