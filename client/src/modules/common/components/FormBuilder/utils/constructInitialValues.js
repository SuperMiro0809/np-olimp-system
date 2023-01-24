export function constructArrayFieldValues (field, values) {
    if (values[field.name]) {
        values[field.name] = values[field.name].map((el, index) => {

            field.fields.forEach((f) => {
                if (!el[f.name]) {
                    if(f.type === 'array') {
                        constructArrayFieldValues(f, values[field.name][index]);
                    }else {
                        el[f.name] = '';
                    }
                }
            })

            return el;
        })
    } else {
        values[field.name] = [{}];

        field.fields.forEach((f) => {
            if(f.type === 'array') {
                constructArrayFieldValues(f, values[field.name][0]);
            }else {
                values[field.name][0][f.name] = '';
            }
        })
    }
}