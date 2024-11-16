import React from 'react';
import { Link } from 'react-router-dom';
import { StatusInfo } from './status-info';
import EditProjectPopup from './edit-project-popup';
import { useGetSubProjectsByIdQuery } from '../redux/todo';

interface Props {
  id: number;
  title: string;
  category: string;
  status: string;
  date: string;
  performers?: string[];
  className?: string;
  onDelete: (id: string) => void;
  onRefetch: () => void;
}

export const CartItem: React.FC<Props> = ({
  id,
  title,
  category,
  status,
  date,
  onDelete,
  onRefetch,
}) => {
  const { data } = useGetSubProjectsByIdQuery(String(id));
  const [popupEdit, setPopupEdit] = React.useState(false);
  const onClose = () => {
    setPopupEdit(false);
  };

  return (
    <div className="project-item">
      <div className="project-title">
        <Link to={`tasks/${id}`}>{title.length > 31 ? `${title.slice(0, 31)}...` : title}</Link>
      </div>
      <div className="project-category">{category}</div>
      <div className="project-progress">0 / {data?.length}</div>
      <div className="project-status">
        <StatusInfo status_mess={status} />
      </div>
      <div className="project-date">{date}</div>
      <div className="project-actions">
        <button onClick={() => setPopupEdit(true)} className="btn btn--edit">
          Редактировать
        </button>
        <button onClick={() => onDelete(String(id))} className="btn btn--del">
          Удалить
        </button>
      </div>
      {popupEdit && <EditProjectPopup id={id} onClose={onClose} onRefetch={onRefetch} />}
    </div>
  );
};
