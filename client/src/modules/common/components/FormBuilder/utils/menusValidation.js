export default function menusValidation(menus, fields, touched, errors, oldMenusValidation) {
    const newMenuValidation = [...oldMenusValidation];

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        const menuFields = fields[menu.id];

        if (Array.isArray(menuFields)) {
            for (let j = 0; j < menuFields.length; j++) {
                const fieldName = menuFields[j].name;

                const isTouched = touched.hasOwnProperty(fieldName);
                const isError = errors.hasOwnProperty(fieldName);

                if (isTouched && isError) {
                    newMenuValidation[i] = 'text.error';
                    break;
                } else if (isTouched && !isError) {
                    newMenuValidation[i] = 'text.success';
                } else {
                    newMenuValidation[i] = '';
                }
            }
        } else {
            const isTouched = touched.hasOwnProperty(menu.id);
            const isError = errors.hasOwnProperty(menu.id);

            if (isTouched && isError) {
                newMenuValidation[i] = 'text.error';
                break;
            } else if (isTouched && !isError) {
                newMenuValidation[i] = 'text.success';
            } else {
                newMenuValidation[i] = '';
            }
        }
    }

    return newMenuValidation
}