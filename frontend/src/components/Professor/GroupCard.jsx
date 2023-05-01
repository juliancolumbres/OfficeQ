import styles from "./GroupCard.module.css";

const GroupCard = (props) => {
    const currentGroupIndex = props.currentGroupIndex;
    const handleNextClick = props.handleNextClick;
    const selected = props.selected;
    const index = props.index;
    const groupSize = props.groupSize;
    const group = props.group;
    const studentQuestions = group.studentQuestions;
    console.log(currentGroupIndex);
    
    return (
        <div className={styles.card + (selected ? (" " + styles.selected) : "")}>
            <div className={styles.topSection}>
                <p style={{fontStyle: "italic", fontWeight: 'bold'}}>{(currentGroupIndex > index) ? ("FINISHED") : ((currentGroupIndex === index) ? "CURRENT GROUP" : "UPCOMING GROUP")}</p>
                <p style={{fontWeight: 'bold'}}> Topic: {index + 1} of {groupSize}: {group.topic}</p>
            </div>
            <div className={styles.bottomSection}>
                {studentQuestions.map((studentQuestion, index) => (
                    <p>{studentQuestion.name}: {studentQuestion.question}</p>
                )
                )}
                <div className={styles.buttonSection}>
                    {(currentGroupIndex === index) ? (<button className={styles.nextButton} onClick={handleNextClick}>Next Group</button>) : ""}
                </div>
            </div>
        </div>
    )
}

export default GroupCard;