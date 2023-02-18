import LessonItem from "./LessonItem";

const LessonsList = ({ lessons, getLessons }) => {

    return (
        <>
            {lessons.map((lesson, index) => (
                <LessonItem
                    lesson={lesson}
                    getLessons={getLessons}
                    key={index}
                />
            ))}
        </>
    );
}

export default LessonsList;