import { DataGrid } from 'devextreme-react';
import { Column, Editing, Selection } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';
import { useCallback, useState } from 'react';
import 'whatwg-fetch';

const refreshModeLabel = { 'aria-label': 'Refresh Mode' };
const URL = 'http://localhost:4000/Users';
const REFRESH_MODES = ['full', 'reshape', 'repaint'];
const Dev = () => {
  const [ordersData] = useState(
    new CustomStore({
      key: 'id',
      load: () => sendRequest(URL),

      insert: (values) =>
        sendRequest(`${URL}/InsertOrder`, 'POST', {
          values: JSON.stringify(values),
        }),

      update: (key, values) =>
        sendRequest(`${URL}/UpdateOrder`, 'PUT', {
          key,
          values: JSON.stringify(values),
        }),

      remove: (key) =>
        sendRequest(`${URL}/DeleteOrder`, 'DELETE', {
          key,
        }),
    }),
  );
//   const [customersData] = useState(
//     new CustomStore({
//       key: 'Value',
//       loadMode: 'raw',
//       load: () => sendRequest(`${URL}`),
//     }),
//   );
//   const [shippersData] = useState(
//     new CustomStore({
//       key: 'Value',
//       loadMode: 'raw',
//       load: () => sendRequest(`${URL}/ShippersLookup`),
//     }),
//   );

  const [requests, setRequests] = useState([]);
  const [refreshMode, setRefreshMode] = useState('reshape');

  const handleRefreshModeChange = useCallback((e) => {
    setRefreshMode(e.value);
  }, []);
  const clearRequests = useCallback(() => {
    setRequests([]);
  }, []);

  const logRequest = useCallback((method, url, data) => {
    const args = Object.keys(data || {})
      .map((key) => `${key}=${data[key]}`)
      .join(' ');
    const time = formatDate(new Date(), 'HH:mm:ss');
    const request = [time, method, url.slice(URL.length), args].join(' ');
    setRequests((prevRequests) => [request].concat(prevRequests));
  }, []);

  const sendRequest = useCallback(

    async(url, method = 'GET', data = {}) => {
      logRequest(method, url, data);
      const request = {
        method,
        credentials: 'include',
      };

      if (['DELETE', 'POST', 'PUT'].includes(method)) {
        const params = Object.keys(data)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
          .join('&');

        request.body = params;
        request.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
      }
      const response = await fetch(url, request);
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const result = isJson ? await response.json() : {};
      if (!response.ok) {
        throw result.Message;
      }
      return method === 'GET' ? result.data : {};
    },
    [logRequest],
  );

    return (
        <div>
            <DataGrid
                dataSource={ordersData}
                showBorders={true}

            //     dataSourceChanged={dataSourceChange}
            >
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowAdding={true}
                    allowDeleting={true}>
                </Editing>

                <Selection mode = "single"/>
            </DataGrid>



            <Editing
                mode="form"
                allowUpdating={true}
                allowAdding={true}
                allowDeleting={true} />

            <Column dataField="id" caption="Title" width={70} />
            <Column dataField="FirstName" />
            <Column dataField="LastName" />
            <Column dataField="Login" />
            <Column dataField="Password" />
            <Column dataField="LaIdPriority" />
            <Column dataField="Status" />
            <Column dataField="DateChangePassword" />

        </div>
    )

}
export default Dev