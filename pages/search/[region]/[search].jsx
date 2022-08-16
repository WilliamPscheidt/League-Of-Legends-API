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

    function TeamBlueFilter(data) {
        return data.teamId == "100"
    }

    function TeamRedFilter(data) {
        return data.teamId == "200"
    }

    function SpellFilter(data, number) {
        let DataFilter;

        switch (number) {
            case 1:
                DataFilter = data.summoner1Id
                break;
            case 2:
                DataFilter = data.summoner2Id
                break;
        
            default:
                break;
        }

        switch (DataFilter) {
            case 21:
                return <img src="/cdn/spells/Barrier.webp" className='speel'/>
            case 1:
                return <img src="/cdn/spells/Cleanse.webp" className='speel'/>
            case 14:
                return <img src="/cdn/spells/Ignite.webp" className='speel'/>
            case 3:
                return <img src="/cdn/spells/Exhaust.webp" className='speel'/>
            case 4:
                return <img src="/cdn/spells/Flash.webp" className='speel'/>
            case 6:
                return <img src="/cdn/spells/Ghost.webp" className='speel'/>
            case 7:
                return <img src="/cdn/spells/Heal.webp" className='speel'/>
            case 13:
                return <img src="/cdn/spells/Clarity.webp" className='speel'/>
            case 31:
                return <img src="/cdn/spells/Mark.webp" className='speel'/>
            case 11:
                return <img src="/cdn/spells/Smite.webp" className='speel'/>
            case 12:
                return <img src="/cdn/spells/Teleport.webp" className='speel'/>
            default:
                console.log("Placeholder")
                break;
        }
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
                                        <div className='profile_icon_div'>
                                            <img src={"/cdn/profileicon/" + props.playerInformations.profileIconId + ".png"} alt="Profile Icon" width={100} height={200} className="profile_icon" />
                                            <span className='profile_level'>{props.playerInformations.summonerLevel}</span>
                                        </div>
                                        <div className='icon_div_internal'>
                                            <h1 className='player_name'>{props.playerInformations.name}</h1>
                                            <button className='update_button'>Update</button>
                                        </div>
                                    </div>
                                    <div className='card'>
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "IRON" && <img src="/cdn/ranked-emblems/Emblem_Iron.png" alt='Iron Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "SILVER" && <img src="/cdn/ranked-emblems/Emblem_Silver.png" alt='Silver Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "BRONZE" && <img src="/cdn/ranked-emblems/Emblem_Bronze.png" alt='Bronze Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "GOLD" && <img src="/cdn/ranked-emblems/Emblem_Gold.png" alt='Gold Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "PLATINUM" && <img src="/cdn/ranked-emblems/Emblem_Platinum.png" alt='Platinum Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "DIAMOND" && <img src="/cdn/ranked-emblems/Emblem_Diamond.png" alt='Diamond Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "MASTER" && <img src="/cdn/ranked-emblems/Emblem_Master.png" alt='Master Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "GRANDMASTER" && <img src="/cdn/ranked-emblems/Emblem_Grandmaster.png" alt='Grandmaster Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[1] && props.playerQueueInformations[1].tier == "CHALLENGER" && <img src="/cdn/ranked-emblems/Emblem_Challenger.png" alt='Iron Icon' width={120} height={120} className="profile_elo" />}

                                        <div className='card_infos'>
                                            <span className='card_text'>{props.playerQueueInformations[1].queueType}</span>
                                            <span className='card_text'>{props.playerQueueInformations[1].leaguePoints}PDLs</span>
                                            <span className='card_text'>{((props.playerQueueInformations[1].wins / (props.playerQueueInformations[1].wins + props.playerQueueInformations[1].losses)) * 100).toFixed(2)}%</span>
                                        </div>
                                    </div>
                                    <div className='card'>
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "IRON" && <img src="/cdn/ranked-emblems/Emblem_Iron.png" alt='Iron Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "SILVER" && <img src="/cdn/ranked-emblems/Emblem_Silver.png" alt='Silver Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "BRONZE" && <img src="/cdn/ranked-emblems/Emblem_Bronze.png" alt='Bronze Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "GOLD" && <img src="/cdn/ranked-emblems/Emblem_Gold.png" alt='Gold Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "PLATINUM" && <img src="/cdn/ranked-emblems/Emblem_Platinum.png" alt='Platinum Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "DIAMOND" && <img src="/cdn/ranked-emblems/Emblem_Diamond.png" alt='Diamond Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "MASTER" && <img src="/cdn/ranked-emblems/Emblem_Master.png" alt='Master Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "GRANDMASTER" && <img src="/cdn/ranked-emblems/Emblem_Grandmaster.png" alt='Grandmaster Icon' width={120} height={120} className="profile_elo" />}
                                        {props.playerQueueInformations[0] && props.playerQueueInformations[0].tier == "CHALLENGER" && <img src="/cdn/ranked-emblems/Emblem_Challenger.png" alt='Iron Icon' width={120} height={120} className="profile_elo" />}

                                        <div className='card_infos'>
                                            <span className='card_text'>{props.playerQueueInformations[0].queueType}</span>
                                            <span className='card_text'>{props.playerQueueInformations[0].leaguePoints}PDLs</span>
                                            <span className='card_text'>{((props.playerQueueInformations[0].wins / (props.playerQueueInformations[0].wins + props.playerQueueInformations[0].losses)) * 100).toFixed(2)}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='right_app'>
                                    {
                                        props.playerMatchInfos.map((i) => {
                                            const PlayerInfo = i.info.participants.filter(DataFilter)
                                            console.log(PlayerInfo)
                                            const TeamBlue = i.info.participants.filter(TeamBlueFilter)
                                            const TeamRed = i.info.participants.filter(TeamRedFilter)
                                            return [
                                                <div key={i} className='match_history' id={PlayerInfo[0].win == true ? "victory" : "defeat"}>
                                                    {
                                                        i.info.gameCreation
                                                            ?
                                                            <>
                                                                <div className='container_infos'>
                                                                    <div className='container_profile_image'>
                                                                        {PlayerInfo[0] && <img src={"/cdn/champion/" + PlayerInfo[0].championName + ".png"} className="champ_image"/>}
                                                                        <span className='champ_level'>{PlayerInfo[0].champLevel}</span>
                                                                    </div>

                                                                    <div className='container_infos_internal'>
                                                                        <span id={PlayerInfo[0].win == true ? "win" : "defeated"}>{PlayerInfo[0].win == true ? "WIN" : "DEFEAT"}</span>
                                                                        <div className='spell_container'>
                                                                            {SpellFilter(PlayerInfo[0], 1)}
                                                                            {SpellFilter(PlayerInfo[0], 2)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='container_kda'>
                                                                    <div className='container_kda_internal'>
                                                                        <span className='title'>KDA</span>
                                                                        <span className='kda_text'>{PlayerInfo[0].kills}/{PlayerInfo[0].deaths}/{PlayerInfo[0].assists}</span>
                                                                    </div>

                                                                    <div className='container_kda_internal'>
                                                                        <span className='title'>FARM</span>
                                                                        <span className='kda_text'>{PlayerInfo[0].neutralMinionsKilled+PlayerInfo[0].totalMinionsKilled}</span>
                                                                    </div>
                                                                </div>
                                                                <div className='container_items'>
                                                                    <div>
                                                                        {PlayerInfo[0].item0 > 0 ? <img src={"/cdn/item/" + PlayerInfo[0].item0 + ".png"} alt="Player Item 1" className='item_icon'/> : <div className='placeholder'/>}
                                                                        {PlayerInfo[0].item1 > 0 ? <img src={"/cdn/item/" + PlayerInfo[0].item1 + ".png"} alt="Player Item 2" className='item_icon' /> : <div className='placeholder'/>}
                                                                        {PlayerInfo[0].item2 > 0 ? <img src={"/cdn/item/" + PlayerInfo[0].item2 + ".png"} alt="Player Item 3" className='item_icon' /> : <div className='placeholder'/>}
                                                                    </div>
                                                                    <div>
                                                                        {PlayerInfo[0].item3 > 0 ? <img src={"/cdn/item/" + PlayerInfo[0].item3 + ".png"} alt="Player Item 4" className='item_icon' /> : <div className='placeholder'/>}
                                                                        {PlayerInfo[0].item4 > 0 ? <img src={"/cdn/item/" + PlayerInfo[0].item4 + ".png"} alt="Player Item 5" className='item_icon' /> : <div className='placeholder'/>}
                                                                        {PlayerInfo[0].item5 > 0 ? <img src={"/cdn/item/" + PlayerInfo[0].item5 + ".png"} alt="Player Item 6" className='item_icon' /> : <div className='placeholder'/>}
                                                                    </div> 
                                                                </div>
                                                                <div className='container_champions'>
                                                                    <div>
                                                                        {TeamBlue.map((player) => {
                                                                            return [
                                                                                <img key={player} src={"/cdn/champion/" + player.championName + ".png"} alt="Champion Image" className='champion_image'/>
                                                                            ]
                                                                        })}
                                                                    </div>
                                                                    <div>
                                                                        {TeamRed.map((player) => {
                                                                            return [
                                                                                <img key={player} src={"/cdn/champion/" + player.championName + ".png"} alt="Champion Image" className='champion_image'/>
                                                                            ]
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </>
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