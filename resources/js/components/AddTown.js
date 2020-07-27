import React, {useState} from 'react';
import axios from "axios";

const AddTown = (props) => {

    const { setTownsEdited } = props;
    const [form, setForm] = useState(null);
    const handleFieldChange = (e) => {
        const {value} = e.target;
            setForm({
                name: value
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = '/api/addtown';
        console.log(form);
        axios.post(url, form, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response =>
            setTownsEdited(true)
        ).catch(error => console.log(error));
    };

    return (
        <form className="form add-form" onSubmit={handleSubmit}>
            <label className="form-labels">Name: </label>
            <input type="text" name="name" id="name" onChange={handleFieldChange} required/>
            <button type="submit">Create</button>
        </form>
    );
};

export default AddTown;
