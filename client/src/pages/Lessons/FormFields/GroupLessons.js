import { useEffect } from "react";
import GroupItem from "./GroupItem";

const GroupLessons = ({
    formikProps,
    name = '',
    parentIndex = null
}) => {
    const {
        values,
        setFieldValue
    } = formikProps;

    return (
        <>
            {values.groups && values.groups.map((group, index) => (
                <GroupItem
                    current={group}
                    formikProps={formikProps}
                    index={index}
                    key={index}
                />
            ))}
        </>
    );
}

export default GroupLessons;