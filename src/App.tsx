import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/arya-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css'
import {Main} from "./graph/component/Main.tsx";

function App() {
  return (
    <PrimeReactProvider>
      <Main />
    </PrimeReactProvider>
  )
}

export default App
