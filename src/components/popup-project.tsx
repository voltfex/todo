import React from 'react';
import { Popup } from './popup';
import { useCreateTaskMutation } from '../redux/todo';
import getFormattedDate from '../utils/getDate';

interface Props {
  setPopupProjects: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export const PopupProject: React.FC<Props> = ({ setPopupProjects }) => {
  const [title, setName] = React.useState('');
  const [category, setCategory] = React.useState('Бизнес');

  const [description, setDescription] = React.useState('');
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleClosePopup = () => {
    setPopupProjects(false);
  };

  function clearPopupProjects() {
    setName('');
    setDescription('');
    setPopupProjects(false);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const date = getFormattedDate();

    try {
      await createTask({
        url: '/projects',
        newProject: {
          title,
          category,
          subProjects: [],
          status: 'InProgress',
          date,
          description,
        },
      }).unwrap();
      clearPopupProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popup title="Создать проект">
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
            <p>Статус</p>
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
          <button type="submit" disabled={isLoading} className="btn btn--popup">
            {isLoading ? 'Отправка...' : 'Создать'}
          </button>
          <button
            type="button"
            className="btn btn--popup btn--popup-cancel"
            onClick={handleClosePopup}
          >
            Отмена
          </button>
        </div>
      </form>
    </Popup>
  );
};
