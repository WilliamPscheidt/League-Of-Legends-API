import React from 'react'
import SearchPlayer from '../../../functions/SearchPlayer'
import Configurations from '../../../configs/configs.json'
import Image from 'next/image'
import Head from 'next/head'

export async function getStaticPaths() {
    return {
        paths: [{
            params: {
                search: "Erid4nus",
                region: "BR1"
            }
        }],
        fallback: 'blocking'
    }
}

export async function getStaticProps(context) {
    const playerObject = new SearchPlayer("https://" + context.params.region + ".api.riotgames.com/", Configurations.API_KEY)

    const playerInformations = await (playerObject.getInitialInformations(context.params.search))
    const playerQueueInformations = await (playerObject.getQueueInformations(playerInformations.id))
    const playerMatchHistoryIds = await (playerObject.getMatchHistoryIds(playerInformations.puuid))
    const playerMatchInformations = await (playerObject.getMatchInfos(playerMatchHistoryIds))

    return {
        props: {
            playerInformations: playerInformations,
            playerQueueInformations: playerQueueInformations,
            playerMatchHistoryIds: playerMatchHistoryIds,
            playerMatchInfos: playerMatchInformations,
        },
        revalidate: 3600,
    }
}

const search = (props) => {
    function DataFilter(data) {
        return data.puuid === props.playerInformations.puuid
    }

    if (props.playerInformations && props.playerQueueInformations) {
        return (
            <div className='app_container'>
                <Head>
                    <title>PageInfos::Dev_Run - William</title>
                </Head>

                {
                    props.playerInformations.name
                        ?
                        <>
                            <div className='app_'>
                                <div className='left_app'>
                                    <div className='icon_div'>
                                        <img src={"/cdn/profileicon/" + props.playerInformations.profileIconId + ".png"} alt="Profile Icon" width={100} height={200} className="profile_icon" />
                                        <span className='profile_level'>{props.playerInformations.summonerLevel}</span>
                                    </div>
                                    <div className='card'>
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "IRON" && <img src="/cdn/ranked-emblems/Emblem_Iron.png" alt='Iron Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "SILVER" && <img src="/cdn/ranked-emblems/Emblem_Silver.png" alt='Silver Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "BRONZE" && <img src="/cdn/ranked-emblems/Emblem_Bronze.png" alt='Bronze Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "GOLD" && <img src="/cdn/ranked-emblems/Emblem_Gold.png" alt='Gold Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "PLATINUM" && <img src="/cdn/ranked-emblems/Emblem_Platinum.png" alt='Platinum Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "DIAMOND" && <img src="/cdn/ranked-emblems/Emblem_Diamond.png" alt='Diamond Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "MASTER" && <img src="/cdn/ranked-emblems/Emblem_Master.png" alt='Master Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "GRANDMASTER" && <img src="/cdn/ranked-emblems/Emblem_Grandmaster.png" alt='Grandmaster Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "CHALLENGER" && <img src="/cdn/ranked-emblems/Emblem_Challenger.png" alt='Iron Icon' width={120} height={120} className="profile_elo"/>}

                                        <div className='card_infos'>
                                            <span className='card_text'>{props.playerQueueInformations[1].queueType}</span>
                                            <span className='card_text'>{props.playerQueueInformations[1].leaguePoints}PDLs</span>
                                            <span className='card_text'>{((props.playerQueueInformations[1].wins/(props.playerQueueInformations[1].wins + props.playerQueueInformations[1].losses))*100).toFixed(2)}%</span>
                                        </div>
                                    </div>
                                    <div className='card'>
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "IRON" && <img src="/cdn/ranked-emblems/Emblem_Iron.png" alt='Iron Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "SILVER" && <img src="/cdn/ranked-emblems/Emblem_Silver.png" alt='Silver Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "BRONZE" && <img src="/cdn/ranked-emblems/Emblem_Bronze.png" alt='Bronze Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "GOLD" && <img src="/cdn/ranked-emblems/Emblem_Gold.png" alt='Gold Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "PLATINUM" && <img src="/cdn/ranked-emblems/Emblem_Platinum.png" alt='Platinum Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "DIAMOND" && <img src="/cdn/ranked-emblems/Emblem_Diamond.png" alt='Diamond Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "MASTER" && <img src="/cdn/ranked-emblems/Emblem_Master.png" alt='Master Icon' width={120} height={120} className="profile_elo"/>}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "GRANDMASTER" && <img src="/cdn/ranked-emblems/Emblem_Grandmaster.png" alt='Grandmaster Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "CHALLENGER" && <img src="/cdn/ranked-emblems/Emblem_Challenger.png" alt='Iron Icon' width={120} height={120} className="profile_elo" />}

                                        <div className='card_infos'>
                                            <span className='card_text'>{props.playerQueueInformations[0].queueType}</span>
                                            <span className='card_text'>{props.playerQueueInformations[0].leaguePoints}PDLs</span>
                                            <span className='card_text'>{((props.playerQueueInformations[0].wins/(props.playerQueueInformations[0].wins + props.playerQueueInformations[0].losses))*100).toFixed(2)}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='right_app'>
                                    {
                                        props.playerMatchInfos.map((i) => {
                                            console.log("Partida: ------------")
                                            console.log(i.info.participants.filter(DataFilter))
                                            return [
                                                <div key={i} className='match_history'>
                                                    {
                                                        i.info.gameCreation
                                                            ?
                                                            <ul>
                                                                <h1>{i.info.gameCreation}</h1>
                                                                <h1>{i.info.mapId == 11 ? "Summoner's Rift" : "ARAM"}</h1>
                                                                {i.info.participants.map((player) => {
                                                                    return [
                                                                        <ul key={player}>
                                                                            <li><Image src={"/cdn/champion/" + player.championName + ".png"} width={50} height={50} alt="Champion Image" /></li>
                                                                            <ul>
                                                                                {player.item0 > 0 && <li><Image src={"/cdn/item/" + player.item0 + ".png"} alt="Player Item 1" width={50} height={50} /></li>}
                                                                                {player.item1 > 0 && <li><Image src={"/cdn/item/" + player.item1 + ".png"} alt="Player Item 2" width={50} height={50} /></li>}
                                                                                {player.item2 > 0 && <li><Image src={"/cdn/item/" + player.item2 + ".png"} alt="Player Item 3" width={50} height={50} /></li>}
                                                                                {player.item3 > 0 && <li><Image src={"/cdn/item/" + player.item3 + ".png"} alt="Player Item 4" width={50} height={50} /></li>}
                                                                                {player.item4 > 0 && <li><Image src={"/cdn/item/" + player.item4 + ".png"} alt="Player Item 5" width={50} height={50} /></li>}
                                                                                {player.item5 > 0 && <li><Image src={"/cdn/item/" + player.item5 + ".png"} alt="Player Item 6" width={50} height={50} /></li>}
                                                                            </ul>
                                                                        </ul>
                                                                    ]
                                                                })}
                                                            </ul>
                                                        :
                                                        "Sem dados"
                                                    }
                                                </div>
                                            ]
                                        })
                                    }
                                </div>
                            </div>
                        </>
                        :
                        "Jogador Não encontrado"
                }
            </div>
        )
    } else {
        return (
            <div>
                <Head>
                    <title>PageInfos::Error - William</title>
                </Head>
                <div>
                    <h1>Dados não encontrados</h1>
                </div>
            </div>
        )
    }
}

export default search