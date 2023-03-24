import styles from "./SessionCard.module.css";
import { useContext } from "react";
import { UserContext } from '../../context/userContext';


// convert time to format "hour:minutes AM/PM"
const formatTime = (time) => {
    try {
        let formattedTime = time.split(" ")[1];
        // remove leading zero
        if (formattedTime.charAt(0) === '0') {
            formattedTime = formattedTime.substring(1);
        }
        const hours = formattedTime.split(':')[0];
        if (hours > 12) {
            formattedTime = (hours - 12) + formattedTime.substring(2);
        }
        const amOrPm = hours >= 12 ? "PM" : "AM";
        return formattedTime + " " + amOrPm;
    } catch {
        return time;
    }
}

const getGroupsAhead = (studentId, groups) => {
    let groupCounter = 0;
    for (const group of groups) {
        for (const questionObj of group.studentQuestions) {
            if (studentId === (questionObj.studentId)) {
                return groupCounter;
            }
        }
        groupCounter++;
    }
}

const SessionCard = (props) => {
    const { _id, professorId, title, 
         school, description, location, 
        startTime, endTime, inSession, currentGroupIndex, groups, handleClick } = props; 
    console.log(props);
    const [user] = useContext(UserContext);
    const groupsAhead = getGroupsAhead(user, groups);
    const meetingDate = new Date(startTime);
    const displayDate = `${meetingDate.getMonth() + 1}/${meetingDate.getDate()}`;

    const displayStartTime = formatTime(startTime);
    const displayEndTime = formatTime(endTime); 

    return (
        <div className={styles.card}>
            <div className={styles.topSection}>
                <div className={styles.leftLabels}>
                    <p>{title}</p>
                    <p>{props.class}</p>
                    <p>{school}</p>
                </div>
                <div className={styles.rightLabels}>
                    <p>{inSession ? "Live" : displayDate}</p>
                    <p>{displayStartTime} - {displayEndTime}</p>
                </div>
            </div>
            <div className={styles.bottomSection}>
                <p>{description}</p>
                <p>{location}</p>
                <div className={styles.middleTextArea}>
                    <div className={styles.middle}>
                        <p>Groups ahead: {groupsAhead}</p>
                    </div>
                </div>
                <div className={styles.rightButton}>
                    <button onClick={() => handleClick(_id)}>My Topic</button>
                </div>
            </div>


        </div>
    )
}

export default SessionCard;