import { createStore } from 'devextreme-aspnet-data-nojquery';
import { DataGrid, Form } from 'devextreme-react';
import { Button, Column, Editing, Lookup, Selection } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';
import { useCallback, useEffect, useState } from 'react';
import 'whatwg-fetch';

const refreshModeLabel = { 'aria-label': 'Refresh Mode' };
const URL = 'https://localhost:7280/Users';
const REFRESH_MODES = ['full', 'reshape', 'repaint'];

const Dev = () => {

    const [grdata, setGrdata] = useState({});

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
    const [ordersData] = useState(
        new CustomStore({
            key: 'id',
            load: () => sendRequest(`${URL}`, 'GET'),
            insert: (values) => sendRequest(`${URL}`, 'POST', values),
            update: (key, values) => sendRequest(`${URL}/${encodeURIComponent(key)}`, 'PUT', values),
            remove: (key) => sendRequest(`${URL}/${encodeURIComponent(key)}`, 'DELETE'),
        }),
    );

    useEffect(() => {
        fetch("http://localhost:4000/UserGroups").then((res) => {
            return res.json();
        }).then((resp) => {
            setGrdata(resp);
            console.log(resp)

        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const [requests, setRequests] = useState([]);
    const [refreshMode, setRefreshMode] = useState('reshape');

    const handleRefreshModeChange = useCallback((e) => {
        setRefreshMode(e.value);
    }, []);
    const clearRequests = useCallback(() => {
        setRequests([]);
    }, []);

    const logRequest = useCallback((url, method, data) => {
        const args = Object.keys(data || {})
            .map((key) => `${key}=${data[key]}`)
            .join(' ');
        const time = formatDate(new Date(), 'HH:mm:ss');
        const request = [time, method, url.slice(URL.length), args].join(' ');
        setRequests((prevRequests) => [request].concat(prevRequests));
    }, []);

    const sendRequest = useCallback(
        async (url, method = 'GET', data = {}) => {
            logRequest(method, url, data);
            switch (method) {
                case 'GET':
                    const gres = await fetch(url);
                    console.log(gres, "gres")
                    const grez = await gres.json();
                    
                    return grez;
                case 'POST':
                    console.log(data, "data");
                    fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(handleErrors)
                        .catch(() => { throw 'Network error' });
                    return;
                case 'PUT':
                    console.log(method)
                    fetch(url, {
                        method: 'PATCH',
                        body: JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(handleErrors)
                        .catch(() => { throw 'Network error' });
                    return;
                case 'DELETE':
                    console.log(method)
                    fetch(url, {
                        method: 'DELETE'
                    })
                        .then(handleErrors)
                        .catch(() => { throw 'Network error' });
                    return;
            }
        },
        [logRequest],
    )

    function rowsel(e) {
        console.log(e.component.getSelectedRowKeys, "rw")
    }
    console.log({ordersData}, "orders")
    return (
        <div>
            <DataGrid
                dataSource={ordersData}
                showBorders={true}
                showRowLines={true}
                onRowClick={(e) => rowsel(e)}
            >
                <Editing
                    mode="popup"
                    refreshMode="full"
                    useIcons={true}
                    allowUpdating={true}
                    allowAdding={true}
                    allowDeleting={true}>
                </Editing>

                <Selection mode="single" />
                <Column dataField="id" caption="ID" width={70} />
                <Column dataField="firstName" caption="Имя" />
                <Column dataField="lastName" caption="Фамилия" />
                <Column dataField="login" caption="Логин" width={70} />
                <Column dataField="password" caption="Пароль" />
                <Column dataField="idPriority" caption="Приоритет" width={170} />
                <Column dataField="idUserGroups" caption="Группа" width={125}>
                    <Lookup dataSource={grdata} valueExpr="id" displayExpr="Name" />
                </Column>
                <Column dataField="status" caption="Статус" />
                <Column dataField="dataChangePassword" caption="Дата" />

            </DataGrid>

        </div>
    )

}
export default Dev