import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../context/ContactProvider'
import { useConversations } from '../context/ConversationsProvider'

const NewConversationModal = ({ closeModal }) => {

    const [ selectedContactIds, setSelectedContactIds ] = useState([])
    const { contacts } = useContacts()
    const { createConversations } = useConversations()

    const handleCheckboxChange = (contactId) => {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return(prevSelectedContactIds.filter(prevId => {
                    return contactId !== prevId
                }))
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createConversations(selectedContactIds)
        closeModal()
    }

  return (
    <>
        <Modal.Header closeButton>Nova Conversa</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {contacts.map((contact) => (
                    <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check 
                            type="checkbox"
                            value={selectedContactIds.includes(contact.id)}
                            label={contact.name}
                            onChange={() => handleCheckboxChange(contact.id)}
                        />
                    </Form.Group>
                ))}
                <Button type="submit">Criar contato</Button>
            </Form>
        </Modal.Body>
    </>
  )
}

export default NewConversationModal