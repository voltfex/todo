import React from 'react';
import { Check, Settings, X } from 'lucide-react';
import { subProjects } from '../types/apiTypes';
import { useDelTaskMutation } from '../redux/todo';
import { StatusInfo } from './status-info';
import { EditSubProjectPopup } from './edit-subproject-popup';

export const TaskCard: React.FC<subProjects> = ({
  id,
  title,
  date,
  status_mess,
  refetch,
  onRefetch,
}) => {
  const [popupActive, setPopupActive] = React.useState(false);
  const [delProject] = useDelTaskMutation();

  const handleDelete = async (id: string) => {
    try {
      await delProject({ url: 'subProjects', id }).unwrap();
      refetch();
      console.log(`Проект с id ${id} успешно удален`);
    } catch (err) {
      console.error('Ошибка при удалении проекта:', err);
    }
  };

  return (
    <div className="task-item">
      <div className="task-item__details">
        <p className="task-item__title">{title.length > 31 ? `${title.slice(0, 31)}...` : title}</p>
      </div>
      <div className="task-item__actions">
        <span className="task-item__date">Создан: {date}</span>
        <span>
          <StatusInfo status_mess={status_mess} />
        </span>
        <div className="task-item__icons">
          <i
            onClick={() => setPopupActive(true)}
            className="task-item__icon task-item__icon--settings"
          >
            <Settings />
          </i>
          <i className="task-item__icon task-item__icon--check">
            <Check />
          </i>
          <i
            onClick={() => handleDelete(String(id))}
            className="task-item__icon task-item__icon--delete"
          >
            <X />
          </i>
        </div>
      </div>
      {popupActive && (
        <EditSubProjectPopup id={id} onRefetch={onRefetch} setPopupActive={setPopupActive} />
      )}
    </div>
  );
};
