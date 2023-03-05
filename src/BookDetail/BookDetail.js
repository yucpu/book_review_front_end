import { Image } from 'antd';
import React, { useMemo } from 'react';
import '../BookDetail/BookDetail.css';
import { useData } from '../data';

function BookDetail() {
    const context = useData();
    let book = context.book;

    return useMemo(() => {
        return (
            <div id='BookDetail'>
                <div style={{ display: 'inline-block', textAlign: 'center' }}>
                    <Image
                        style={{ height: '100%' }}
                        src={book.image_url ? book.image_url : 'error'}
                        fallback='https://miro.medium.com/max/1400/1*qdFdhbR00beEaIKDI_WDCw.gif'
                    />
                </div>

                <div>
                    <table className='detailed-info-table' style={{ height: '100%', width: '100%' }}>
                        <tbody>
                            <tr className='table-row'>
                                <td className='table-label'>Book Name</td>
                                <td className='table-content'>{book.title}</td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-label'>Author</td>
                                <td className='table-content'>{book.author_list}</td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-label'>Publish Date</td>
                                <td className='table-content'>{(book.publication_year ? book.publication_year : "No Record") + '/'
                                    + (book.publication_month ? book.publication_month : "No Record") + '/'
                                    + (book.publication_day ? book.publication_day : "No Record")}</td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-label'>Publisher</td>
                                <td className='table-content'>{book.publisher}</td>
                            </tr>
                            <tr className='table-row'   >
                                <td className='table-label'>Descriptions</td>
                                <td className='table-content'>
                                    <p style={{ height: '100%', width: '100%', overflowY: 'scroll', overflowWrap: 'anywhere' }}>
                                        {book.description}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }, [context.book])
}

export default BookDetail