import React from 'react';
import '../BookDetail/BookDetail.css';

function BookDetail() {
  return (
    <div id='BookDetail'>
        <div style={{display:'inline-block',textAlign:'center'}}>
            <img style={{height:'100%',width:'70%'}} src="https://www.trainingzone.co.uk/sites/default/files/elenaleonova-books.jpg"/>
        </div>
        
        <div>
            <table className='detailed-info-table' style={{height:'100%', width:'100%'}}>
                <tr className='table-row'>
                    <td className='table-label'>Book Name</td>
                    <td className='table-content'>No one read</td>
                </tr>
                <tr className='table-row'>
                    <td className='table-label'>Author</td>
                    <td className='table-content'>No one</td>
                </tr>
                <tr className='table-row'>
                    <td className='table-label'>Publish Date</td>
                    <td className='table-content'>2019-01-13</td>
                </tr>
                <tr className='table-row'>
                    <td className='table-label'>Publisher</td>
                    <td className='table-content'>haha</td>
                </tr>
                <tr className='table-row'   >
                    <td className='table-label'>Descriptions</td>
                    <td className='table-content'><p style={{height:'100%',width:'100%', overflowY:'scroll',overflowWrap:'anywhere'}}>There are a variety of rules when it comes to using either a definite or an indefinite (did you notice the use of ‘a’ and ‘an’ in this sentence?) Let’s now take asdfsadfsdfasdfasdfasdfsfssssssssa look at the rules surrounding this grammatical element in order that we use it correctly. Rule #1.We mentioned that depending on …
Indefinite Articles | A and An
Indefinite Article Definition The words A and Anare called indefinite articles. We can use them with singular nouns to talk about any single person or thing. Deciding which indefinite article to place in front of a word depends upon the initial sound of the word, not the first letter of the word. Whe</p></td>
                </tr>
            </table>
        </div>
    </div>
  )
}

export default BookDetail