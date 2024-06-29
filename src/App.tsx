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
      <main className='container flex-grow-1'>
        <Routes>
          <Route path='/' element={<Quotes />} />
          <Route path='/add-quote' element={<InteractionForm />} />
          <Route path='/quotes/:id/edit' element={<InteractionForm />} />
          <Route path='/quotes/:id' element={<Quotes />} />
        </Routes>
      </main>
      <footer className="bg-success">
        <div className="container text-center">
          <p className='my-4 text-light'>Made by Denis Khrunev student Attractor school 2024</p>
        </div>
      </footer>
    </>
  );
};

export default App;
