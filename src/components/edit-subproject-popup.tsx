import React from 'react';
import { Popup } from './popup';
import { useGetSubProjectByIdQuery, useUpdateTaskMutation } from '../redux/todo';

interface Props {
  id: number;
  setPopupActive: (value: boolean) => void;
  onRefetch: () => void;
  className?: string;
}

export const EditSubProjectPopup: React.FC<Props> = ({ id, setPopupActive, onRefetch }) => {
  const { data, refetch } = useGetSubProjectByIdQuery(String(id));
  const [editProject] = useUpdateTaskMutation();

  const [title, setTile] = React.useState(data?.title);
  const [priority, setPriority] = React.useState(data?.status_mess);
  const [description, setDescription] = React.useState(data?.description);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await editProject({
        url: 'subProjects',
        editProject: { id, title, description, status_mess: priority },
      }).unwrap();
      refetch();
      onRefetch();
      setPopupActive(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    if (data) {
      setTile(data.title);
      setPriority(data.status_mess);
      setDescription(data.description);
    }
  }, [data]);

  return (
    <Popup title="Создать задачу">
      <form onSubmit={handleSubmit}>
        <div className="popup__name">
          <p>Название</p>
          <input
            className="input"
            type="text"
            value={title}
            onChange={(e) => setTile(e.target.value)}
            placeholder="Введите текст..."
            required
          />
        </div>
        <div className="popup__options">
          <div>
            <p>Приоритет задачи</p>
            <div className="popup__options--list">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="select"
              >
                <option value="high">Высокий</option>
                <option value="medium">Средний</option>
                <option value="low">Низкий</option>
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
          />
        </div>
        <div className="popup__btn">
          <button type="submit" className="btn btn--popup" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Создать'}
          </button>
          <button
            type="button"
            className="btn btn--popup btn--popup-cancel"
            onClick={() => setPopupActive(false)}
          >
            Отмена
          </button>
        </div>
      </form>
    </Popup>
  );
};
