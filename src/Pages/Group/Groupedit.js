import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const Groupedit = () => {

    const { groupid } = useParams();

    console.log(groupid);

    useEffect(() => {
        fetch("http://localhost:4000/UserGroups/" + groupid).then((res) => {
            return res.json();
        }).then((resp) => {
            setId(resp.id);
            setName(resp.Name);
            setDescription(resp.Description);
            setClientVersion(resp.ClientVersion);
            
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    const [id, setId] = useState("");
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [ClientVersion, setClientVersion] = useState("");
    const [validation, valchange] = useState(false);

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        //    console.log({id,name,email,phone,active})
        const grdata = { id, Name, Description, ClientVersion};
        console.log(grdata)

        fetch("http://localhost:4000/UserGroups/"+groupid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(grdata)
        }).then((res) => {
            if (!res.ok) {alert("Не сохранено. Статус ошибки: "+res.status)};
            navigate('/group/'+id);
        }).catch((err) => {
            console.log(err.message)
        })

    }

    return (
        <div className="uhcontainer uhcenter uvcenter">
            <div className="ucard ucard-w50" >
                <div className="ucard-header">
                    <h2>Редактирование групп</h2>
                </div>
                <div className="ucard-body ">
                    
                        <form className="uform" onSubmit={handlesubmit}>
                            <div className="uform uform-fl">
                                <label>ID</label>
                                <input value={id} disabled="disabled" className="uform-ctrl"></input>
                            </div>
                        
                            <div className="uform uform-fl">
                                <label>Наименование</label>
                                <input required value={Name} onMouseDown={e => valchange(true)} onChange={e => setName(e.target.value)} className="uform-ctrl"></input>
                                {Name.length == 0 && validation && <span className="text-danger">Введите наименование</span>}
                            </div>
                            <div className="uform uform-fl">
                                <label>Описание</label>
                                <input value={Description} onChange={e => setDescription(e.target.value)} className="uform-ctrl"></input>
                            </div>
                            <div className="uform uform-fl">
                                <label>Версия клиента</label>
                                <input value={ClientVersion} onChange={e => setClientVersion(e.target.value)} className="uform-ctrl"></input>
                            </div>
                            <div className="uform-act">
                                <button className="ubtn ubg-gre" type="submit">Сохранить</button>
                                <button className="ubtn ubg-blu" onClick= {() =>(navigate('/group/'+id))} type="button">Возврат</button>
                                
                            </div>
                        </form>

                    


                </div>
            </div>

        </div>
    )


}

export default Groupedit