import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import AddTown from "./AddTown";
import EditTown from "./EditTown";
import {connect} from "react-redux";
import {setTownId} from '../actions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTimes, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const Towns = (props) => {

    const [towns, setTowns] = useState(null);
    const [addTown, setAddTown] = useState(false);
    const [editTown, setEditTown] = useState(0);
    const [townsEdited, setTownsEdited] = useState(true);

    const {setTownId} = props;

    useEffect(() => {
        if (townsEdited){
            axios.get('/api/towns').then(response => {
                setTowns(response.data);
            });
            setAddTown(false);
            setTownsEdited(false);
        }
    }, [townsEdited]);

    const deleteTown = (id) => {
        const url = `api/deletetown/${id}`;
        axios.delete(url)
            .then(response => {
                setTownsEdited(true)
            }).catch(error => {
            console.log(error)
        })
    };

    return (
        <div className="main-content container">
            <h1>Towns</h1>
            <div className="item-list">
                {towns && towns.map(town =>
                    <div className="item">
                        <Link to='/pubs' onClick={() => setTownId(town.id)}>{town.name}</Link>
                        <div className="item__buttons">
                            <FontAwesomeIcon icon={faPen} onClick={() => setEditTown(town.id)} size="lg"/>
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteTown(town.id)} size="lg"/>
                        </div>
                        {editTown === town.id ?
                            <div className="item__edit">
                                <div className="item__edit-header">
                                    <FontAwesomeIcon icon={faTimes} onClick={() => setEditTown(0)} size="lg"/>
                                </div>
                                <EditTown
                                    town={town}
                                />
                            </div>
                            : null}
                    </div>
                )}

                <div className="item__edit-header">
                    <button onClick={() => setAddTown(true)}>Add Town</button>
                    {addTown ?
                        <FontAwesomeIcon icon={faTimes} onClick={() => setAddTown(false)} size="lg"/> : null
                    }
                </div>
                {addTown && <AddTown
                    setTownsEdited={setTownsEdited}/>
                }

            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {}
};
const mapDispatchToProps = dispatch => {
    return {
        setTownId: (id) => {
            dispatch(setTownId(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Towns);
