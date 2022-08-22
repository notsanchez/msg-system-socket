import React from 'react'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { ContactProvider } from './context/ContactProvider';
import { ConversationsProvider } from './context/ConversationsProvider';
import { SocketProvider } from './context/SocketProvider';
import useLocalStorage from './hooks/useLocalStorage';

function App() {

  const [ id, setId ] = useLocalStorage('id')

  const dashboard = (
    <SocketProvider id={id}>
      <ContactProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id}/>
        </ConversationsProvider>
      </ContactProvider>
    </SocketProvider>
  )

  return (
    id ? dashboard : <Login onIdSubmit={setId}/>
  )
}

export default App;
