import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const Groupview = () => {

    const { groupid } = useParams();

    const [pdata, setPdata] = useState({});

    useEffect(() => {
        fetch("http://localhost:4000/UserGroups/" + groupid).then((res) => {
            return res.json();
        }).then((resp) => {

            setPdata(resp);
            setId(resp.id);
            setName(resp.Name);
            setDescription(resp.Description);
            setClientVersion(resp.ClientVersion);
            
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

        console.log(pdata);
    const [id, setId] = useState("");
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [ClientVersion, setClientVersion] = useState("");
    const [validation, valchange] = useState(false);

    const navigate = useNavigate();

    const LoadGroup = (id) => {
        navigate("/group/"+id);
  }

   
    return (
        <div className="uhcontainer uvcenter uhcenter">
            <div className="ucard ucard-w50" >
                <div className="ucard-header">
                    <h2>Просмотр групп</h2>
                </div>
                <div className="ucard-body ">
                    
                        <div className="uform">
                            <div className="uform uform-fl">
                                <label>ID</label>
                                <label className="uctrl">{pdata.id}</label>
                            </div>
                            <div className="uform uform-fl">
                                <label>Наименование</label>
                                <label className="uctrl">{pdata.Name}</label>
                            </div>
                            <div className="uform uform-fl">
                                <label>Описание</label>
                                <label className="uctrl">{pdata.Description}</label>
                            </div>
                            <div className="uform uform-fl">
                                <label>Версия клиента</label>
                                <label className="uctrl">{pdata.ClientVersion}</label>
                            </div>
                            <div className="uform-act">
                                <a onClick={() => { LoadGroup(pdata.id) }} className="ubtn-inp ubg-blu">Возврат</a>
                            </div>
                        </div>

                    


                </div>
            </div>

        </div>
    )


}

export default Groupview