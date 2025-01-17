import React, { useEffect, useRef, useState } from 'react'
import '../styles/gridbox.css'

const GridBox = () => {
  const boardSize = 10
  const [startTime,setStartTime] = useState(null)
  const [activeCell,setActiveCell] = useState(null)
  const [responseTimes,setResponseTimes] = useState([])
  const [isGameActive,setIsGameActive] = useState(false)
  const [timer,setTimer] = useState(null)

  const gameStart = () => {
    setIsGameActive(true)
    lightenUpRandomCell()
      setStartTime(Date.now())
  }

  const lightenUpRandomCell = () => {
    const row = Math.floor(Math.random() * boardSize)
    const col = Math.floor(Math.random() * boardSize)
    setActiveCell({row: row, col: col})
  }

  const handleClick = (row,col) => {
    if(!isGameActive) return

    if(activeCell.row === row && activeCell.col === col) {
      const endTime = Date.now()
      const responseTime = endTime - startTime
      setResponseTimes([...responseTimes,responseTime])
      lightenUpRandomCell()
    }
  }

  const handlePause = () => {
    setActiveCell(null)
    setIsGameActive(false)
  }

  const handleReset = () =>{
    setActiveCell(null)
    setResponseTimes([])
    setIsGameActive(false)
    setTimer(0)
  }

  useEffect(() => {
    let timeInterval
    if(activeCell) {
      timeInterval = setInterval(() => {
        lightenUpRandomCell()
      }, timer * 1000 )
    } else {
      clearInterval(timeInterval)
    }

    return () => clearInterval(timeInterval)
  }, [activeCell])


  return (
    <div className='grid-container'>
      <div className="btn-contanier">
        <button onClick={() => gameStart(timer)}>Start</button>
        <button onClick={() => handlePause()}>Pause</button>
        <button onClick={() => handleReset()}>Reset</button>
        <input type="text" value={timer} onChange={(e) => setTimer(e.target.value )} />
      </div>
      <div className='grid-box'>
        {
          Array.from({length: boardSize}).map((_,row) => {
            return Array.from({length: boardSize}).map((_,col) => {
              return <div 
              key={`${row}-${col}`}
              className={`cell ${activeCell?.row === row && activeCell.col === col ? 'active':''}`}
              onClick={() => handleClick(row,col)}
              >
              </div>
            })
          })
        }
      </div>
      <table border={1}>
        <thead>
            <th>Mouse Click</th>
            <th>Response Time</th>
        </thead>
        <tbody border="1">
          {
            responseTimes && responseTimes.map((item,i) => {
              return <tr key={i}>
                <td>{i+1}</td>
                <td>{item/1000} s</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default GridBox