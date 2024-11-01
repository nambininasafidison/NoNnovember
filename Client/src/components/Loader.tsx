export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-screen fixed">
      <div className="loader relative z-50"></div>
      <div className="absolute w-full h-full top-0 left-0 bg-transparent backdrop-blur-sm"></div>
    </div>
  );
}
