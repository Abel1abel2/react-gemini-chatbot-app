
import icon from './assets/img/ai.png'
import './App.css'

import CHAT from './component/chat'
function App() {
 
  


  return (
    <>
      <div>
        <div className='aiNav'>
          <img className='chatIcon'  src={icon} />
        <h3 className='title'>AI Chatbot</h3>
        </div>
        
        <CHAT  />
      </div>
   
    </>
  )
}

export default App
