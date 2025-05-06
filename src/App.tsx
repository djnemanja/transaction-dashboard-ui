import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
