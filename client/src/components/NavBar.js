import React, {useContext } from "react";
import { NavLink } from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import kidventures from '../images/kidventures.png'


function NavBar() {

    const {currentUser, logout} = useContext(UserContext)
    const navigate = useNavigate()

    function handleClick() {
        logout()
        navigate('/')
    }

    return (
            <Navbar className="bg-primary"  > 
                <Navbar.Brand className="nav-main" >
                    <Nav.Link as={NavLink} to={!currentUser ?  "/" : "/activities" }>
                        <img src={kidventures} alt="KidVentures"/>
                    </Nav.Link>
                </Navbar.Brand>
              
            {/* <Container> */}
                {!currentUser ?  
                <>
               <Nav className="px-0">

                        <Nav.Link className="nav-link" as={NavLink} to="/login">Login</Nav.Link>
                        
                        <Nav.Link className="nav-link" as={NavLink} to="/signup">Signup</Nav.Link>
               </Nav>
                </>
                : 
                <>

                <Nav className="ms-auto">

                    <Navbar.Text >Signed in as {currentUser.username}</Navbar.Text>
                    <Button type="button" onClick={handleClick}>Logout</Button>
                </Nav>
                </>
                }

            {/* </Container> */}
             
                  
      
               

            </Navbar>
        

        // <div>
        //     <Navbar bg="white"  >       
        //         <Nav>
        //             <Navbar.Brand>
        //                 <Nav.Link as={NavLink} to={!currentUser ?  "/" : "/activities" }>
        //                     <img src={kidventures} alt="KidVentures"/>
        //                 </Nav.Link>
        //             </Navbar.Brand>
        //         </Nav>      
        //         {!currentUser ?  
        //         <>
        //             <Nav className="me-auto my-2 my-lg-0" > 
        //                 <Nav.Link className="nav-link" as={NavLink} to="/login">Login</Nav.Link>
                        
        //                 <Nav.Link className="nav-link" as={NavLink} to="/signup">Signup</Nav.Link>
        //             </Nav>
        //         </>
        //         : 
        //         <>
        //             <Nav >

        //                 <Navbar.Text className="me-2">Signed in as {currentUser.username}</Navbar.Text>
        //                 <Button type="button" onClick={handleClick}>Logout</Button>
        //             </Nav>
        //         </>
        //         }

        //     </Navbar>
        // </div>
    )
}

export default NavBar