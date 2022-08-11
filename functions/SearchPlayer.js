import Configurations from '../configs/configs.json'

export default class Player {

    constructor(baseUrl, apiKey) {
        this.baseUrl = baseUrl
        this.apiKey = apiKey
    }

    async getInitialInformations(summonerName) {
        let initialInformations;
        await fetch(this.baseUrl + Configurations.API_SUMMONER_TO_ID + summonerName + "?api_key=" + this.apiKey)
            .then(response => response.json())
            .then(data => initialInformations = data)
        return initialInformations
    }

    async getQueueInformations(id) {
        let queueInformations;
        await fetch(this.baseUrl + Configurations.API_ID_TO_INFORMATIONS + id + "?api_key=" + this.apiKey)
            .then(response => response.json())
            .then(data => queueInformations = data)
        return queueInformations
    }

    async getMatchHistoryIds(puuid) {
        let matchIds;

        await fetch(Configurations.API_PUUID_TO_MATCH_HISTORY + puuid + "/ids?api_key=" + this.apiKey)
            .then(response => response.json())
            .then(data => matchIds = data)

        return matchIds
    }

    async getMatchInfos(matchId) {
        let matchInfo = [];

        for (let a = 0; a < 20; a++) {
            await fetch("https://americas.api.riotgames.com/lol/match/v5/matches/" + matchId[a] + "?api_key=" + this.apiKey)
                .then(response => response.json())
                .then(data => matchInfo.push(data))
        }

        return matchInfo
    }
}