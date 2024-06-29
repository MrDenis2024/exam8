import React from 'react';
import {Quote} from '../../types';

interface Props {
  quote: Quote;
  onFormSubmit: React.ChangeEventHandler<HTMLFormElement>;
  onFieldChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
}

const QuoteForm: React.FC<Props> = ({quote, onFormSubmit, onFieldChange}) => {
  return (
    <div className="mt-4 border border-black rounded p-5">
      <h2>Submit new quote</h2>
      <form className="mt-4" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" className="form-control" name="category" value={quote.category} onChange={onFieldChange} required>
            <option value="">Select a category</option>
            <option value="star-wars">Star Wars</option>
            <option value="famous-people">Famous people</option>
            <option value="saying">Saying</option>
            <option value="humour">Humour</option>
            <option value="motivational">Motivational</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author" type="text" name="author"
            className="form-control" value={quote.author} onChange={onFieldChange} required
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="text">Quote text</label>
          <textarea name="text" id="text" rows={18} className='form-control'
                    value={quote.text} onChange={onFieldChange} required></textarea>
        </div>
        <div className='text-end'>
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;