import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = `${process.env.PUBLIC_URL}/press.csv`;

const row = d=>{
    d.times = +d.times;
    return d
  }

export const useData = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        csv(csvUrl,row).then(setData)  
    }, []);
    return data;
}