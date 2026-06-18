interface CommonContainerProps {
  children: React.ReactNode;
}

const CommonContainer: React.FC<CommonContainerProps> = ({ children }) => {
  return <div className="w-full max-w-7xl mx-auto px-4 ">{children}</div>;
};

export default CommonContainer;
