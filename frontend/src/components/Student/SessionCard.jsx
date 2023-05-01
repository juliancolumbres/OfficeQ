import styles from "./SessionCard.module.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from '../../context/userContext';

const SessionCard = (props) => {
    const {
        _id,
        // eslint-disable-next-line no-unused-vars
        professorId,
        title,
        // eslint-disable-next-line no-unused-vars
        school,
        description,
        location,
        startTime,
        endTime,
        inSession,
        currentGroupIndex,
        groups,
        professorName,
        handleClick
    } = props;

    const [userId] = useContext(UserContext);
    const displayDate = getDisplayDate(startTime);
    const displayStartTime = formatTime(startTime);
    const displayEndTime = formatTime(endTime); 

    const [updatedGroupIndex, setUpdatedGroupIndex] = useState(currentGroupIndex);
    const [updatedGroups, setUpdatedGroups] = useState(groups);
    const groupNumber = getGroupNumber(userId, updatedGroups);
    const groupsAhead = groupNumber - updatedGroupIndex;
    const [groupsAheadDisplayText, setGroupsAheadDisplayText] = useState(getGroupsAheadDisplayText(groupsAhead));
    console.log(updatedGroupIndex);
    console.log("Text: " + groupsAheadDisplayText);

    // listen to changes to session
    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:3001/session/${_id}/updates`);
        eventSource.onmessage = (e) => {
            const updatedSession = JSON.parse(e.data);

            // if either the groups or current group index is changed, update state
            if (updatedSession.currentGroupIndex !== updatedGroupIndex) {
                setUpdatedGroupIndex(updatedSession.currentGroupIndex);
            } 
            else if (JSON.stringify(updatedSession.groups) !== JSON.stringify(updatedGroups)) {
                setUpdatedGroups(updatedSession.groups);
            }         
        }
        return () => {
            eventSource.close();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setGroupsAheadDisplayText(getGroupsAheadDisplayText(groupsAhead))
    }, [updatedGroupIndex])

    return (
        <div className={styles.card}>
            <div className={styles.topSection}>
                <div className={styles.leftLabels}>
                    <p className={styles.bold}>{title}</p>
                    <p>{props.class}</p>
                    <p>{professorName}</p>
                </div>
                <div className={styles.rightLabels}>
                    {inSession ? <p className={styles.bold} style={{ color :'red'}}>Live</p> : <p>{displayDate}</p>}
                    <p className={styles.bold}>{displayStartTime} - {displayEndTime}</p>
                </div>
            </div>
            <div className={styles.bottomSection}>
                <p>{description}</p>
                <p>{location}</p>
                <div className={styles.bottomThird}>
                    <p className={styles.bold}>{groupsAheadDisplayText}</p>
                    <div className={styles.rightButton}>
                        <button onClick={() => handleClick(_id)}>{}{groupNumber === -1 ? "Enroll" : "My Topic"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const getGroupsAheadDisplayText = (groupsAhead) => {

    console.log("TEST:  " + groupsAhead);

    if (groupsAhead < 0) {
        return " ";
    }
    else if (groupsAhead === 0) {
        return "Its your turn!";
    }
    else if (groupsAhead === 1) {
        return "Up next!";
    }
    else {
        return "Groups ahead: " + groupsAhead;
    }
}

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

const getGroupNumber = (studentId, groups) => {
    let groupCounter = 0;
    for (const group of groups) {
        for (const questionObj of group.studentQuestions) {
            if (studentId === (questionObj.studentId)) {
                return groupCounter;
            }
        }
        groupCounter++;
    }
    return -1;
}

const getDisplayDate = (startTime) => {
    const meetingDate = new Date(startTime);
    const displayDate = `${meetingDate.getMonth() + 1}/${meetingDate.getDate()}`;
    return displayDate;
}


export default SessionCard;