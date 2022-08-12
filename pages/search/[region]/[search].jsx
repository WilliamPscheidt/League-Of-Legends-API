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
        fallback: 'blocking',
        revalidate: 3600
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
    }
}

const search = (props) => {

    console.log(props.playerMatchInformations)

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
                                    <div>
                                        <h1>Icon</h1>
                                        <Image src={"/cdn/profileicon/" + props.playerInformations.profileIconId + ".png"} alt="Profile Icon" width={200} height={200} />
                                        <h1>PlayerInformations</h1>
                                    </div>
                                    <div>
                                        <h1>ELO</h1>
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "IRON" && <Image src="/cdn/ranked-emblems/Emblem_Iron.png" alt='Iron Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "SILVER" && <Image src="/cdn/ranked-emblems/Emblem_Silver.png" alt='Silver Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "BRONZE" && <Image src="/cdn/ranked-emblems/Emblem_Bronze.png" alt='Bronze Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "GOLD" && <Image src="/cdn/ranked-emblems/Emblem_Gold.png" alt='Gold Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "PLATINUM" && <Image src="/cdn/ranked-emblems/Emblem_Platinum.png" alt='Platinum Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "DIAMOND" && <Image src="/cdn/ranked-emblems/Emblem_Diamond.png" alt='Diamond Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "MASTER" && <Image src="/cdn/ranked-emblems/Emblem_Master.png" alt='Master Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "GRANDMASTER" && <Image src="/cdn/ranked-emblems/Emblem_Grandmaster.png" alt='Grandmaster Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "CHALLENGER" && <Image src="/cdn/ranked-emblems/Emblem_Challenger.png" alt='Iron Icon' width={200} height={200} />}

                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "IRON" && <Image src="/cdn/ranked-emblems/Emblem_Iron.png" alt='Iron Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "SILVER" && <Image src="/cdn/ranked-emblems/Emblem_Silver.png" alt='Silver Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "BRONZE" && <Image src="/cdn/ranked-emblems/Emblem_Bronze.png" alt='Bronze Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "GOLD" && <Image src="/cdn/ranked-emblems/Emblem_Gold.png" alt='Gold Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "PLATINUM" && <Image src="/cdn/ranked-emblems/Emblem_Platinum.png" alt='Platinum Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "DIAMOND" && <Image src="/cdn/ranked-emblems/Emblem_Diamond.png" alt='Diamond Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "MASTER" && <Image src="/cdn/ranked-emblems/Emblem_Master.png" alt='Master Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "GRANDMASTER" && <Image src="/cdn/ranked-emblems/Emblem_Grandmaster.png" alt='Grandmaster Icon' width={200} height={200} />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "CHALLENGER" && <Image src="/cdn/ranked-emblems/Emblem_Challenger.png" alt='Iron Icon' width={200} height={200} />}
                                    </div>

                                    <div> {props.playerInformations.accountId}</div>
                                    <div> {props.playerInformations.id}</div>
                                    <div> {props.playerInformations.name}</div>
                                    <div> {props.playerInformations.profileIconId}</div>
                                    <div> {props.playerInformations.puuid}</div>
                                    <div> {props.playerInformations.revisionDate}</div>
                                    <div> {props.playerInformations.summonerLevel}</div>

                                    <h1>Ranked</h1>
                                    <div>{props.playerQueueInformations[0].queueType}</div>
                                    <div>{props.playerQueueInformations[0].leaguePoints}</div>
                                    <div>{props.playerQueueInformations[0].losses}</div>
                                    <div>{props.playerQueueInformations[0].wins}</div>
                                    <div>{props.playerQueueInformations[0].tier}</div>
                                    <div>{props.playerQueueInformations[0].rank}</div>
                                </div>

                                <div className='right_app'>
                                    {
                                        props.playerMatchInfos.map((i) => {
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
                                                                            <li>Nick {player.summonerName}</li>
                                                                            <li>KDA {player.kills}/{player.deaths}/{player.assists}</li>
                                                                            <li>Champion level {player.champLevel}</li>
                                                                            <li>Farm {player.totalMinionsKilled}</li>
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
                <h1>Dados não e</h1>
            </div>
        )
    }
}

export default search