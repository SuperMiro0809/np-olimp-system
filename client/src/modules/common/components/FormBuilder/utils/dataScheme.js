export default function dataScheme(fields) {
    let scheme = {};

    fields.forEach((field, index) => {
        const name = field.name;

        if (field.type === 'array') {
            scheme[name] = [{}];

            field.fields.forEach((f) => {
                scheme[name][0][f.name] = '';
            })
        } else if (Object.hasOwn(field, 'fields')) {
            scheme[name] = {};

            field.fields.forEach((f) => {
                scheme[name][f.name] = '';
            });
        } else {
            scheme[name] = '';
        }
    })

    return scheme;
}