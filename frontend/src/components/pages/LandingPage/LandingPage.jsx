import React, { useEffect }  from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import "./LandingPage.css"
import { useNavigate } from 'react-router-dom'


const LandingPage = () => {
  const navigate=useNavigate()
  useEffect(()=>{
    const userInfo = localStorage.getItem("userInfo");
    if(userInfo)
    {
      navigate("/mynotes")  
    }
  
  },[navigate])
  
  return (
    <div className='main'>
      <Container>
        <Row className="justify-content-center">
          <div className='intro-text'>
            <div>
              <h1 className='title'>Welcome To Cloud Memo</h1>
              <p className='subtitle'>A Protected Space for All Your Notes</p>
            </div>
            <div className='buttonContainer'>
              <a href="/login">
                <Button size='lg' className='landingbutton' variant='dark'>Login</Button>
              </a>
              <a href="/register">
                <Button size='lg' className='landingbutton' variant='outline-dark'>Signup</Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
