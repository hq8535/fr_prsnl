import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Groupadd = () => {

    const [id, setId] = useState("");
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [ClientVersion, setClientVersion] = useState("");
    const [validation, valchange] = useState(false);

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        //    console.log({id,name,email,phone,active})
        const grdata = { Name, Description, ClientVersion};
        console.log(grdata)

        fetch("http://localhost:4000/UserGroups", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(grdata)
        }).then((res) => {
            alert("Saved successfully.")
            navigate('/group');
        }).catch((err) => {
            console.log(err.message)
        })

        
    }

    return (
        <div className="uhcontainer uvcenter uhcenter">
            <div className="ucard ucard-w50" >
                <div className="ucard-header">
                    <h2>Добавление групп</h2>
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
                                <Link to="/group" className="ubtn-inp ubg-blu">Возврат</Link>
                            </div>
                        </form>

                    


                </div>
            </div>

        </div>
    )


}

export default Groupadd