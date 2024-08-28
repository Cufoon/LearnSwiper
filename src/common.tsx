import { useEffect } from 'react';

type WithPageTitle = <T extends JSX.IntrinsicAttributes>(title: string, Component: React.ComponentType<T>) => React.FC<T>;

export const withPageTitle: WithPageTitle = (title, Component) => {
  const ComponentWithPageTitle = (props: React.ComponentProps<typeof Component>) => {
    useEffect(() => {
      document.title = title;
    }, []);
    return <Component {...props} />;
  };
  return ComponentWithPageTitle;
};
