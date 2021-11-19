import React from 'react'

function ProductTableRow({product,no,deleteHandler}) {
    return (
        <>
           <tr  key={product._id} >
                            <td >{no+1}</td>
                            <td > <img className='table_image' src={product.imageUrl[0].img} id={product.imageUrl[0]._id} alt="productIMage" /> </td>
                            <td > {product.name}</td>
                            <td >{product.category}</td>
                            <td >{product.subCat}</td>
                            <td >{product.price}</td>
                            <td >{product.quantity}</td>
                          
                                <td className='table-icons'> 
            <i className="fas fa-trash-alt " id={product._id} onClick={deleteHandler}></i>
            {/* <i className="fas fa-edit" onClick={editHandler} id={category._id}></i> */}
            </td>
         
                          </tr> 
        </>
    )
}

export default ProductTableRow
