import axios from 'axios';
import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux';

 function PieChart() {

    const[userData,setUserData]=useState()
const canvasRef= useRef(null)

  console.log(userData)
useEffect(async()=>{
const ctx = canvasRef.current.getContext('2d')
const {data} =await axios.get('/admin/dashboard/chart')
const myChart = new window.Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Blocked', 'Unblocked'],
        datasets: [{
            label: '# of Votes',
            data: data.user,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
});

return () => {
    myChart.destroy()
 }

},[])




    return (
        <div>
           <canvas ref={canvasRef}></canvas>
 
        </div>
    )
}

export default PieChart;
