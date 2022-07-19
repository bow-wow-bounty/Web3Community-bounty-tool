import FadeLoader from "react-spinners/FadeLoader";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center py-16">
      <FadeLoader />
    </div>
  );
};

export default Loading;
