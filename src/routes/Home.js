import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot, doc, query, orderBy } from "firebase/firestore";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // 로딩 될 때마다 getNweets함수로 새로운 글 업데이트 
    useEffect(() => {
        const q = query(collection(dbService, "nweets"), orderBy("createdAt"));
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }, []);
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                text:nweet,
                createdAt:Date.now(),
                creatorId: userObj.uid,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch(error) {
            console.log("Error adding document: ", error);
        }
        setNweet("");
    };
    const onChange = (event) => {
        const { 
            target: {value},
        } = event;
        setNweet(value);
    }
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
        }
        reader.readAsDataURL(theFile);
    }
    return (
        <>
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input onChange={onFileChange} type="file" accept="image/*" />
                <input type="submit" value="Nweet" />
            </form>
        </div>
        <div>
            {nweets.map((nweet) =>(
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
            ))}
        </div>
        </>
    );
};
export default Home