import * as S from '@/styles/arena/arena.style';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { common, auth } from '../../services/api.js';

const TimelineComponent = () => {
    const [isDotHovered, setIsDotHovered] = useState([false, false, false, false, false, false, false, false, false, false, false]);
    let summonerNameChampionNameMap = new Map();
    const matchId = useParams();

    const [reviews, setReviews] = useState([
        {
            id: 3,
            createdAt: "2023.10.10",
            summonerName: "summonerName3",
            matchId: "KR_0000000000",
            content: "content3"
        },
        {
            id: 2,
            createdAt: "2023.10.10",
            summonerName: "summonerName2",
            matchId: "KR_0000000000",
            content: "content2"
        },
        {
            id: 1,
            createdAt: "2023.10.10",
            summonerName: "summonerName1",
            matchId: "KR_0000000000",
            content: "content1"
        }
    ]);
    const [timelineInfo, setTimelineInfo] = useState({
        matchId: "KR_6725750646",
        championNames: [
            "Pantheon",
            "Karthus",
            "Jayce",
            "Draven",
            "Thresh",
            "Gwen",
            "Belveth",
            "Tristana",
            "Jhin",
            "FiddleSticks"
        ],
        summonerNames: [
            "name1",
            "name2",
            "name3",
            "name4",
            "name5",
            "name6",
            "name7",
            "name8",
            "name9",
            "name10"
        ],
        timelines: [
            {
                minute: 2,
                second: 35,
                killerId: 4,
                killedId: 9,
                x: 13170,
                y: 3876
            },
            {
                minute: 2,
                second: 40,
                killerId: 7,
                killedId: 2,
                x: 6684,
                y: 4437
            },
            {
                "minute": 3,
                "second": 55,
                "killerId": 7,
                "killedId": 5,
                "x": 8057,
                "y": 5813
            },
            {
                "minute": 4,
                "second": 7,
                "killerId": 7,
                "killedId": 3,
                "x": 6267,
                "y": 6256
            },
            {
                "minute": 4,
                "second": 9,
                "killerId": 3,
                "killedId": 7,
                "x": 6954,
                "y": 6351
            },
            {
                "minute": 5,
                "second": 4,
                "killerId": 8,
                "killedId": 3,
                "x": 5693,
                "y": 6494
            },
            {
                "minute": 5,
                "second": 7,
                "killerId": 3,
                "killedId": 8,
                "x": 6913,
                "y": 6948
            },
            {
                "minute": 7,
                "second": 39,
                "killerId": 5,
                "killedId": 8,
                "x": 8601,
                "y": 7637
            },
            {
                "minute": 8,
                "second": 10,
                "killerId": 4,
                "killedId": 9,
                "x": 13347,
                "y": 3893
            },
            {
                "minute": 8,
                "second": 22,
                "killerId": 4,
                "killedId": 10,
                "x": 12346,
                "y": 3281
            },
            {
                "minute": 8,
                "second": 28,
                "killerId": 5,
                "killedId": 7,
                "x": 13214,
                "y": 3238
            }
        ]
    });
    const mapRef = useRef(null);

    // function printInfo(info){
    //     console.log(info)
    //     console.log(timelineInfo.championNames)
    // }

    useEffect(async () => {
        // timeline axios response
        // let timelineResponse = {
        //     matchId: "KR_6725750646",
        //     championNames: [
        //         "Pantheon",
        //         "Karthus",
        //         "Jayce",
        //         "Draven",
        //         "Thresh",
        //         "Gwen",
        //         "Belveth",
        //         "Tristana",
        //         "Jhin",
        //         "FiddleSticks"
        //     ],
        //     summonerNames: [
        //         "name1",
        //         "name2",
        //         "name3",
        //         "name4",
        //         "name5",
        //         "name6",
        //         "name7",
        //         "name8",
        //         "name9",
        //         "name10"
        //     ],
        //     timelines: [
        //         {
        //             minute: 2,
        //             second: 35,
        //             killerId: 4,
        //             killedId: 9,
        //             x: 13170,
        //             y: 3876
        //         },
        //         {
        //             minute: 2,
        //             second: 40,
        //             killerId: 7,
        //             killedId: 2,
        //             x: 6684,
        //             y: 4437
        //         },
        //         {
        //             "minute": 3,
        //             "second": 55,
        //             "killerId": 7,
        //             "killedId": 5,
        //             "x": 8057,
        //             "y": 5813
        //         },
        //         {
        //             "minute": 4,
        //             "second": 7,
        //             "killerId": 7,
        //             "killedId": 3,
        //             "x": 6267,
        //             "y": 6256
        //         },
        //         {
        //             "minute": 4,
        //             "second": 9,
        //             "killerId": 3,
        //             "killedId": 7,
        //             "x": 6954,
        //             "y": 6351
        //         },
        //         {
        //             "minute": 5,
        //             "second": 4,
        //             "killerId": 8,
        //             "killedId": 3,
        //             "x": 5693,
        //             "y": 6494
        //         },
        //         {
        //             "minute": 5,
        //             "second": 7,
        //             "killerId": 3,
        //             "killedId": 8,
        //             "x": 6913,
        //             "y": 6948
        //         },
        //         {
        //             "minute": 7,
        //             "second": 39,
        //             "killerId": 5,
        //             "killedId": 8,
        //             "x": 8601,
        //             "y": 7637
        //         },
        //         {
        //             "minute": 8,
        //             "second": 10,
        //             "killerId": 4,
        //             "killedId": 9,
        //             "x": 13347,
        //             "y": 3893
        //         },
        //         {
        //             "minute": 8,
        //             "second": 22,
        //             "killerId": 4,
        //             "killedId": 10,
        //             "x": 12346,
        //             "y": 3281
        //         },
        //         {
        //             "minute": 8,
        //             "second": 28,
        //             "killerId": 5,
        //             "killedId": 7,
        //             "x": 13214,
        //             "y": 3238
        //         }
        //     ]
        // }
        const timelineResponse = await common.get('/riot/timeline/' + matchId)

        // setTimelineInfo
        setTimelineInfo(timelineResponse)

        // review axios response
        const reviewResponse = await common.get('/review/' + matchId + "/" + 1)
        // let reviewResponse = [
        //     {
        //         id: 3,
        //         createdAt: "2023.10.10",
        //         summonerName: "name3",
        //         matchId: "KR_0000000000",
        //         content: "content3"
        //     },
        //     {
        //         id: 2,
        //         createdAt: "2023.10.10",
        //         summonerName: "name2",
        //         matchId: "KR_0000000000",
        //         content: "content2"
        //     },
        //     {
        //         id: 1,
        //         createdAt: "2023.10.10",
        //         summonerName: "name1",
        //         matchId: "KR_0000000000",
        //         content: "content1"
        //     }
        // ]
        
        // setReviews
        setReviews(reviewResponse)

        // map summonerName to championName
        for(let i = 0; i<10; i++){
            summonerNameChampionNameMap.set(timelineResponse.summonerNames[i], timelineResponse.championNames[i])
        }
    }, [])

    let changeDotHoverFlag = (idx) => {
        console.log("idx: " + idx)
        console.log("changeDotHoverFlag function active!!")

        let prefix = isDotHovered.slice(0, idx)
        console.log("prefix")
        console.log(prefix)

        let changeElement = [isDotHovered[idx] ? false : true]
        console.log("changeElement")
        console.log(changeElement)
        
        let suffix = isDotHovered.slice(idx + 1, isDotHovered.length)
        console.log("suffix")
        console.log(suffix)

        let newIsDotHovered = prefix.concat(changeElement).concat(suffix)
        console.log("newIsDotHovered")
        console.log(newIsDotHovered)

        setIsDotHovered(newIsDotHovered)
    }
    console.log()

    return(
        <S.ArenaLayout>
            <div style={{display: 'flex', alignSelf: 'center', flexDirection: 'row', marginTop: "150px"}}>
                <div style={{float: 'left'}}>
                    {
                        timelineInfo.summonerNames.filter((name, idx) => idx>=0 && idx<5).map((name, index) => {
                            return(
                                <div key={index} style={{width: "100px", height: "100px", backgroundColor: "#c0dcfb", border: "2px solid #dfdfdf", borderRadius: "10px", display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                    <img src={"/image/champion/" + timelineInfo.championNames[index] + ".png"} style={{ width: 50, height: 50, marginTop: "10px", borderRadius: "10px"}}/>
                                    <div key={index} style={{display: 'flex', alignSelf: 'center'}}><b>{name}</b></div>
                                </div>
                            )
                        })
                    }
                </div>

                <S.ImageContainer>
                    <S.ImageLayout src="/image/map/lol_map.png" />
                    {
                        timelineInfo.timelines.map((info, index) => {
                            return(
                                <div key={index}>
                                    <S.DotLayout
                                            style={{ left: info.x / 14870 * 512, top: 512 - info.y / 14980 * 512}}
                                            onClick={()=>changeDotHoverFlag(index)}
                                            // onMouseOver={()=>changeDotHoverFlag(index)}
                                            // onMouseOut={()=>changeDotHoverFlag(index)}
                                            // onClick={()=>printInfo(info)}
                                    ></S.DotLayout>

                                    {/* 킬 관련 정보가 점 위에 커서가 hover되면 보임 */}
                                    {
                                        isDotHovered[index] && 
                                        <S.Container style={{ left: info.x / 14870 * 512 + 1, top: 512 - info.y / 14980 * 512 + 1}}>
                                            <img src={"/image/champion/" + timelineInfo.championNames[info.killerId-1] + ".png"} style={{width: "30px", height: "30px"}}></img>
                                            &nbsp;
                                            <img src="/image/kill.jpg" style={{width: "30px", height: "30px"}}></img>
                                            &nbsp;
                                            <img src={"/image/champion/" + timelineInfo.championNames[info.killedId-1] + ".png"} style={{width: "30px", height: "30px"}}></img>
                                        </S.Container>
                                    }
                                </div>

                            )
                        })
                    }
                </S.ImageContainer>

                <div style={{float: 'right'}}>
                    {
                        timelineInfo.summonerNames.filter((name, idx) => idx>=5 && idx<10).map((name, index) => {
                            return(
                                <div key={index} style={{width: "100px", height: "100px", backgroundColor: "#fbb5b5", border: "2px solid #dfdfdf", borderRadius: "10px", display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                    <img src={"/image/champion/" + timelineInfo.championNames[index+5] + ".png"} style={{ width: 50, height: 50, marginTop: "10px", borderRadius: "10px"}}/>
                                    <div key={index} style={{display: 'flex', alignSelf: 'center'}}><b>{name}</b></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        <S.ArenaContainer>
            <div className="review-box">
                <p className="title"><img src="/image/arena.webp" width="40px" height="40px"/>투기장</p>
                <div className="review-body">
                    {
                        reviews.map((review, index) => {
                            return(
                                <S.ArenaBox>
                                    <div className="profile-section">
                                        <div className="profile">
                                            {/* 실제 데이터 받아오면 아래 주석 해제 */}
                                            <img src={"/image/champion/" + timelineInfo.championNames[timelineInfo.summonerNames.indexOf(review.summonerName)] + ".png"} alt="icons" className="icon" />
                                            <img src="/image/rank-icons/master.png" alt="tier" className="tier" />
                                            <p className="name">{review.summonerName}</p>
                                        </div>
                                        <p className="time">{review.createdAt}</p>
                                    </div>
                                    <div className="content-section">
                                        <p className="content" id={review.id}>
                                            {review.content}
                                        </p>
                                    </div>
                                </S.ArenaBox>
                            )
                        })
                    }
                </div>
            </div>
            <div className="search-input">
                <input placeholder="" />
                <img src="/image/send.png" />
            </div>
        </S.ArenaContainer>
    </S.ArenaLayout>
    )
}

export default TimelineComponent;