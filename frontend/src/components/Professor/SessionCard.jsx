import styles from "./SessionCard.module.css";

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


const SessionCard = (props) => {

    const { sessionId, professorId, professorName, title, 
         school, description, location, 
        startTime, endTime, inSession } = props; 

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
                    <p>{professorName}</p>
                </div>
                <div className={styles.rightLabels}>
                    <p>{inSession ? "Live" : displayDate}</p>
                    <p>{displayStartTime} - {displayEndTime}</p>
                </div>
            </div>
            <div className={styles.bottomSection}>
                <p>{description}</p>
                <p>{location}</p>
                <div className={styles.centerButton}>
                    <button>Manage</button>
                </div>
            </div>


        </div>
    )
}

export default SessionCard;