import React, {useState, useEffect} from 'react';
import axios from 'axios';

const EditPub = (props) => {

    const { town } = props;
    const [form, setForm] = useState({});

    useEffect(() => {
        setForm({
            name: town.name
        });
    }, [town]);

    const handleFieldChange = (e) => {
        const {name, value} = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))

    };

    const handleSubmit = () => {
        const url = `/api/edittown/${town.id}`;

        axios.put(url, form, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => console.log(response.data)).catch(error => console.log(error));
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label className="form-labels">Name: </label>
            <input type="text" name="name" id="name" value={form.name} onChange={handleFieldChange}/>
            <button type="submit">Edit</button>
        </form>
    );
};

export default EditPub;
