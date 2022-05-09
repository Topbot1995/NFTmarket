import './App.css';
import { Navbar, Footer } from './components'
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './Route';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <AuthProvider>
      <ToastContainer closeButton={false} position="top-right" />
      <Navbar />
      <ProtectedRoute/>
      <Footer />
    </AuthProvider>
  );
}

export default App;
