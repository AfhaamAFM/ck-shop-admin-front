import React from 'react'
import { Nav,Pagination} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'










function Panginate({page,pages,keyword=''}) {

const navigate =useNavigate()


    return pages>1 && (


<Pagination>


     {[...Array(pages).keys()].map(x=>(

 <Nav.Link key={x+1} onClick={()=>navigate(keyword? `/userSearch/${keyword}/page/${x+1}`:`/userManage/page/${x+1}`)}>

<Pagination.Item active={x+1===page}>{x+1}</Pagination.Item>
</Nav.Link> 

        // <Link key={x+1} to={keyword? `userSearch/${keyword}/page/${x+1}`:`userManage/page/${x+1}`} >
        // <Pagination.Item active={x+1===page}>{x+1}</Pagination.Item>
        // </Link>
    ))} 
</Pagination>
    )
        
    
}

export default Panginate
