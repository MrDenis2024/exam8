import {useCallback, useEffect, useState} from 'react';
import {ApiQuotes, Category, QuoteMutation} from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import Quote from '../../components/Quote/Quote';
import CategoryNav from '../../components/CategoryNav/CategoryNav';
import {useNavigate, useParams} from 'react-router-dom';

const Quotes = () => {
  const [quotes, setQuotes] = useState<QuoteMutation[]>([]);
  const [category] = useState<Category[]>([
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Famous people', id: 'famous-people'},
    {title: 'Saying', id: 'saying'},
    {title: 'Humour', id: 'humour'},
    {title: 'Motivational', id: 'motivational'},
  ]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {id} = useParams();
  let link = '/quotes.json';

  if(id) {
    link =`/quotes.json?orderBy="category"&equalTo="${id}"`;
  }

  const fetchQuotes = useCallback( async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get<ApiQuotes | null>(`${link}`);

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
  }, [link]);

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
      <CategoryNav category={category} />
      <div className='col-8'>
        {quotes.length > 0 ? <>{id ? <>{category.map((category) => (
          category.id === id && <h2 key={category.id}>{category.title}</h2>
        ))}</>: <h2>All</h2>}</> : <h2>No quotes</h2>}
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