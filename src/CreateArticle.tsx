import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';

export default function CreateArticle() {
    const { id } = useParams<{ id: string }>();  
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
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/articles/${id}`)
                .then(response => {
                    const article = response.data;
                    setTitle(article.title);
                    setSummary(article.summary);
                    setDate(article.date);
                    setPublisher(article.publisher);
                })
                .catch(error => console.error('Error fetching article:', error));
        }
    }, [id]);

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

        const articleData = { title, summary, date, publisher };

        try {
            if (id) {
                await axios.put(`http://localhost:5000/articles/${id}`, articleData);
                Swal.fire({
                    icon: 'success',
                    title: 'Article Updated!',
                    text: 'Your article has been successfully updated.',
                });
            } else {
                await axios.post('http://localhost:5000/articles', articleData);
                Swal.fire({
                    icon: 'success',
                    title: 'Article Created!',
                    text: 'Your article has been successfully created.',
                });
            }

            setTitle('');
            setSummary('');
            setDate('');
            setPublisher('');
        } catch (error) {
            console.error('Error saving article:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an issue saving the article.',
            });
        }
    };

    const handleDisplay = () => {
        navigate('/display');  
    };

    return (
        <div className='container py-5 px-3 px-lg-5'>
            <div className='d-flex justify-content-end mb-3'>
                <button className='btn btn-link' onClick={handleDisplay}>
                    View All Articles &gt;
                </button>
            </div>

            <div className='card'>
                <div className='card-header bg-white'>
                    <h3 className='mb-0'>{id ? 'Update News Article' : 'Create News Article'}</h3>
                </div>
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
                            {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'><h5 className='mb-0'>Summary</h5></label>
                            <textarea
                                className={`form-control ${errors.summary ? 'is-invalid' : ''}`}
                                rows={5}
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                            ></textarea>
                            {errors.summary && <div className='invalid-feedback'>{errors.summary}</div>}
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'><h5 className='mb-0'>Date</h5></label>
                            <input
                                type='date'
                                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            {errors.date && <div className='invalid-feedback'>{errors.date}</div>}
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'><h5 className='mb-0'>Publisher</h5></label>
                            <input
                                type='text'
                                className={`form-control ${errors.publisher ? 'is-invalid' : ''}`}
                                value={publisher}
                                onChange={(e) => setPublisher(e.target.value)}
                            />
                            {errors.publisher && <div className='invalid-feedback'>{errors.publisher}</div>}
                        </div>

                        <div className='mb-3 text-end'>
                            <button type='submit' className='btn btn-primary'>{id ? 'Update' : 'Create'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
