import { LogOut } from 'lucide-react';
import React from 'react';

interface Props {
  title: string;
  className?: string;
}

export const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className="header">
      <div className="header__inner">
        <h2>{title}</h2>
        <button>
          <LogOut color="#808080" size={24} />
        </button>
      </div>
    </header>
  );
};
