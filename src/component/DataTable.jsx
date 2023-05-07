import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Row } from 'react-bootstrap';


function Datatable() {
  const [datas, setData] = useState();

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/');
      const responseData = Array.isArray(response.data.data) ? response.data.data : [response.data.data]; // check if data is an array
      setData(responseData);
      console.log(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };

 

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Sex /age',
      selector: row =>`${ row.sex} /${row.age}`,
      sortable: true,
    },
    {
      name: 'Mobile',
      selector: row =>row.phone,
      sortable: true,
    },
    {
      name: 'Address',
      selector: row =>row.address,
      sortable: true,
    },
    {
      name: 'Govr Id type',
      selector: row =>row.govtIdType
      ,
      sortable: true,
    },
    {
      name: 'Govr Id ',
      selector: row =>row.govtId,
      sortable: true,
    },
    {
      name: 'Guardian Type',
      selector: row =>row.guardian,
      sortable: true,
    },
    {
      name: 'Guardian Name',
      selector: row =>row.guardianName,
      sortable: true,
    },
    {
      name: 'Nationality',
      selector: row =>row.nationality,
      sortable: true,
    },
    
  ];
  useEffect(() => {
    getData();
  }, []);
console.log(datas);
  return (
    <>
      <h1>Data Table</h1>
      <DataTable
        columns={columns}
        data={datas}
        pagination={true}
        highlightOnHover={true}
        striped={true}
      />
    </>
  );
}

export default Datatable;

