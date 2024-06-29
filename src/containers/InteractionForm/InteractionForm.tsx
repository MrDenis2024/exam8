import React, {useState} from 'react';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';
import QuoteForm from '../../components/QuoteForm/QuoteForm';
import {Quote} from '../../types';
import Spinner from '../../components/Spinner/Spinner';

const InteractionForm = () => {
  const [quote, setQuote] = useState<Quote>({
    category: '',
    author: '',
    text: '',
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    setQuote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axiosApi.post('/quotes.json', quote);
    } catch (e) {
      console.error('Ошибка отпарвки данных о цитате');
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  let form = (
    <QuoteForm quote={quote} onFormSubmit={onFormSubmit} onFieldChange={(event) => onFieldChange(event)} />
  );

  if(loading) {
    form = (
      <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      {form}
    </>
  );
};

export default InteractionForm;