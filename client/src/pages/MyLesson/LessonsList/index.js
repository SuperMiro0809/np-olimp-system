import LessonItem from "./LessonItem";

const LessonsList = ({ lessons }) => {

    return (
        <>
            {lessons.map((lesson, index) => (
                <LessonItem
                    lesson={lesson}
                    key={index}
                />
            ))}
        </>
    );
}

export default LessonsList;