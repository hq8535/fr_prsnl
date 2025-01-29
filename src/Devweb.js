import React from 'react';
import 'devextreme/data/odata/store';
import {
  Column,
  DataGrid,
  FilterRow,
  HeaderFilter,
  GroupPanel,
  Scrolling,
  Editing,
  Grouping,
  Lookup,
  MasterDetail,
  Summary,
  RangeRule,
  RequiredRule,
  StringLengthRule,
  GroupItem,
  TotalItem,
  ValueFormat,
  Paging,
} from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
//import MasterDetailGrid from './MasterDetailGrid.tsx';

const url = 'http://localhost:4000/Users';

const dataSource = createStore({
  key: 'id',
  loadUrl: `http://localhost:4000/Users`,
  insertUrl: `${url}`,
  updateUrl: `${url}`,
  deleteUrl: `${url}`,
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.xhrFields = { withCredentials: false };
  },
});
console.log(dataSource, "ddd")
// const customersData = createStore({
//   key: 'Value',
//   loadUrl: `${url}/CustomersLookup`,
//   onBeforeSend: (method, ajaxOptions) => {
//     ajaxOptions.xhrFields = { withCredentials: true };
//   },
// });

// const shippersData = createStore({
//   key: 'Value',
//   loadUrl: `${url}/ShippersLookup`,
//   onBeforeSend: (method, ajaxOptions) => {
//     ajaxOptions.xhrFields = { withCredentials: true };
//   },
// });

const Devweb = () => (
  <DataGrid
    dataSource={dataSource}
    showBorders={true}
    width="100%"
    height={600}
    remoteOperations={true}
  >
    <Editing
      refreshMode="full"
      mode="form"
      allowAdding={true}
      allowDeleting={true}
      allowUpdating={true}
    />
    <Grouping autoExpandAll={false} />
    <Paging enabled={false} />

    {/* <Column dataField="CustomerID" caption="Customer">
      <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" />
      <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." />
    </Column> */}
      <Column dataField="id" dataType="ID" caption="ID">
      </Column>

      <Column dataField="FirstName" caption="Имя">
      </Column>

      <Column dataField="LastName" caption="Фамилия">
      </Column>

      <Column dataField="Login" caption="Логин">
      </Column>

      <Column dataField="Password" caption="Пароль">
      </Column>

      <Column dataField="IdPriority" caption="Приоритет">
      </Column>

      <Column dataField="IdUserGroups" caption="Группа">
      </Column>

      <Column dataField="Status" caption="Статус">
      </Column>

      <Column dataField="DateChangePassword" caption="Дата пароля">
      </Column>


  </DataGrid>
);

export default Devweb;
