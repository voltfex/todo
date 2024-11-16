import React from 'react';
import { Popup } from './popup';
import { useGetProjectsByIdQuery, useUpdateTaskMutation } from '../redux/todo';

interface Props {
  id: number;
  onClose: () => void;
  onRefetch: () => void;
}

export const EditProjectPopup: React.FC<Props> = ({ id, onClose, onRefetch }) => {
  const { data, refetch } = useGetProjectsByIdQuery(String(id));
  const [editProject] = useUpdateTaskMutation();
  const [title, setTitle] = React.useState(data?.title);
  const [status, setStatus] = React.useState(data?.status);
  const [category, setCategory] = React.useState(data?.category);
  const [description, setDescription] = React.useState(data?.description);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      setTitle(data.title);
      setCategory(data.category);
      setDescription(data.description);
    }
  }, [data, isSubmitting]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await editProject({
        url: 'projects',
        editProject: { id, title, category, description, status },
      }).unwrap();
      onRefetch();
      refetch();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Popup title={`Редактировать проект - ${data?.title}`}>
      <form onSubmit={handleSubmit}>
        <div className="popup__name">
          <p>Название</p>
          <input
            className="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите текст..."
            required
          />
        </div>
        <div className="popup__options">
          <div>
            <p>Категории</p>
            <div className="popup__options--list">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select"
              >
                <option value="Бизнес">Бизнес</option>
                <option value="Работа">Работа</option>
                <option value="Обучение">Обучение</option>
              </select>
            </div>
          </div>
          <div>
            <p>Статус</p>
            <div className="popup__options--list">
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="select">
                <option value="InProgress">Выполняется</option>
                <option value="cancelled">Отменено</option>
                <option value="noActive">Не активно</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <p>Описание</p>
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите текст..."
            required
          />
        </div>
        <div className="popup__btn">
          <button type="submit" className="btn btn--popup" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Редактировать'}
          </button>
          <button type="button" className="btn btn--popup btn--popup-cancel" onClick={onClose}>
            Отмена
          </button>
        </div>
      </form>
    </Popup>
  );
};

export default EditProjectPopup;
