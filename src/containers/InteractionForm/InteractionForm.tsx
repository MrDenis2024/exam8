import React, {useState} from 'react';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';
import QuoteForm from '../../components/QuoteForm/QuoteForm';
import {Quote} from '../../types';

const InteractionForm = () => {
  const [quote, setQuote] = useState<Quote>({
    category: '',
    author: '',
    text: '',
  });
  const navigate = useNavigate();

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    setQuote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axiosApi.post('/quotes.json', quote);
    } catch (e) {
      console.error('Ошибка отпарвки данных о цитате');
    } finally {
      navigate('/');
    }
  };
  return (
    <div>
      <QuoteForm quote={quote} onFormSubmit={onFormSubmit} onFieldChange={(event) => onFieldChange(event)} />
    </div>
  );
};

export default InteractionForm;