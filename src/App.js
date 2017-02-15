import React, { Component } from 'react';
import './App.css';

import { Link } from 'react-router';

import { 
  Nav, 
  Navbar, 
  NavItem, 
  Col, 
  Row,
  Accordion, 
  Panel, 
  ListGroup, 
  ListGroupItem, 
  Badge 
} from 'react-bootstrap';

import Dashboard from './dashboard'

const ConsultaItem = props =>
  <Link to={{ pathname: props.form, query: props.parametros || '' }}>
    <span style={{display: 'block'}}>{props.descricao}</span>
  </Link>

const TaskItem = props =>
  <Link to={{ pathname: props.form + props.id, query: props.parametros }}>
    <span style={{display: 'block'}}>{props.titulo}</span>
    <span>{props.descricao}</span>
    <span style={{display: 'block', fontSize: '12px'}}>{props.detalhes}</span>
  </Link>

class App extends Component {
  render() {

    const main = ( 
      
      <div className="App">
        <Navbar inverse collapseOnSelect style={{borderRadius: 0}} onSelect={this.handleNavSelect}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Altamira</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {/*<Nav>
              <NavDropdown eventKey="" title="Consultas" id="basic-nav-dropdown">
                <MenuItem eventKey="/recebiveis/lancamentos/consulta/ultimos" >Pedidos Liberados</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="" >Últimas Cobrancas</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="" >Últimas Remessas</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="" >Últimos Retornos</MenuItem>
              </NavDropdown>
              <NavItem eventKey="/contacorrente/" >Conta Corrente</NavItem>
            </Nav>*/}
            <Nav pullRight>
              <NavItem eventKey="logout" ><span onClick={this.handleLogout.bind(this)}>{this.state.usuario && this.state.usuario.nome} (Sair)</span></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Col md={3} >
          <Row>

              <Accordion>
                <Panel style={{cursor: 'pointer'}} header={<span>Consultas</span>} eventKey="1">
                  <ListGroup>
                    {this.state.consultas && this.state.consultas.map( (consulta, i) =>
                      <ListGroupItem key={'consulta-'+ i} header={consulta.titulo}>
                        <ConsultaItem {...consulta} />
                      </ListGroupItem>
                    )}
                  </ListGroup>                
                </Panel>
              </Accordion> 

          </Row>

          <Row>
            <Accordion>
              <Panel style={{cursor: 'pointer'}} header={<span>Tarefas <Badge>{this.state.tarefas && this.state.tarefas.length}</Badge></span>} eventKey="1">
                <ListGroup>
                  {this.state.tarefas && this.state.tarefas.map( (tarefa, i) =>
                    <ListGroupItem key={'tarefa-'+ i} header={tarefa.nome}>
                      <TaskItem {...tarefa} />
                    </ListGroupItem>
                  )}
                </ListGroup>                
              </Panel>
            </Accordion> 
          </Row>
        </Col>

        <Col md={9} >
          {!this.props.children && this.state.usuario && (this.state.usuario.perfil === 'financeiro' || this.state.usuario.perfil === 'cobranca') ? <Dashboard /> : this.props.children}
        </Col>

      </div> 
    );

    const login = (<Login onLogin={this.handleLogin} />);
    
    return(
      <div>
        {this.state.usuario ? main : login}

        {this.state.dialog}
      </div>

    )
  }
}

export default App;
