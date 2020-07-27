export const handleFieldChange = (e) => {
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
