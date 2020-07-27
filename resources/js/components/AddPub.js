import React, { useState } from 'react';
import axios from "axios";


const AddPub = (props) => {

    const { towns, townId, setWasEdited } = props;
    const [form, setForm] = useState({
        name: null,
        address: null,
        opening_times: {
            monday: {open: "00:00", close: "00:00"},
            tuesday: {open: "00:00", close: "00:00"},
            wednesday: {open: "00:00", close: "00:00"},
            thursday: {open: "00:00", close: "00:00"},
            friday: {open: "00:00", close: "00:00"},
            saturday: {open: "00:00", close: "00:00"},
            sunday: {open: "00:00", close: "00:00"}
        },
        town_id: parseInt(townId),
        long: null,
        lat: null
    });

    const handleFieldChange = (e) => {
        const {name, value, type} = e.target;
        if (type === 'time') {
            const stringArray = name.split(/\s*\-\s*/g);
            setForm(prevState => ({
                ...prevState,
                opening_times: {
                    ...prevState.opening_times,
                    [stringArray[0]]: {
                        ...prevState.opening_times[stringArray[0]],
                        [stringArray[1]]: value
                    }
                }
            }))
        } else {
            setForm(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = '/api/addpub';
        console.log(form);
        axios.post(url, form, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response =>
            setWasEdited(true)
        ).catch(error => console.log(error));
    };

    return (

        <form className="form add-form" onSubmit={handleSubmit}>
            <label className="form-labels">Name: </label>
            <input type="text" name="name" id="name" onChange={handleFieldChange} required/>

            <label className="form-labels">Address: </label>
            <input type="text" name="address" id="address" onChange={handleFieldChange} required/>

            <label className="form-labels">Town: </label>
            <select type="select" name="town_id" id="town_id" onChange={handleFieldChange} required>
                {form.town_id === 0 ? <option defaultValue="">Please Select</option> : null}
                {towns && towns.map(town =>
                    <option selected={town.id === form.town_id ? "selected" : null} value={town.id}>{town.name}</option>
                )}
            </select>

            <label className="form-labels">Website: </label>
            <input type="text" name="website" id="website" onChange={handleFieldChange} required/>

            <label className="form-labels">Phone Number: </label>
            <input type="tel" name="phone_number" id="phone_number" onChange={handleFieldChange} required/>

            <label className="form-labels">Latitude: </label>
            <input type="number" step="0.000001" name="lat" id="lat" onChange={handleFieldChange} required/>

            <label className="form-labels">Longitude: </label>
            <input type="number" step="0.000001" name="long" id="long" onChange={handleFieldChange} required/>

            <label>Opening Times</label>
            <ul>
                <li>
                    <label className="form-labels">Monday: </label>
                    <input type="time" name="monday-open" id="monday-open" onChange={handleFieldChange} />
                    <input type="time" name="monday-close" id="monday-close" onChange={handleFieldChange} />
                </li>

                <li>
                    <label className="form-labels">Tuesday: </label>
                    <input type="time" name="tuesday-open" id="tuesday-open" onChange={handleFieldChange} />
                    <input type="time" name="tuesday-close" id="tuesday-close" onChange={handleFieldChange} />
                </li>

                <li>
                    <label className="form-labels">Wednesday: </label>
                    <input type="time" name="wednesday-open" id="wednesday-open" onChange={handleFieldChange} />
                    <input type="time" name="wednesday-close" id="wednesday-close" onChange={handleFieldChange} />
                </li>

                <li>
                    <label className="form-labels">Thursday: </label>
                    <input type="time" name="thursday-open" id="thursday-open" onChange={handleFieldChange} />
                    <input type="time" name="thursday-close" id="thursday-close" onChange={handleFieldChange} />
                </li>

                <li>
                    <label className="form-labels">Friday: </label>
                    <input type="time" name="friday-open" id="friday-open" onChange={handleFieldChange} />
                    <input type="time" name="friday-close" id="friday-close" onChange={handleFieldChange} />
                </li>

                <li>
                    <label className="form-labels">Saturday: </label>
                    <input type="time" name="saturday-open" id="saturday-open" onChange={handleFieldChange} />
                    <input type="time" name="saturday-close" id="saturday-close" onChange={handleFieldChange} />
                </li>

                <li>
                    <label className="form-labels">Sunday: </label>
                    <input type="time" name="sunday-open" id="sunday-open" onChange={handleFieldChange} />
                    <input type="time" name="sunday-close" id="sunday-close" onChange={handleFieldChange} />
                </li>

            </ul>

            <button type="submit">Create</button>
        </form>

    );
};

export default AddPub;
