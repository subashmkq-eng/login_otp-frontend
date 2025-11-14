import { PrimeReactProvider } from 'primereact/api';
import AppRoutes from "./routes/AppRoutes";


const App = () => {
  return (
    <PrimeReactProvider>
      <AppRoutes />
    </ PrimeReactProvider>
  );
}

export default App;
