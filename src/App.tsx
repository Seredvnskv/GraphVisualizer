import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/arya-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'material-symbols/outlined.css';
import './App.css'
import {Main} from "./Graph/Main.tsx";
import {GraphProvider} from "./Graph/Context/GraphContext.tsx";

function App() {
  return (
    <PrimeReactProvider>
      <GraphProvider>
        <Main />
      </GraphProvider>
    </PrimeReactProvider>
  )
}

export default App
