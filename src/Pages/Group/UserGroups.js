//import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"


const UserGroups = () => {
    console.log("group")

    const [grdata, setGrdata] = useState(null);

    const navigate = useNavigate();
    const { groupid } = useParams();

    const LoadDetail = (id) => {
          navigate("/group/view/"+id);
    }
    const LoadEdit = (id) => {
          navigate("/group/edit/"+id);
    }
    const RemoveFunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:4000/UserGroups/" + id, {
                method: "DELETE",
            }).then((res) => {
                if (res.ok) {
                alert("Удаление произошло успешно");
                window.location.reload();
                }
                else {
                    alert("Произошла ошибка. Статус ошибки: "+res.status);
                    
                }
                
                navigate('/group');
            }).catch((err) => {
                console.log("ошибка")
            })
        }

    }
/*
    async function getGroups() {
        const response = await axios.get('http://localhost:4000/UserGroups');
        setGrdata(response.data);
    }

    useEffect(() => {
       getGroups();
    }, [])
*/

    useEffect(() => {
        fetch("http://localhost:4000/UserGroups").then((res) => {
            return res.json();
        }).then((resp) => {
            setGrdata(resp);
            console.log(resp)
           
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    console.log("group-mid");


    let item_id;
    let sr;
    const selr = (e,idp) => {
    //   sr != null ? sr.className="":console.log("no") 
       if (sr != null) {
        sr.className="";
       } else {
        const tble=document.querySelector('#ptable');
        const rows = tble.querySelectorAll('tr');
        rows.forEach((rr)=>(rr.className=""));
       }
       e.className="utable-r";
       sr=e;
       item_id=idp;

     //  console.log(item_id);
     //  console.log(sr)

    }


    const frow = ()=>{
        const tble=document.querySelector('#ptable');
        const rows = tble.querySelectorAll('tr');
      //  rows.map(kk=>(console.log(kk)));
      //  console.log(rows[3].className="utable-r");
    }

    console.log("group-end");

    return (
        <div className="uhcontainer uhcenter">
            <div className="">
                <div className="ucard-header">
                    <h2>Группы пользователей</h2>
                </div>
                <div className="ucard-body">
                    <div >
                        <button className="ubtn ubg-blu" onClick= {() =>(navigate('/group/add'))} type="button">Добавить</button>
                    </div>
                    
                    <table className="utable" id="ptable">
                        <thead className="utabhead">
                            <tr>
                                <td>ID</td>
                                <td>Наименование</td>
                                <td>Описание</td>
                                <td>Версия клиента</td>
                                <td>Действие</td>
                            </tr>
                        </thead>
                        <tbody>
                            {grdata &&
                                grdata.map(item => (
                                    <tr key={item.id} className={groupid==item.id?"utable-r":""} onMouseDown={(e)=>( selr(e.currentTarget, item.id))}>
                                        <td>{item.id}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Description}</td>
                                        <td>{item.ClientVersion}</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="ubtn ubg-gre">Изменить</a>
                                            <a onClick={() => { RemoveFunction(item.id) }} className="ubtn ubg-red">Удалить</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="ubtn ubg-blu">Просмотр</a>
                                        </td>
                                    </tr>
                                )

                                )
                            }
                        </tbody>
                    </table>

                    <div />
                </div>

            </div>

        </div >
    )
}

export default UserGroups;