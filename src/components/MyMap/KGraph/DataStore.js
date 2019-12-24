// import constants from './constants';
import KeyLines from 'keylines';
import structureData from './json/ap1-structure';
import data from './json/es1-ap1-data';

export default class DataStore {
    coreStructure = {};
    /** @private */
    structurizeData(entities, entityId, type) {

        const entityNodes = {};
        const entityLinks = {};
        const orgTeamCount = {};

        const addGlyph = (id, count) => {
            entityNodes[id] = {
                ...entityNodes[id],
                g: count === 0 ? []
                    : [{
                        b: "#4a5c89",
                        c: "#4966ac",
                        e: 1.2,
                        fc: "#f3f5f9",
                        ff: "sans-serif",
                        p: 45,
                        r: 35,
                        t: count,
                        w: true
                    }]
            }
        }


        const constructNode = (node) => {
            let id = node.id;
            entityNodes[id] = {
                id: node.id,
                type: 'node',
                c: node.color || "#d8d8d8",
                b: node.border || "#3b4f81",
                bw: 1,
                t: node.name || '',
                fi: node.icon ? {
                    t: KeyLines.getFontIcon(node.icon),
                    c: node.iconColor || "#414b57"
                } : {},
                parentId: node.parentId || "",
                e: !node.icon && !node.name ? 0.1 : node.e || 1,
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

            // create high level organisation/team combo node and populate with dummy node
            let highLevelNodes = [...teams, ...organisations];
            highLevelNodes.forEach(node => {
                constructNode(node);
            })

            // create the individual nodes and update the team and org nodes
            individuals.forEach(individual => {
                let individualNode = { ...individual, parentId: individual.team.current };
                let currentOrganisation = individual.organisation.current;
                let currentTeam = individual.team.current;
                let currentSHCategory = individual.sh_category.current;
                
                // initialise the counter object
                orgTeamCount[currentOrganisation] = orgTeamCount[currentOrganisation] || {};
                orgTeamCount[currentOrganisation][currentTeam] = orgTeamCount[currentOrganisation][currentTeam] || 0;
                
                // add to the couter object
                if (individual.icon || individual.name) {
                    orgTeamCount[currentOrganisation][currentTeam] += 1;
                }
                constructNode(individualNode);
                // update the existing team and organisation nodes with new information
                if (entityNodes[currentTeam].parentId === '') {
                    entityNodes[currentTeam].parentId = currentOrganisation;
                }
                // create the link between the organisation and the relevant sh category
                // if (!entityLinks[`${currentSHCategory}-${fakeOrganisationNode}`]) {
                let link = {};
                link.id1 = currentSHCategory;
                link.id2 = individual.id;
                constructLink(link);
                // }

            });
            Object.keys(orgTeamCount).forEach(orgId => {
                let orgCount = 0;
                Object.keys(orgTeamCount[orgId]).forEach(teamId => {
                    addGlyph(teamId, orgTeamCount[orgId][teamId]);
                    orgCount += orgTeamCount[orgId][teamId];
                })
                addGlyph(orgId,orgCount);
            })
        }
        return [...Object.values(entityNodes), ...Object.values(entityLinks)];
    }

    /** @public */
    async getCoreStructure(entityId = 'ap1') {
        // this.coreStructure= await fetch(constants.dataEndpoints.structure(entityId)).then(response => response.json());
        // cache the fetched core structures;
        this.coreStructure[entityId] = this.coreStructure[entityId] || structureData;
        return this.structurizeData({},entityId, 'core');
    }

    /** @public */
    async getEntityNetwork(sh_category,entityId = 'ap1') {
        // await this.getSchema(entityId);
        // const entities = await fetch(constants.dataEndpoints.data(entityId)).then(response => response.json());
        const entities = data;
        return this.structurizeData(entities, entityId, 'entities');
    }
}