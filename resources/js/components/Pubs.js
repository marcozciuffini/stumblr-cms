import React, {useEffect, useState} from 'react';
import axios from "axios";
import AddPub from "./AddPub";
import EditPub from "./EditPub";
import {connect} from "react-redux";
import {setTownId} from "../actions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {faTimes} from '@fortawesome/free-solid-svg-icons'

const Pubs = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [pubs, setPubs] = useState(null);
    const [towns, setTowns] = useState(null);
    const [addPub, setAddPub] = useState(false);
    const [editPub, setEditPub] = useState(0);
    const [pubsEdited, setPubsEdited] = useState(true);

    const {townId, setTownId} = props;

    useEffect(() => {
        if (pubsEdited) {
            setIsLoading(true);
            axios.get(`/api/pubs`).then(response => {
                setPubs(response.data);
                setIsLoading(false);
            });
            axios.get('/api/towns').then(response => {
                setTowns(response.data);
                setIsLoading(false);
            });
            setAddPub(false);
            setEditPub(0);
            setPubsEdited(false);
        }
    }, [pubsEdited]);

    if (isLoading) {
        return <h1>Loading</h1>
    }


    const deletePub = (id) => {
        const url = `api/deletepub/${id}`;
        axios.delete(url)
            .then(() => {
                setPubsEdited(true);
            }).catch(error => {
            console.log(error)
        })
    };

    const handleSelectChange = (e) => {
        setTownId(e.target.value)
    };


    return (
        <div className="main-content container">
            <div className="main-content__header">
                <h1>Pubs</h1>
                {towns && (
                    <select type="select" name="town_id" id="town_id" onChange={(e) => handleSelectChange(e)}>
                        {!towns || pubs.length === 0 ? <option defaultValue="">Select Town</option> : null}
                        {towns.map(town => (
                                <option selected={town.id == townId ? "selected" : null}
                                        value={town.id}>{town.name}</option>
                            )
                        )}
                    </select>
                )}
            </div>
            {pubs && pubs.length > 0 && (
                <div className="item-list">
                    {pubs.map((pub) => (
                            pub.town_id == townId || townId === 0 ?
                                <div className="item">
                                    <h2 className="item__heading">{pub.name}</h2>
                                    <div className="item__buttons">
                                        <FontAwesomeIcon icon={faPen} onClick={() => setEditPub(pub.id)} size="lg"/>
                                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => deletePub(pub.id)} size="lg"/>
                                    </div>
                                    {editPub === pub.id ?
                                        <div className="item__edit">
                                            <div className="item__edit-header">
                                                <h4>Edit</h4>
                                                <FontAwesomeIcon icon={faTimes} onClick={() => setEditPub(0)} size="lg"/>
                                            </div>
                                            <EditPub
                                                pub={pub}
                                                towns={towns}
                                                setWasEdited={setPubsEdited}
                                                setTownId={setTownId}
                                            />
                                        </div>
                                        : null}
                                </div>
                                : null
                        )
                    )}
                </div>
            )}
            <div className="item__edit-header">
            <button onClick={() => setAddPub(true)}>Add Pub</button>
            {addPub ?
                <FontAwesomeIcon icon={faTimes} onClick={() => setAddPub(false)} size="lg"/> : null
            }
        </div>
            {addPub &&
            <AddPub
                towns={towns}
                townId={townId}
                setWasEdited={setPubsEdited}
                setTownId={setTownId}
            />
            }

        </div>
    );
};

const mapStateToProps = state => {
    return {
        townId: state.townId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setTownId: (id) => {
            dispatch(setTownId(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pubs);
