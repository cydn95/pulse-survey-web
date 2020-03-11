// import constants from './constants';
import KeyLines from 'keylines';
// import structureData from './json/ap1-structure';
// import data from './json/es1-ap1-data';

export default class DataStore {
    coreStructure = {};

    constructor(structureData, data) {
        // console.log(structureData);
        // console.log(data);
        this.structureData = structureData;
        this.data = data;
    }

    /** @public */
    structurizeData(entities, entityId, type, currentView=null) {
        const entityNodes = {};
        const entityLinks = {};
        const orgTeamCount = {};
        const teamCount = {};
        const highLevelNodes = {};

        const addGlyph = (id, count) => {
            entityNodes[id] = {
                ...entityNodes[id],
                g: count === 0 ? []
                    : [{
                        b: "#00000000",
                        c: "#1d1d1d",
                        e: 1.1,
                        fc: "#f3f5f9",
                        ff: "sans-serif",
                        p: 45,
                        r: 25,
                        t: count,
                        w: true
                    }]
            }
        }


        const constructNode = (node, id2) => {
            const id = id2 || node.id;
            entityNodes[id] = {
                id,
                type: 'node',
                c: "#ffffffff",
                b: false,
                bw: 0,
                t: node.name || '',
                u: node.icon,
                fbc: 'transparent',
                e: !node.icon && !node.name ? 0.1 : node.e || 3.5,
                d: {
                    ...node
                }
            };
        };

        const constructLink = (link) => {
            let id = `${link.id1}-${link.id2}`
            entityLinks[id] = {
                id,
                type: 'link',
                c: link.color || "#3b4f81",
                id1: link.id1,
                id2: link.id2,
                d: link
            };
        };

        const constructCoreStructure = (core) => {
            let { sh_categories, main } = core;
            let coreElements = [main].concat(sh_categories);
            coreElements.forEach(item => {
                let coreElem = {...item, coreEntity: true};
                constructNode(coreElem);
                if(coreElem.individualCount && coreElem.individualCount>0){
                    addGlyph(coreElem.id,coreElem.individualCount);
                }
            });
            sh_categories.forEach(item => {
                let link = {};
                link.id1 = item.id;
                link.id2 = main.id;
                constructLink(link);
            })

        }
        // construnct the main visualisation core
        if (type === 'core') {
            constructCoreStructure(this.coreStructure[entityId]);
        } else {
            // split the various fetched entities
            let { individuals, teams, organisations } = entities;
            // create the individual nodes and update the team and org nodes
            individuals.forEach(individual => {
                let currentOrganisation = individual.organisation.current;
                let currentTeam = individual.team.current;
                let currentSHCategory = individual.sh_category.current;
                
                // create the org if it hasn't been created and depending on the selected view set 
                // the hidden value
                let orgNodeId = `${currentSHCategory}_${currentOrganisation}`;
                if(!entityNodes[orgNodeId]){
                    let orgInfo = organisations.find(org => org.id === currentOrganisation);
                    constructNode(orgInfo, orgNodeId);
                    entityNodes[orgNodeId].hi = currentView.length>1 || currentView[0] === 'Org'? false : true;
                    highLevelNodes[orgNodeId]  = entityNodes[orgNodeId];
                }

                // create the team nodes (for single and double combos) if they haven't 
                // been created and depending on the selected view set  the hidden value
                let teamNodeId = `${currentSHCategory}_${currentOrganisation}_${currentTeam}`;
                let teamSHId = `${currentSHCategory}_${currentTeam}`;
                if(!entityNodes[teamNodeId]){
                    let teamInfo = teams.find(team => team.id === currentTeam);
                    constructNode(teamInfo, teamNodeId);
                    entityNodes[teamNodeId].parentId = orgNodeId;
                    entityNodes[teamNodeId].hi = currentView.length>1 ? false : true;
                    highLevelNodes[teamNodeId]  = entityNodes[teamNodeId];
                    constructNode(teamInfo, teamSHId);
                    entityNodes[teamSHId].hi = currentView[0] === 'Team' ? false : true;
                    highLevelNodes[teamSHId] = entityNodes[teamSHId];
                }

                // initialise the counter object
                orgTeamCount[orgNodeId] = orgTeamCount[orgNodeId] || {};
                orgTeamCount[orgNodeId][teamNodeId] = orgTeamCount[orgNodeId][teamNodeId] || 0;
                teamCount[teamSHId] = teamCount[teamSHId] || 0;
                // add to the couter object
                if (individual.icon || individual.name) {
                    orgTeamCount[orgNodeId][teamNodeId] += 1;
                    teamCount[teamSHId] +=1;
                }

                // create the individual's node and set the parentId depending on the currently selected view
                constructNode(individual);
                entityNodes[individual.id].parentId = currentView.length === 0 ? '': currentView.length>1 ? teamNodeId : currentView[0]=== 'Team' ? teamSHId :orgNodeId;

                // create the link between the organisation and the relevant sh category
                let link = {};
                link.id1 = currentSHCategory;
                link.id2 = individual.id;
                constructLink(link);

            });
            Object.keys(orgTeamCount).forEach(orgId => {
                let orgCount = 0;
                Object.keys(orgTeamCount[orgId]).forEach(teamId => {
                    addGlyph(teamId, orgTeamCount[orgId][teamId]);
                    orgCount += orgTeamCount[orgId][teamId];
                })
                addGlyph(orgId,orgCount);
            })

            Object.keys(teamCount).forEach(teamSHId => {
                addGlyph(teamSHId,teamCount[teamSHId]);
            })
        }
        return {newItems: [...Object.values(entityNodes), ...Object.values(entityLinks)], highLevelNodes};
    }

    /** @public */
    async getCoreStructure(entityId = 'ap1') {
        // this.coreStructure= await fetch(constants.dataEndpoints.structure(entityId)).then(response => response.json());
        // cache the fetched core structures;
        this.coreStructure[entityId] = this.coreStructure[entityId] || this.structureData;
        return this.structurizeData({},entityId, 'core');
    }

    /** @public */
    async getEntityNetwork(sh_category, entityId = 'ap1', currentView) {
        // await this.getSchema(entityId);
        // const entities = await fetch(constants.dataEndpoints.data(entityId)).then(response => response.json());
        const entities = this.data;
        return this.structurizeData(entities, entityId, 'entities', currentView);
    }
}
