import * as S from '@/styles/arena/arena.style';
import React, { useState, useEffect, useRef } from 'react';

const TimelineComponent = () => {
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

    function printInfo(info){
        console.log(info)
        console.log(timelineInfo.championNames)
    }

    useEffect(() => {

    }, [])

    return(
        <S.ArenaLayout>
            <div style={{display: 'flex', alignSelf: 'center', flexDirection: 'row', marginTop: "150px"}}>
                <div style={{float: 'left'}}>
                    {
                        timelineInfo.championNames.filter((name, idx) => idx>=0 && idx<5).map((name, index) => {
                            return(
                                <div key={index} style={{width: "100px", height: "100px", backgroundColor: "#c0dcfb", border: "2px solid #dfdfdf", borderRadius: "10px", display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                    <img src={"/image/champion/" + name + ".png"} style={{ width: 50, height: 50, marginTop: "10px", borderRadius: "10px"}}/>
                                    <div key={index} style={{display: 'flex', alignSelf: 'center'}}>{name}</div>
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
                                            key={index}
                                            style={{ left: info.x / 14870 * 512, top: 512 - info.y / 14980 * 512}}
                                            onClick={()=>printInfo(info)}
                                    ></S.DotLayout>

                                    {/* 킬 관련 정보가 점 위에 커서가 hover되면 보이게 할 예정 */}
                                    {/* <S.Container>
                                        {info.x}
                                        <div key={index} className="tooltip">{info.x}</div>
                                    </S.Container> */}
                                </div>

                            )
                        })
                    }
                </S.ImageContainer>
                <div style={{float: 'right'}}>
                    {
                        timelineInfo.championNames.filter((name, idx) => idx>=5 && idx<10).map((name, index) => {
                            return(
                                <div key={index} style={{width: "100px", height: "100px", backgroundColor: "#fbb5b5", border: "2px solid #dfdfdf", borderRadius: "10px", display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                    <img src={"/image/champion/" + name + ".png"} style={{ width: 50, height: 50, marginTop: "10px", borderRadius: "10px"}}/>
                                    <div key={index} style={{display: 'flex', alignSelf: 'center'}}>{name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        <S.ArenaContainer>
            <div className="review-box">
                <p className="title">&#127969; 투기장</p>
                <div className="review-body">
                    <S.ArenaBox>
                        <div className="profile-section">
                            <div className="profile">
                                <img src="/image/react.svg" alt="icons" className="icon" />
                                <img src="/image/rank-icons/master.png" alt="tier" className="tier" />
                                <p className="name">Meannnn</p>
                            </div>
                            <p className="time">2019-11-12 16:34</p>
                        </div>
                        <div className="content-section">
                            <p className="content">
                            착한 유저입니다!
                            </p>
                        </div>
                    </S.ArenaBox>
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