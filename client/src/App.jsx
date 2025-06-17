import './App.css';
import viteLogo from '/vite.svg';
import devlinkLogo from "./assets/devlink-logo.png";

function App() {
  return (
    <div className="w-screen min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-10 sm:p-14 rounded-xl shadow-md text-center">
        <img src={devlinkLogo} alt="Devlink logo" className="h-20 mb-6 mx-auto" />
        <h1 className="text-4xl font-bold text-blue-600 mt-6">
          DevLink is Live!
        </h1>
      </div>
    </div>
  );
}

export default App;
