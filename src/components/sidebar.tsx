import { ChartLine, CircleHelp, LayoutGrid, Settings } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <Link to={'/'}>
          <h1 className="sidebar__title">StartUP</h1>
        </Link>
        <section className="section">
          <h3 className="section__title">Проекты</h3>
          <ul className="section__list">
            <li className="section__list--item section__list--item--active">
              <LayoutGrid />
              <a href="#" className="section__link">
                Проекты
              </a>
            </li>
            <li className="section__list--item">
              <ChartLine />
              <a href="#" className="section__link">
                Статистика
              </a>
            </li>
          </ul>
        </section>

        <section className="section">
          <h3 className="section__title">Помощь</h3>
          <ul className="section__list">
            <li className="section__list--item">
              <CircleHelp />
              <a href="section__link">Начать</a>
            </li>
            <li className="section__list--item">
              <Settings />
              <a href="section__link">Настройки</a>
            </li>
          </ul>
        </section>

        <div className="profile">
          <div className="profile__inner">
            <img src="profile.png" alt="Photo" />
            <div className="profile__info">
              <p className="profile__name">Sam Wheeler</p>
              <p className="profile__email">samwheeler@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
