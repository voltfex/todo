import React from 'react';
import { Popup } from './popup';
import { useCreateTaskMutation } from '../redux/todo';
import getFormattedDate from '../utils/getDate';

interface Props {
  porojectId: number;
  refetch: () => void;
  handleClosePopup: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export const SubProjectPopup: React.FC<Props> = ({ handleClosePopup, porojectId, refetch }) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [title, setName] = React.useState('');
  const [priority, setPriority] = React.useState('low');
  const [description, setDescription] = React.useState('');

  function clearPopupProjects() {
    setName('');
    setDescription('');
    handleClosePopup(false);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const date = getFormattedDate();

    try {
      await createTask({
        url: '/subProjects',
        newProject: {
          title,
          performers: [],
          status: false,
          status_mess: priority,
          date,
          description,
          porojectId,
        },
      }).unwrap();
      clearPopupProjects();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popup title="Создать задачу">
      <form onSubmit={handleSubmit}>
        <div className="popup__name">
          <p>Название</p>
          <input
            className="input"
            type="text"
            value={title}
            onChange={(e) => setName(e.target.value)}
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
          <button type="submit" className="btn btn--popup">
            {isLoading ? 'Отправка...' : 'Создать'}
          </button>
          <button
            type="button"
            className="btn btn--popup btn--popup-cancel"
            onClick={() => handleClosePopup(false)}
          >
            Отмена
          </button>
        </div>
      </form>
    </Popup>
  );
};
