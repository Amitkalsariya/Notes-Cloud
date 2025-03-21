import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MainPage.css"
const MainPage = ({title,children}) => {
  return (
    <div className="mainback">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainPage;
