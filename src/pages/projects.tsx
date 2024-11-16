import React from 'react';
import { CartItem } from '../components/cart-item';
import { PopupProject } from '../components/popup-project';
import { useDelTaskMutation, useGetAllProjectsQuery } from '../redux/todo';

import { Search } from 'lucide-react';
import { Header } from '../components/header';
import Skeleton from '../components/skeleton';
import { PlaceholderProject } from '../components/placeholder-project';

interface Props {
  className?: string;
}

export const Projects: React.FC<Props> = ({}) => {
  const { data, error, isLoading, refetch } = useGetAllProjectsQuery('projects');
  const [delProject] = useDelTaskMutation();
  const [popupProjects, setPopupProjects] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const handleDelete = async (id: string) => {
    try {
      await delProject({ url: 'projects', id }).unwrap();
      refetch();
      console.log(`Проект с id ${id} успешно удален`);
    } catch (err) {
      console.error('Ошибка при удалении проекта:', err);
    }
  };

  React.useEffect(() => {
    refetch();
  }, [popupProjects]);

  const filteredProjects = data?.filter((item) =>
    item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
  );

  if (error) return <h1>Чтото пошло не так...</h1>;
  return (
    <main className="main container">
      <div className="main__inner">
        <Header title={'Проекты'} />
        <div className="content">
          <div className="content__inner">
            <div className="content__search">
              <Search className="icon" />
              <input
                className="input input--search"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Найти проект..."
              />
            </div>
            <button className="btn" onClick={() => setPopupProjects(true)}>
              Создать проект +
            </button>
            <div className="content__list">
              <PlaceholderProject />
              {isLoading
                ? [...new Array(7)].fill(null).map((_, index) => <Skeleton key={index} />)
                : filteredProjects?.map((data) => (
                    <CartItem
                      key={data.id}
                      {...data}
                      onRefetch={refetch}
                      onDelete={(id) => handleDelete(id)}
                    />
                  ))}
            </div>
          </div>
        </div>
        {popupProjects && <PopupProject setPopupProjects={setPopupProjects} />}
      </div>
    </main>
  );
};
