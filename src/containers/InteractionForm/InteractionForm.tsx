import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';
import QuoteForm from '../../components/QuoteForm/QuoteForm';
import {Quote} from '../../types';
import Spinner from '../../components/Spinner/Spinner';

const initialState = {
  category: '',
  author: '',
  text: '',
};

const InteractionForm = () => {
  const [quote, setQuote] = useState<Quote>(initialState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  const fetchOneQuote = useCallback( async (id: string) => {
    setLoading(true);

    try {
      const response = await axiosApi.get<Quote>(`/quotes/${id}.json`);

      if(response.data) {
        setQuote(response.data);
      } else {
        navigate('/');
      }
    } catch (e) {
      console.error('Ошибка получение данных о цитате');
    } finally {
      setLoading(false);
    }

  }, [navigate]);

  useEffect(() => {
    if(id !== undefined) {
      void fetchOneQuote(id);
    } else {
      setQuote(initialState);
    }
  }, [id, fetchOneQuote]);

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

    if(id !== undefined) {
      try {
        await axiosApi.put(`/quotes/${id}.json`, quote);
      } catch (e) {
        console.error('Ошибка отпарвки данных об изменение цитаты');
      } finally {
        setLoading(false);
        navigate('/');
      }
    } else {
      try {
        await axiosApi.post('/quotes.json', quote);
      } catch (e) {
        console.error('Ошибка отпарвки данных о цитате');
      } finally {
        setLoading(false);
        navigate('/');
      }
    }
  };

  let form = (
    <QuoteForm quote={quote} id={id} onFormSubmit={onFormSubmit} onFieldChange={(event) => onFieldChange(event)} />
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