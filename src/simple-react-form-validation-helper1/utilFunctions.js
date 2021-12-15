const format={


     dateFormatter(getDate){
const date = new Date(getDate)
        var dd = date.getDate();

        var mm = date.getMonth()+1; 
        var yyyy = date.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 
        
        if(mm<10) 
        {
            mm='0'+mm;
        } 

        const formatedDate =`${dd}-${mm}-${yyyy}`

        return formatedDate
    }



}
export default format