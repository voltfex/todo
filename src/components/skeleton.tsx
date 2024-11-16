import ContentLoader from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={1200}
    height={55}
    viewBox="0 0 1200 55"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="474" rx="0" ry="0" width="50" height="24" />
    <rect x="-1" y="432" rx="0" ry="0" width="280" height="27" />
    <rect x="0" y="0" rx="10" ry="10" width="1200" height="55" />
  </ContentLoader>
);

export default MyLoader;
