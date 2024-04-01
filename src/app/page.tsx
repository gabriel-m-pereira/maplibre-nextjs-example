import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("./components/MapContainer"), {
  ssr: false,
});

function App() {
  return (
    <div className="relative w-full h-full bg-white flex flex-col">
      <MapContainer />
    </div>
  );
}

export default App;
