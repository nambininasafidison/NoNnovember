import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <ArrowLeft
      onClick={handleGoBack}
      className="fixed lg:block hidden top-5 left-7 w-10 h-10 cursor-pointer"
    />
  );
};

export default BackButton;
