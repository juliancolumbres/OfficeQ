import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import GroupCard from "../../components/Professor/GroupCard.jsx";
import styles from "./SessionManagement.module.css";

const SessionManagement = (props) => {

    const { sessionId } = useParams();
    const [groups, setGroups] = useState([]);
    const [selectedIndexes, setSelectedIndexes] = useState(new Array(groups.length).fill(false));
    const [groupToggle, setGroupToggle] = useState(false);
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);


    const getGroups = async (sessionId) => {
        const response = await axios.get(`http://localhost:3001/session/${sessionId}/details`, {
        }).catch((error) => {
            if (error.response) {
            }
        })
        return response.data;
    }

    useEffect(() => {
        getGroups(sessionId)
            .then((fetchedSession) => {
                setGroups(fetchedSession.groups)
                setCurrentGroupIndex(fetchedSession.currentGroupIndex);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getMasterGroupIndex = (selectedIndexes) => {
        for (let index = 0; index < selectedIndexes.length; index++) {
            if (selectedIndexes[index] === true) {
                return index;
            }
        }
    }

    const getIndexesToRemove = (selectedIndexes, startingIndex) => {
        const indexes = [];
        for (let index = startingIndex + 1; index < selectedIndexes.length; index++) {
            if (selectedIndexes[index] === true) {
                indexes.push(index);
            }
        }
        return indexes;
    }

    const aggregateQuestions = (groups, indexes) => {
        const questions = [];
        for (const index of indexes) {
            const studentQuestions = groups[index].studentQuestions;
            for (const question of studentQuestions) {
                questions.push(question);
            }
        }
        return questions;
    }

    const getSelectedCount = (selectedIndexes) => {
        let count = 0;
        for (const indexValue of selectedIndexes) {
            if (indexValue === true) {
                count++;
            }
        }
        return count;
    }

    const handleCardSelectClick = (index) => {
        setSelectedIndexes((prevSelected) => {
          const updatedSelectedIndexes = [...prevSelected];
          updatedSelectedIndexes[index] = true;
          return updatedSelectedIndexes;
        });
      };

    const handleGroupClick = () => {
        setSelectedIndexes(new Array(groups.length).fill(false))
        setGroupToggle(!groupToggle);
    }

    const handleConfirmClick = () => {
        // get index of highest selected card
        const firstSelectedOccurence = getMasterGroupIndex(selectedIndexes);
        // store the rest of the selected card indexes
        const indexesToRemove = getIndexesToRemove(selectedIndexes, firstSelectedOccurence);
        const updatedGroups = [...groups];
        const indexesToMerge = [...indexesToRemove];
        // indexes to merge stores all selected indexes
        indexesToMerge.unshift(firstSelectedOccurence);
        // aggregate studentQuestions from all selected indexes
        const mergedStudentQuestions = aggregateQuestions(groups, indexesToMerge);
        // update studentQuestions of highest selected card
        updatedGroups[firstSelectedOccurence].studentQuestions = mergedStudentQuestions;
        let indexOffset = 0;
        // remove cards that were merged and not the highest selected card
        for (const index of indexesToRemove) {
            updatedGroups.splice(index - indexOffset, 1);
            indexOffset++; 
        }

        setSelectedIndexes(new Array(groups.length).fill(false))
        setGroupToggle(false);
        setGroups(updatedGroups);
    }

    const handleNextClick = () => {
        setCurrentGroupIndex(currentGroupIndex + 1);
    }

    return (
        <div>
            <span class = "logo">Office<span class="colored-letter">Q</span></span>
            <div className={styles.manageButtons}>
                <button>Start Meeting</button>
                <button>Cancel Meeting</button>
                <button onClick={handleGroupClick}>Merge Groups</button>
                <div className={styles.confirmButtons} hidden={!groupToggle}>
                    <button hidden={getSelectedCount(selectedIndexes) < 2}onClick={handleConfirmClick}>Confirm Merge</button>
                    <button onClick={handleGroupClick}>Cancel Merge</button>
                </div>
            </div>
            <br/>
            <div className={styles.cardsContainer}>
            {groups.map((group, index) => (
                        <div>
                            <button onClick={() => handleCardSelectClick(index)} disabled={!groupToggle || currentGroupIndex > index}> <GroupCard handleNextClick={handleNextClick} currentGroupIndex={currentGroupIndex} index={index} groupSize={groups.length} selected={selectedIndexes[index]} group={group}/></button>
                        </div>
                    )
                )
            }
            </div>
        </div>
    )
}


export default SessionManagement;