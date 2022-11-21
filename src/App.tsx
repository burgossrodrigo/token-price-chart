import { useEffect, useState } from 'react';
import './App.css';
import { data, getTokenSymbols } from './functions';
import { Line, LineChart } from 'recharts';

function App() {
  const [ chart, setChart ] = useState<any>()
  const [ symbols, setSymbols ] = useState<any>()
  useEffect(() => {
    data().then((res) => {
      console.log(res, 'res')
      setChart(res)
    })

    getTokenSymbols().
    then((res: any) => {
      setSymbols(res)
    })
  }, [])
  console.log(chart, 'chart')
  return (
    <div className="App">
    {
      chart === undefined ?
      'Loading'
      :
      <>
      <>{symbols.token0Symbol + '/' + symbols.token1Symbol}</>
      <LineChart width={730} height={250} data={chart}>
            <Line type="monotone" dataKey="time" stroke="#8884d8" />
      </LineChart>
      </>
    }
   </div>
  );
}

export default App;
