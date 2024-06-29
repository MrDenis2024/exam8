import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import InteractionForm from './containers/InteractionForm/InteractionForm';
import Quotes from './containers/Quotes/Quotes';

const App = () => {

  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className='container'>
        <Routes>
          <Route path='/' element={<Quotes />} />
          <Route path='/add-quote' element={<InteractionForm />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
