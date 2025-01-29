import React, { useEffect, useState } from 'react';

import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Form,
  Selection,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import CustomStore from 'devextreme/data/custom_store';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import 'whatwg-fetch';
//import { employees, states } from './data.ts';








// import { createStore } from 'devextreme-aspnet-data-nojquery';
// //import MasterDetailGrid from './MasterDetailGrid.js';

const url = 'http://localhost:4000';
// const dataSource = createStore({
//   key: 'id',
//   loadUrl: `${url}/Users`,
//   lnsertUrl: `${url}/Users`,
//   updateUrl: `${url}`,
//   deleteUrl: `${url}`,
//   onBeforeSend: (method, ajaxOptions) => {
//     ajaxOptions.xhrFields = { withCredentials: false };
//   },
// });
// const groupdata = createStore({
//   key: 'Value',
//   loadUrl: `${url}/UserGroups`,
//   onBeforeSend: (method, ajaxOptions) => {
//     ajaxOptions.xhrFields = { withCredentials: false };
//   },
// });




const notesEditorOptions = { height: 100 };

const Devweb1 = () => {

  const url = 'http://localhost:4000/Users';

  const dataSource = createStore({
    key: 'id',
    loadUrl: `http://localhost:4000/Users`,
    insertUrl: `http://localhost:4000/Users`,
    updateUrl: `${url}`,
    deleteUrl: `${url}`,
    // onBeforeSend: (method, ajaxOptions) => {
    //   ajaxOptions.xhrFields = { withCredentials: false };
 //   },
  });
  console.log(dataSource, "ddd")

  const [grdata, setGrdata] = useState(null);
  // const [usrdata, setUsrdata] = useState(null)

  function frc(st) {
    console.log(st, "state")
    console.log(DataGrid.FocusedRowIndex);
  }

  const refreshMode = 'full';


  const frow = (usr) => {
    const tble = document.querySelector('table');

    // const rows = tble.querySelectorAll('tr');
    // const cells = rows.querySelectorAll('td');
    //console.log(rows)
    //    rows.forEach((rr)=>( console.log(rr.cells[0].innerHTML)))
    //        rr.className={rr.cells[0].innerHTML === usr ? "utable-r" : ""}) 
    //   console.log(rows[3].cells[0].innerHTML)
  }


  return (

    <div >
      <DataGrid
        dataSource={dataSource}
        keyExpr="id"
        showBorders={true}
        onRowClick={(e) => (frc(e))}
      >
        <Selection mode="single" />
        <Paging enabled={false} />
        <Editing
          mode="popup"
          refreshMode="full"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}>
          <Popup title="Employee Info" showTitle={true} width={700} height={525} />
          {/* <Form formData={ordersData} >
            <Item itemType="group" colCount={2} colSpan={2}>
            <Item dataField="id" />
            <Item dataField="Login" />
            <Item dataField="FirstName" />
            <Item dataField="LastName" />
            <Item dataField="Password" />
            <Item dataField="IdPriority" />
            <Item dataField="IdUserGroup" />
            <Item dataField="Status" />
            <Item dataField="DataChangePassword" />
          </Item>
       </Form>   */}
        </Editing>
        <Column dataField="id" caption="ID" width={70} />
        <Column dataField="Login" caption="Логин" width={70} />
        <Column dataField="FirstName" caption="Имя" />
        <Column dataField="LastName" caption="Фамилия" />
        <Column dataField="Password" caption="Пароль" />
        <Column dataField="IdPriority" caption="Приоритет" width={170} />
        <Column dataField="IdUserGroups" caption="Группа" width={125}>
          <Lookup dataSource={grdata} valueExpr="id" displayExpr="Name" />
        </Column>
        <Column dataField="Status" caption="Статус" />
        <Column dataField="DataChangePassword" caption="Дата" />
      </DataGrid>
    </div>
  );
}
export default Devweb1;
