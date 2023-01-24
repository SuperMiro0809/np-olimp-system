export default function dataScheme(element) {
    let scheme = {};

    Object.keys(element[0]).forEach((key) => {
        if (Array.isArray(element[0][key])) {
            scheme[key] = [{}];

            Object.keys(element[0][key][0]).map((k) => {
                scheme[key][0][k] = '';
            })

        } else {
            scheme[key] = '';
        }
    });

    return scheme;
}