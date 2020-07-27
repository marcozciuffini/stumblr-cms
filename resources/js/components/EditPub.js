import React, {useState, useEffect} from 'react';
import axios from 'axios';

const EditPub = (props) => {

    const { pub, towns, setWasEdited, setTownId } = props;
    const openingTimes = JSON.parse(pub.opening_times);
    const [form, setForm] = useState({});

    useEffect(() => {
        setForm({
            name: pub.name,
            address: pub.address,
            website: pub.website,
            phone_number: pub.phone_number,
            opening_times: {
                monday: {open: openingTimes.monday.open, close: openingTimes.monday.close},
                tuesday: {open: openingTimes.tuesday.open, close: openingTimes.tuesday.close},
                wednesday: {open: openingTimes.wednesday.open, close: openingTimes.wednesday.close},
                thursday: {open: openingTimes.thursday.open, close: openingTimes.thursday.close},
                friday: {open: openingTimes.friday.open, close: openingTimes.friday.close},
                saturday: {open: openingTimes.saturday.open, close: openingTimes.saturday.close},
                sunday: {open: openingTimes.sunday.open, close: openingTimes.sunday.close}
            },
            town_id: pub.town_id,
            long: pub.long,
            lat: pub.lat
        });
    }, [pub]);

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
        const url = `/api/editpub/${pub.id}`;

        axios.put(url, form, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            setWasEdited(true);
            setTownId(form.town_id);
        }).catch(error => console.log(error));


    };

    return (
            <form className="form edit-form" onSubmit={handleSubmit}>
                <label className="form-labels">Name: </label>
                <input type="text" name="name" id="name" value={form.name} onChange={handleFieldChange}/>

                <label className="form-labels">First line of Address: </label>
                <input type="text" name="address" id="address" value={form.address} onChange={handleFieldChange}/>

                <label className="form-labels">Town: </label>
                {towns && (
                    <select type="select" name="town_id" id="town_id" onChange={handleFieldChange}>
                        {towns.map(town => (
                                <option selected={town.id === form.town_id ? "selected" : null} value={parseInt(town.id)}>{town.name}</option>
                            )
                        )}
                    </select>
                )}

                <label className="form-labels">Website: </label>
                <input type="text" name="website" id="website" value={form.website} onChange={handleFieldChange}/>

                <label className="form-labels"> Phone Number:  </label>
                <input type="text" name="phone_number" id="phone_number" value={form.phone_number} onChange={handleFieldChange}/>

                <label className="form-labels">Latitude: </label>
                <input type="number" step="0.000001" name="lat" id="lat" value={form.lat} onChange={handleFieldChange}/>

                <label className="form-labels">Longitude: </label>
                <input type="number" step="0.000001" name="long" id="long" value={form.long} onChange={handleFieldChange}/>


                <label>Opening Times:</label>
                {form.opening_times && (
                    <ul>
                        <li>
                            <label className="form-labels">Monday: </label>
                            <input type="time" name="monday-open" id="monday-open"
                                   value={form.opening_times.monday.open} onChange={handleFieldChange}/>
                            <input type="time" name="monday-close" id="monday-close"
                                   value={form.opening_times.monday.close} onChange={handleFieldChange}/>
                        </li>

                        <li>
                            <label className="form-labels">Tuesday: </label>
                            <input type="time" name="tuesday-open" id="tuesday-open"
                                   value={form.opening_times.tuesday.open} onChange={handleFieldChange}/>
                            <input type="time" name="tuesday-close" id="tuesday-close"
                                   value={form.opening_times.tuesday.close} onChange={handleFieldChange}/>
                        </li>

                        <li>
                            <label className="form-labels">Wednesday: </label>
                            <input type="time" name="wednesday-open" id="wednesday-open"
                                   value={form.opening_times.wednesday.open} onChange={handleFieldChange}/>
                            <input type="time" name="wednesday-close" id="wednesday-close"
                                   value={form.opening_times.wednesday.close} onChange={handleFieldChange}/>
                        </li>

                        <li>
                            <label className="form-labels">Thursday: </label>
                            <input type="time" name="thursday-open" id="thursday-open"
                                   value={form.opening_times.thursday.open} onChange={handleFieldChange}/>
                            <input type="time" name="thursday-close" id="thursday-close"
                                   value={form.opening_times.thursday.close} onChange={handleFieldChange}/>
                        </li>

                        <li>
                            <label className="form-labels">Friday: </label>
                            <input type="time" name="friday-open" id="friday-open"
                                   value={form.opening_times.friday.open} onChange={handleFieldChange}/>
                            <input type="time" name="friday-close" id="friday-close"
                                   value={form.opening_times.friday.close} onChange={handleFieldChange}/>
                        </li>

                        <li>
                            <label className="form-labels">Saturday: </label>
                            <input type="time" name="saturday-open" id="saturday-open"
                                   value={form.opening_times.saturday.open} onChange={handleFieldChange}/>
                            <input type="time" name="saturday-close" id="saturday-close"
                                   value={form.opening_times.saturday.close} onChange={handleFieldChange}/>
                        </li>

                        <li>
                            <label className="form-labels">Sunday: </label>
                            <input type="time" name="sunday-open" id="sunday-open"
                                   value={form.opening_times.sunday.open} onChange={handleFieldChange}/>
                            <input type="time" name="sunday-close" id="sunday-close"
                                   value={form.opening_times.sunday.close} onChange={handleFieldChange}/>
                        </li>
                    </ul>
                )}
                <button type="submit">Edit</button>
            </form>
    );
};

export default EditPub;
