import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Popup: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="overlay">
      <div className="popup">
        <div className="popup__inner">
          <h3 className="popup__title">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};
