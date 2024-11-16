import React from 'react';

interface Props {
  status_mess: string;
  className?: string;
}

export const StatusInfo: React.FC<Props> = ({ status_mess }) => {
  switch (status_mess) {
    case 'completed':
      return <div className={`cart-item__status completed`}>Выполнено</div>;
    case 'cancelled':
      return <div className={`cart-item__status cancelled`}>Отменено</div>;
    case 'noActive':
      return <div className={`cart-item__status noActive`}>Не активно</div>;
    case 'low':
      return <div className={`task-item__priority low`}>Низкий</div>;
    case 'high':
      return <div className={`task-item__priority`}>Высокий</div>;
    case 'medium':
      return <div className={`task-item__priority medium`}>Средний</div>;
    default:
      return <div className={`cart-item__status active`}>Выполняется</div>;
  }
};
