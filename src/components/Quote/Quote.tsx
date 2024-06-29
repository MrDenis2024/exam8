import React from 'react';
import {QuoteMutation} from '../../types';
import {Link} from 'react-router-dom';

interface Props {
  quote: QuoteMutation;
  deleteQuote: React.MouseEventHandler;
}

const Quote: React.FC<Props> = ({quote, deleteQuote}) => {
  return (
    <div className='border rounded p-3 mb-3 d-flex justify-content-between'>
      <div className='col-8'>
        <p>"{quote.text}"</p>
        <p><strong>- {quote.author}</strong></p>
      </div>
     <div className='col-4 text-center'>
       <Link to={`/quotes/${quote.id}/edit`} className='btn btn-success me-3'>Change quote</Link>
       <button type='button' className='btn btn-danger' onClick={deleteQuote}>Delete</button>
     </div>
    </div>
  );
};

export default Quote;