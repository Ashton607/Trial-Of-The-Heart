import React, { useRef, useState, useEffect } from "react";
import "./Quiz.css";
import {data} from "../../assets/data"
import song from '../../assets/Y&B.mp3'

const Quiz = () => {

    let [index,setIndex] = useState(0);
    let [question,setQuestion] = useState(data[index]);
    let [lock,setLock] = useState(false);
    let [score,setScore] = useState(0);
    let [result,setResult] = useState(false);
    let [showLoveLetter,setShowLoveLetter] = useState(false);
    let [showQuestion,setShowQuestion] = useState(false);
    let [showFlower,setShowFlower] = useState(false);
    let [showMoon,setShowMoon] = useState(false);

    let Option1 = useRef(null)
    let Option2 = useRef(null)
    let Option3 = useRef(null)
    let Option4 = useRef(null)

    let option_array = [Option1, Option2, Option3, Option4];

    // Audio setup
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Initialize audio
    useEffect(() => {
        audioRef.current = new Audio(song);
        audioRef.current.loop = true; // Make the song loop
        
        // Cleanup function to pause audio when component unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Control audio when love letter is shown
    useEffect(() => {
        if (showLoveLetter) {
            // Play the song when love letter appears
            audioRef.current.play().catch(error => {
                console.log("Audio playback failed:", error);
                // Many browsers require user interaction first
                // We'll handle this with a user interaction fallback
            });
            setIsPlaying(true);
        } else {
            // Pause the song when love letter is hidden
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0; // Reset to beginning
            }
            setIsPlaying(false);
        }
    }, [showLoveLetter]);

    const checkAns = (e,ans) =>{
          if(lock === false){
            if(question.ans === ans){
            e.target.classList.add("correct");
            setLock(true);
            setScore(prev=>prev+1);
        }else{
            e.target.classList.add("wrong")
            setLock(true);
            option_array[question.ans-1].current.classList.add("correct");
        }

        }

      
    }

    const next = ()=>{

        if(lock===true){
            if(index === data.length - 1){
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            });
        }

    }

    const reset = ()=>{
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(false)
        setResult(false)
        setShowLoveLetter(false)
        // Stop audio if playing
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }

    const showLetter = ()=>{
        setShowLoveLetter(true);
    }

    const Question = ()=>{
        setShowQuestion(true);
        // Stop audio when moving to next section
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }

    const Flowers = ()=>{
        setShowFlower(true);
        // Stop audio when moving to flower section
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }

    const Moon = ()=>{
        setShowMoon(true);
        // Stop audio when moving to moon section
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }

    // Function to manually toggle audio (optional - can be used for a music control button)
    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="container">
           
            
            <h1>A Trial of the Heart</h1>
            <hr/>
            {result?<></>:<><h2>{index+1}. {question.question}</h2>
            <ul>
                <li ref={Option1} onClick = {(e)=>{checkAns(e,1)}} >{question.option1}</li>
                <li ref={Option2} onClick = {(e)=>{checkAns(e,2)}} >{question.option2}</li>
                <li ref={Option3} onClick = {(e)=>{checkAns(e,3)}} >{question.option3}</li>
                <li ref={Option4} onClick = {(e)=>{checkAns(e,4)}} >{question.option4}</li>
            </ul>
            <button onClick={next}>Thereafter</button>
            <div className="index">{index + 1} of {data.length} questions</div></>}
            
            {result && !showLoveLetter?<>
                <h2>Thus is revealed the depth of thy affection <br />{score} out of {data.length}</h2>
                {score < 7 ? (
                    <button onClick={reset}>Begin Anew</button>
                ) : (
                    <button onClick={showLetter}>Thereafter</button>
                )}
            </>:<></>}

            {showLoveLetter && !showQuestion?<>
                <h2>A Letter of Devotion</h2>
                <div className="love-letter">
                    <p>My Dearest Beloved,</p>
                    <p>
                        With {score} questions answered true, thy heart hath proven its devotion most pure. 
                        The stars themselves pale in comparison to the knowledge thou holdest of my very soul.
                    </p>
                    <p>
                        In this mortal realm, 'tis rare to find one who knoweth the whispers of one's heart, 
                        the dreams that dance in slumber, and the fears that stir in darkness. Yet thou, 
                        my cherished one, hast demonstrated a bond that transcendeth mere earthly connection.
                    </p>
                    <p>
                        Let this letter serve as testament to our entwined destinies, for thou art the keeper 
                        of my deepest secrets and the guardian of my truest self.
                    </p>
                    <p>Forever and always,<br/>Prince Ashton</p>
                </div>
                <button onClick={Question}>Thereafter</button>
            </>:<></>}

            {showQuestion && !showFlower && !showMoon?<>
                <div className="question">
                <p>Not only was this a trial of the heart, but it was also a way for me to share a glimpse of my love language, my passions, the roots of my creativity, and even a hint of the romance I hope to build in the future.</p>
                <p>Anyway now that this is all revealed,and even after journeying through this little trial, do you still wish to be my Valentine?</p>
                </div>
                <div className="Qbtn">
                <button onClick={Flowers}>Yes🌺</button>
                <h3>OR</h3>
                <button onClick={Moon}>Yes🌙</button>
                </div>
            </>:<></>}

            {showFlower?<>
                 <div className="flower-bouquet">
                    <div className="bouquet-container">
                        <div className="flowers">
                            {/* Rose 1 */}
                            <div className="flower rose">
                                <div className="petal p1"></div>
                                <div className="petal p2"></div>
                                <div className="petal p3"></div>
                                <div className="petal p4"></div>
                                <div className="petal p5"></div>
                                <div className="petal p6"></div>
                                <div className="center"></div>
                                <div className="stem"></div>
                                <div className="leaf l1"></div>
                                <div className="leaf l2"></div>
                            </div>
                            
                            {/* Rose 2 */}
                            <div className="flower rose rose2">
                                <div className="petal p1"></div>
                                <div className="petal p2"></div>
                                <div className="petal p3"></div>
                                <div className="petal p4"></div>
                                <div className="petal p5"></div>
                                <div className="petal p6"></div>
                                <div className="center"></div>
                                <div className="stem"></div>
                                <div className="leaf l1"></div>
                                <div className="leaf l2"></div>
                            </div>
                            
                            {/* Tulip 1 */}
                            <div className="flower tulip">
                                <div className="tulip-petal tp1"></div>
                                <div className="tulip-petal tp2"></div>
                                <div className="tulip-petal tp3"></div>
                                <div className="tulip-center"></div>
                                <div className="stem"></div>
                                <div className="leaf l1"></div>
                            </div>
                            
                            {/* Daisy 1 */}
                            <div className="flower daisy">
                                <div className="daisy-petal dp1"></div>
                                <div className="daisy-petal dp2"></div>
                                <div className="daisy-petal dp3"></div>
                                <div className="daisy-petal dp4"></div>
                                <div className="daisy-petal dp5"></div>
                                <div className="daisy-petal dp6"></div>
                                <div className="daisy-petal dp7"></div>
                                <div className="daisy-petal dp8"></div>
                                <div className="daisy-center"></div>
                                <div className="stem"></div>
                                <div className="leaf l1"></div>
                                <div className="leaf l2"></div>
                            </div>
                            
                            {/* Lily 1 */}
                            <div className="flower lily">
                                <div className="lily-petal lp1"></div>
                                <div className="lily-petal lp2"></div>
                                <div className="lily-petal lp3"></div>
                                <div className="lily-petal lp4"></div>
                                <div className="lily-petal lp5"></div>
                                <div className="lily-center"></div>
                                <div className="stem"></div>
                                <div className="leaf l1"></div>
                            </div>
                            
                            {/* Rose 3 - Smaller accent flower */}
                            <div className="flower rose rose3">
                                <div className="petal p1"></div>
                                <div className="petal p2"></div>
                                <div className="petal p3"></div>
                                <div className="petal p4"></div>
                                <div className="center"></div>
                                <div className="stem"></div>
                            </div>
                            
                            {/* Blue flower */}
                            <div className="flower blue-flower">
                                <div className="blue-petal bp1"></div>
                                <div className="blue-petal bp2"></div>
                                <div className="blue-petal bp3"></div>
                                <div className="blue-petal bp4"></div>
                                <div className="blue-petal bp5"></div>
                                <div className="blue-center"></div>
                                <div className="stem"></div>
                                <div className="leaf l1"></div>
                            </div>
                        </div>
                        
                        {/* Bouquet wrap and ribbon */}
                        <div className="bouquet-wrap"></div>
                        <div className="ribbon">
                            <div className="ribbon-left"></div>
                            <div className="ribbon-right"></div>
                            <div className="ribbon-center"></div>
                            <div className="ribbon-tail left-tail"></div>
                            <div className="ribbon-tail right-tail"></div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="floating-heart">❤️</div>
                        <div className="floating-heart heart2">❤️</div>
                        <div className="floating-heart heart3">❤️</div>
                        
                        {/* Message with the bouquet */}
                        <div className="bouquet-message">
                            <p>My heart overflows with gratitude and delight, for the Princess is mine this Valentine’s season</p>
                            <p className="small-text">With love, always ❤️</p>
                        </div>
                    </div>
                </div>
            </>:<></>}

            {showMoon?<>
                 <div className="moon-container">
                    <div className="moon-large">
                        <div className="crater crater1"></div>
                        <div className="crater crater2"></div>
                        <div className="crater crater3"></div>
                        <div className="crater crater4"></div>
                        <div className="moon-shadow"></div>
                    </div>
                    <div className="moon-message">
                        <p>I count myself most fortunate that Her Highness doth honour me as her Valentine.</p>
                        <p className="small-text">My love for you is eternal, Your Grace 🌙</p>
                    </div>
                    <div className="stars">
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                    </div>
                </div>
            </>:<></>
            }

            <div className="moon"></div>
           
            
        </div>
    );
};

export default Quiz;