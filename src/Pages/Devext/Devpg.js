import { createStore } from 'devextreme-aspnet-data-nojquery';
import { DataGrid, Form } from 'devextreme-react';
import { Button, Column, Editing, Lookup, Selection } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';
import { useCallback, useEffect, useState } from 'react';
import 'whatwg-fetch';

const refreshModeLabel = { 'aria-label': 'Refresh Mode' };
const URL = 'http://localhost:4000/Users';
const REFRESH_MODES = ['full', 'reshape', 'repaint'];

const Devpg = () => {

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
       e.component.selectRows(e.row.key);
        console.log(e.row.key, "rw")
    }

    function frc(r){
        const rowcount = r.component.getDataSource().items().length
        r.component.selectRowsByIndexes(rowcount-1);
    //    r.component.selectRows(r.key);
        console.log(rowcount, "rrr")
    }

    function rowrem(e){
        var rkey = e.key;
        var rindex = e.component.getRowIndexByKey(rkey); 
        e.component.selectRowsByIndexes(rindex-1);
        console.log(e.component,"rem.key")
    }
    
    console.log({ordersData}, "orders")
    return (
        <div>
            <DataGrid
                dataSource={ordersData}
                showBorders={true}
                showRowLines={true}
                onRowInserted={(e) => frc(e)}
                onEditorPrepared={(e)=>rowsel(e)}
                onRowRemoving={e => rowrem(e)}
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
                <Column dataField="FirstName" caption="Имя" />
                <Column dataField="LastName" caption="Фамилия" />
                <Column dataField="Login" caption="Логин" width={70} />
                <Column dataField="Password" caption="Пароль" />
                <Column dataField="IdPriority" caption="Приоритет" width={170} />
                <Column dataField="IdUserGroups" caption="Группа" width={125}>
                    <Lookup dataSource={grdata} valueExpr="id" displayExpr="Name" />
                </Column>
                <Column dataField="Status" caption="Статус" />
                <Column dataField="DataChangePassword" caption="Дата" />

            </DataGrid>

        </div>
    )

}
export default Devpg