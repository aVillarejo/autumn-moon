import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column as _Column } from 'primereact/column';
import { Button as _Button } from 'primereact/button';
import './ClientsList.css';
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import DecoratedInput from './../Components/DecoratedInput/DecoratedInput';
import { Grommet, Box, Grid, Heading } from 'grommet';
import { Avatar, Icon } from 'rsuite';
import axios from 'axios';
const miliPerYear = 31536000000;

const List = [
  {
    _id: '5e85889915eb07e4706978fb',
    razon: 'Hilary Duke',
    cName: 'MICRONAUT',
    fiscal: '790 Arion Place, Wells, Georgia, 5157',
    curp: 'XAXX010101000',
    rfc: 'XAXX010101000',
    phoneNum: '+52 (859) 463-3020',
  },
  {
    _id: '5e858899767235f939e25ce3',
    razon: 'Conway French',
    cName: 'TINGLES',
    fiscal: '117 Chester Street, Allamuchy, North Carolina, 6558',
    curp: 'CFR910412ARF',
    rfc: 'XAXX010101000',
    phoneNum: '+52 (857) 575-3036',
  },
  {
    _id: '5e8588996e702d0522ba68a0',
    razon: 'Rosella Kemp',
    cName: 'ICOLOGY',
    fiscal: '335 Maple Street, Gila, Mississippi, 7308',
    curp: 'RKR123456ASD',
    rfc: 'XAXX010101000',
    phoneNum: '+52 (945) 506-2665',
  },
  {
    _id: '5e8588995a59260b88b2b966',
    razon: 'Reed Crane',
    cName: 'OBLIQ',
    fiscal: '196 Orient Avenue, Tioga, Delaware, 9763',
    curp: 'EXP134233EDS',
    rfc: 'XAXX010101000',
    phoneNum: '+52 (831) 534-3381',
  },
];

class ClientsList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      usr: this.props.location.state,
      clientsList: [],
      current: {},
    };
  }
  componentDidMount() {
    //Fetching Clients List
    console.log(this.props.location);
    axios.post('/clients', { team: this.state.usr.Team }).then((res) => {
      console.log(res.data);
      this.setState({ clientsList: res.data.Clients });
    });
    // axios
    //   .post('http://35.232.231.98:3001/clients', {
    //     team: this.state.usr.Team
    //   })
    //   .then(res => {
    //     console.log(res);
    //     //this.setState({clientsList:res.data})
    //   });
  }
  render() {
    return (
      <Grommet plain className='App'>
        <UsrBar usr={this.state.usr} />

        <Grid
          rows={[process.env.REACT_APP_SCREEN_WIDTH]}
          columns={[
            process.env.REACT_APP_NAVBAR_WIDTH,
            process.env.REACT_APP_MAIN_WIDTH,
          ]}
          gap='3px'
          areas={[
            { name: 'nav', start: [0, 0], end: [0, 0] },
            { name: 'main', start: [1, 0], end: [1, 0] },
          ]}
        >
          <Box
            gridArea='nav'
            height='100vh'
            background={process.env.REACT_APP_NAVBAR_COLOR}
            width={process.env.REACT_APP_NAVBAR_WIDTH}
            elevation='small'
          >
            <NavBar usr={this.state.usr} history={this.props.history} />
          </Box>
          <Box gridArea='main'>
            <br />
            <DataTable value={this.state.clientsList} rowHover selectionMode="single" onRowSelect={({data}) => {
                this.setState({ current: data });
              }}>
              <_Column field='razon' header='Razon Social' />
              <_Column field='cName' header='Nombre Comercial' />
              <_Column field='fiscal' header='Domicilio Fiscal' />
              <_Column field='rfc' header='RFC' />
              <_Column field='phoneNum' header='Teléfono' />
            </DataTable>
            <br/>
            <Grid
              rows={['small', 'large']}
              columns={['small', '70%']}
              gap='3px'
              areas={[
                { name: 'avatar', start: [0, 0], end: [0, 0] },
                { name: 'name', start: [1, 0], end: [1, 0] },
                { name: 'info', start: [1, 1], end: [1, 1] },
              ]}
            >
              <Box gridArea='avatar'>
                <Avatar
                  classPrefix='avatar'
                  circle
                  src='https://avatars2.githubusercontent.com/u/12592949?s=460&v=4'
                />
              </Box>
              <Box gridArea='name'>
                <Heading
                  level='2'
                  margin='none'
                  style={{
                    height: '100px',
                    left: '50%',
                    color: '#515253',
                  }}
                  textAlign='center'
                >
                  {this.state.current.razon
                    ? this.state.current.razon
                    : 'Seleccione un Cliente'}
                </Heading>
                <br />
              </Box>
              <Box gridArea='info'>
                <Box direction='row'>
                  <DecoratedInput
                    area='Razon Social'
                    value={this.state.current.razon || ''}
                    width='100%'
                    icon='id-mapping'
                  />
                </Box>
                <br />
                <Box direction='row'>
                  <DecoratedInput
                    area='Nombre Comercial'
                    value={this.state.current.cName || ''}
                    width='100%'
                    boxw='170px'
                    textw='medium'
                    icon='id-mapping'
                    display
                  />
                </Box>
                <br />
                <Box direction='row'>
                  <DecoratedInput
                    area='Domicilio Fiscal'
                    value={this.state.current.fiscal || ''}
                    width='100%'
                    boxw='140px'
                    textw='medium'
                    icon='hourglass-2'
                    display
                  />
                </Box>
                <br />
                <Box direction='row'>
                  <DecoratedInput
                    area='RFC'
                    value={this.state.current.rfc || ''}
                    width='100%'
                    icon='id-card'
                  />
                </Box>
                <br />
                <Box direction='row'>
                  <DecoratedInput
                    area='Numero Tel.'
                    value={this.state.current.phoneNum || ''}
                    width='100%'
                    icon='mobile'
                  />
                </Box>
                <br />
                <_Button
                  style={{
                    backgroundColor: '#06554C',
                    color: '#F5F0F6',
                    width: '120px',
                    fontFamily: "'Manjari', sans-serif",
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.20)',
                  }}
                  onClick={() => {
                    this.props.history.push(
                      `/clientedit/${this.state.usr.Usr}/${this.state.current._id}`,
                      { ...this.state.usr }
                    );
                    // this.props.history.push(`/clientreg/${this.state.usr.Usr}`,
                    //   {
                    //       usr:this.state.usr,
                    //       client:this.state.current,

                    //   })
                  }}
                >
                <Icon icon='edit' /> 
                  Edit
                </_Button>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grommet>
    );
  }
}
export default ClientsList;
