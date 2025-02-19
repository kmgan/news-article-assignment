import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SlRefresh } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";

interface Article {
    id: number;
    title: string;
    summary: string;
    publisher: string;
    date: string;
}

export default function DisplayArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const articlesPerPage = 5;
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

    const filteredArticles = articles.filter(article => {
        return (
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.date.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

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
                        Swal.fire('Deleted!', 'The article has been deleted.', 'success');
                    })
                    .catch(error => {
                        console.error('Error deleting article:', error);
                        Swal.fire('Error!', 'There was an error deleting the article.', 'error');
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

    const handleRefresh = () => {
        axios.get('http://localhost:5000/articles')
            .then(response => {
                setArticles(response.data);
                Swal.fire({
                    title: 'Success!',
                    text: 'All latest articles have been successfully loaded.',
                    icon: 'success',
                    timer: 1200,
                    showConfirmButton: false
                });
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error loading the articles.',
                    icon: 'error',
                });
            });
    };

    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const pageNumbers = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        pageNumbers.push(1);

        if (currentPage > 4) pageNumbers.push('...');

        const start = Math.max(currentPage - 1, 2);
        const end = Math.min(currentPage + 1, totalPages - 1);
        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        if (currentPage < totalPages - 3) pageNumbers.push('...');
        if (totalPages > 1) pageNumbers.push(totalPages);
    }

    return (
        <div className='container p-5'>
            <h1>News Articles</h1>
            <div className='d-flex justify-content-between align-items-center'>
                <p>{filteredArticles.length} ARTICLES FOUND</p>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Search by title, publisher, or date" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '300px' }}
                />
            </div>
            <div className='text-end'>
                <button className='btn btn-primary me-2' onClick={handleRefresh}>
                    Load New Articles <SlRefresh />
                </button>
                <button className='btn btn-primary' onClick={handleNew}>New +</button>
            </div>
            <div className='row'>
                {currentArticles.length > 0 ? (
                    currentArticles.map(article => (
                        <div className='py-3' key={article.id}>
                            <div className='card border-0 shadow'>
                                <div className='card-header bg-white'>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <p className='card-text fs-6 text-muted mt-1 text-uppercase px-2'>
                                                {article.publisher}&nbsp;&nbsp;{article.date}
                                            </p>
                                        </div>
                                        <div className='col-4 text-end'>
                                            <button className='btn btn-link p-0 me-2' onClick={() => handleEdit(article.id)}>
                                                <BiEdit className='fs-4 text-primary' />
                                            </button>
                                            <button className='btn btn-link p-0' onClick={() => handleDelete(article.id)}>
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

            {totalPages > 1 && (
                <nav>
                    <ul className='pagination justify-content-center mt-4'>
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className='page-link' onClick={goToPrevPage}>
                                <span aria-hidden='true'>&laquo;</span>
                            </button>
                        </li>

                        {pageNumbers.map((page, index) => (
                            <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button className='page-link' onClick={() => {
                                    if (typeof page === 'number') setCurrentPage(page);
                                }}>
                                    {page}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className='page-link' onClick={goToNextPage}>
                                <span aria-hidden='true'>&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}
