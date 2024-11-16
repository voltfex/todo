import React from 'react';
import { useRouteError } from 'react-router-dom';

interface Props {
  className?: string;
}

export const Error: React.FC<Props> = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>sdaasd</i>
      </p>
    </div>
  );
};
