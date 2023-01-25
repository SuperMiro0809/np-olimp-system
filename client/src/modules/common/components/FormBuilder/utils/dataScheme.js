export default function dataScheme(fields) {
    let scheme = {};

    fields.forEach((field, index) => {
        const name = field.name;

        if(field.type === 'array') {
            scheme[name] = [{}];

            field.fields.forEach((f) => {
                scheme[name][0][f.name] = '';
            })
        }else {
            scheme[name] = '';
        }
    })
    // Object.keys(element[0]).forEach((key) => {
    //     if (Array.isArray(element[0][key])) {
    //         scheme[key] = [{}];

    //         Object.keys(element[0][key][0]).map((k) => {
    //             scheme[key][0][k] = '';
    //         })

    //     } else {
    //         scheme[key] = '';
    //     }
    // });

    return scheme;
}