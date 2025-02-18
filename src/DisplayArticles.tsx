import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';  

interface Article {
    id: number;
    title: string;
    summary: string;
    publisher: string;
    date: string;
}

export default function DisplayArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get('http://localhost:5000/articles')
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
            });
    }, []);

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/articles/${id}`)
                    .then(() => {
                        setArticles(articles.filter(article => article.id !== id));

                        Swal.fire(
                            'Deleted!',
                            'The article has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Error deleting article:', error);

                        Swal.fire(
                            'Error!',
                            'There was an error deleting the article.',
                            'error'
                        );
                    });
            }
        });
    };

    const handleEdit = (id: number) => {
        navigate(`/update/${id}`);  
    };

    const handleNew = () => {
        navigate('/create'); 
    };

    return (
        <div className='container p-5'>
            <h1>News Articles</h1>
            <div className="d-flex justify-content-between align-items-center">
                <p>{articles.length} ARTICLES FOUND</p>
                <button className="btn btn-primary" onClick={handleNew}>New +</button>
            </div>
            <div className='row'>
                {articles.length > 0 ? (
                    articles.map(article => (
                        <div className='py-3' key={article.id}>
                            <div className='card border-0 shadow'>
                                <div className='card-header bg-white'>
                                    <div className="row">
                                        <div className='col-11'>
                                            <p className="card-text fs-6 text-muted mt-1 text-uppercase px-2">
                                                {article.publisher}&nbsp;&nbsp;{article.date}
                                            </p>
                                        </div>
                                        <div className="col-1 text-end">
                                            <button className="btn btn-link p-0 me-2" onClick={() => handleEdit(article.id)}>
                                                <BiEdit className='fs-4 text-primary' />
                                            </button>
                                            <button className="btn btn-link p-0" onClick={() => handleDelete(article.id)}>
                                                <RiDeleteBin6Line className='fs-4 text-danger' />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className='card-title px-2'>{article.title}</h3>
                                </div>
                                <div className='card-body'>
                                    <p className='card-text px-2'>{article.summary}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No articles found</p>
                )}
            </div>
        </div>
    );
}
