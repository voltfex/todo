import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/header';
import { Search } from 'lucide-react';
import { TaskCard } from '../components/task-card';

import Skeleton from '../components/skeleton';
import { SubProjectPopup } from '../components/subProject-popup';
import { useGetProjectsByIdQuery, useGetSubProjectsByIdQuery } from '../redux/todo';

interface Props {
  className?: string;
}

export const Tasks: React.FC<Props> = () => {
  const { taskId } = useParams();
  const { data, error, isLoading, refetch } = useGetSubProjectsByIdQuery(String(taskId));
  const project = useGetProjectsByIdQuery(String(taskId));
  const [searchValue, setSearchValue] = React.useState('');
  const [popupActive, setPopupActive] = React.useState(false);
  console.log(project);

  if (error) return <p>Something went wrong: Loopa and Poopa</p>;

  const handleClosePopup = () => {
    setPopupActive(false);
  };

  const filteredProjects = data?.filter((item) =>
    item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
  );

  return (
    <div className="main container">
      <div className="main__inner">
        <Header title={`Здачи проекта - ${project.data?.title}`} />
        <div className="content">
          <div className="content__inner">
            <div className="content__search">
              <Search className="icon" />
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                className="input input--search"
                type="text"
                placeholder="Найти проект..."
              />
            </div>
            <button onClick={() => setPopupActive(true)} className="btn">
              Создать задачу +
            </button>
            <div className="content__list">
              {isLoading
                ? [...new Array(7)].fill(null).map((_, index) => <Skeleton key={index} />)
                : filteredProjects?.map((data) => (
                    <TaskCard key={data.id} {...data} refetch={refetch} onRefetch={refetch} />
                  ))}
            </div>
          </div>
        </div>
        {popupActive && (
          <SubProjectPopup
            porojectId={Number(taskId)}
            refetch={refetch}
            handleClosePopup={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
};
