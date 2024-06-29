import {useCallback, useEffect, useState} from 'react';
import {ApiQuotes, QuoteMutation} from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import Quote from '../../components/Quote/Quote';
import CategoryNav from '../../components/CategoryNav/CategoryNav';
import {useNavigate} from 'react-router-dom';

const Quotes = () => {
  const [quotes, setQuotes] = useState<QuoteMutation[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchQuotes = useCallback( async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get<ApiQuotes | null>('/quotes.json');
      const quotesResponse =  response.data;

      if(quotesResponse !== null) {
        const quotes: QuoteMutation[] = Object.keys(quotesResponse).reverse().map((id: string) => {
          return {
            ...quotesResponse[id],
            id,
          };
        });
        setQuotes(quotes);
      } else {
        setQuotes([]);
      }
    } catch (e) {
      console.error('Ошибка получение данных о цитатах');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);

  const deleteQuote = async (quoteId: string) => {
    try {
      await axiosApi.delete(`/quotes/${quoteId}.json`);
    } catch (e) {
      console.error('Ошибка удаление поста');
    } finally {
      navigate('/');
      void fetchQuotes();
    }
  };

  let postsList = (
    <div className='d-flex justify-content-between mt-5'>
      <CategoryNav />
      <div className='col-6'>
        {quotes.length > 0 ? <h2>All</h2> : <h2>No quotes</h2>}
        {quotes.map((quote) => (
          <Quote key={quote.id} quote={quote} deleteQuote={() => deleteQuote(quote.id)} />
        ))}
      </div>
    </div>
  );

  if (loading) {
    postsList = (
      <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      {postsList}
    </>
  );
};

export default Quotes;