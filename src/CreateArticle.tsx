import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CreateArticle() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [date, setDate] = useState('');
    const [publisher, setPublisher] = useState('');
    const [errors, setErrors] = useState({
        title: '',
        summary: '',
        date: '',
        publisher: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let newErrors = { title: '', summary: '', date: '', publisher: '' };
        let hasError = false;

        if (!title) {
            newErrors.title = 'Title is required.';
            hasError = true;
        }
        if (!summary) {
            newErrors.summary = 'Summary is required.';
            hasError = true;
        }
        if (!date) {
            newErrors.date = 'Date is required.';
            hasError = true;
        }
        if (!publisher) {
            newErrors.publisher = 'Publisher is required.';
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        const newArticle = {
            title,
            summary,
            date,
            publisher,
        };

        try {
            await axios.post('http://localhost:5000/articles', newArticle);
            Swal.fire({
                icon: 'success',
                title: 'Article Created!',
                text: 'Your article has been successfully created.',
            });

            setTitle('');
            setSummary('');
            setDate('');
            setPublisher('');
        } catch (error) {
            console.error('Error creating article:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an issue creating the article.',
            });
        }
    };

    return (
        <div className='container-md py-5 px-lg-5'>
            <div className='card'>
                <div className='card-header bg-white'><h3 className='mb-0'>Create News Article</h3></div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className='mb-3'>
                            <label className='form-label'><h5 className='mb-0'>Title</h5></label>
                            <input
                                type='text'
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'><h5 className='mb-0'>Summary</h5></label>
                            <textarea
                                className={`form-control ${errors.summary ? 'is-invalid' : ''}`}
                                rows={5}
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                            ></textarea>
                            {errors.summary && <div className="invalid-feedback">{errors.summary}</div>}
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'><h5 className='mb-0'>Date</h5></label>
                            <input
                                type='date'
                                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'><h5 className='mb-0'>Publisher</h5></label>
                            <input
                                type='text'
                                className={`form-control ${errors.publisher ? 'is-invalid' : ''}`}
                                value={publisher}
                                onChange={(e) => setPublisher(e.target.value)}
                            />
                            {errors.publisher && <div className="invalid-feedback">{errors.publisher}</div>}
                        </div>

                        <div className='mb-3 text-end'>
                            <button type='submit' className='btn btn-primary'>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
