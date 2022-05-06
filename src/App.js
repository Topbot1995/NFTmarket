import './App.css';
import { Navbar, Footer } from './components'
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './Route';

function App() {

  return (
    <AuthProvider>
      <Navbar />
      <ProtectedRoute/>
      <Footer />
    </AuthProvider>
  );
}

export default App;
