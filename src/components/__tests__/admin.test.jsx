import { render, screen, rerender } from "@testing-library/react";
import React from 'rewct'
import AdminStepBar from "../admin/AdminStepBar";
import ProjectSetup from "../admin/ProjectSetup";
import UserGrouping from "../admin/ProjectConfiguration/UserGrouping";
import MappingCategory from "../admin/ProjectConfiguration/MappingCategory";
import Drivers from "../admin/ProjectConfiguration/Drivers";
import UserAdministration from '../admin/UserAdministration'
import FlaggedResponses from '../admin/FlaggedResponses'
import Reporting from '../admin/Reporting'

describe('admin components works properly', () => {
    test('step bar should work properly', () => {
        render(<AdminStepBar />)
        expect(screen.getByText('Project Setup')).toBeInTheDocument()
        expect(screen.getByText('Project Configuration')).toBeInTheDocument()
        expect(screen.getByText('Survey Configuration')).toBeInTheDocument()
        expect(screen.getByText('Reporting')).toBeInTheDocument()
        expect(screen.getByText('User Administration')).toBeInTheDocument()
        expect(screen.getByText('Flagged Responses')).toBeInTheDocument()
    })
    test('project setup page works properly', () => {
        render(<ProjectSetup currentProject={{}} loading={false} />)
        expect(screen.getByText('Project Name')).toBeInTheDocument()
        rerender(<ProjectSetup currentProject={{}} loading={true} />)
        expect(screen.getByText('Project Name')).not.toBeInTheDocument()
    })
    test('user grouping part works properly', () => {
        render(<UserGrouping />)
        expect(screen.getByText('User Grouping')).toBeInTheDocument()
        expect(screen.getByText('Anonymity Threshold')).toBeInTheDocument()
    })
    test('mapping cateory part works properly', () => {
        render(<MappingCategory />)
        expect(screen.getByText('Mapping Categories')).toBeInTheDocument()
        expect(screen.getByText('Reorder')).toBeInTheDocument()
    })

    test('drivers part works properly', () => {
        render(<Drivers />)
        expect(screen.getByText('Drivers')).toBeInTheDocument()
        expect(screen.getByText('Reorder')).toBeInTheDocument()
    })

    test('uesr administration works properly', () => {
        render(<UserAdministration userList={{}} loading={true} />)
        const mockData = {
            "projectUser": [
                {
                    "id": 512,
                    "survey": {
                        "id": 50,
                        "projectCode": "",
                        "projectLogo": null,
                        "companyLogo": null,
                        "surveyTitle": "Liberty Mine Construction Survey",
                        "projectManager": "",
                        "isStandard": false,
                        "isActive": true,
                        "customGroup1": "",
                        "customGroup2": "",
                        "customGroup3": "",
                        "anonymityThreshold": 3,
                        "seatsPurchased": 100,
                        "created_at": "2021-10-29T16:48:05.021586+08:00",
                        "updated_at": "2021-10-29T16:48:05.071717+08:00",
                        "project": 26
                    },
                    "projectUserTitle": "Dev1",
                    "projectUserRoleDesc": "",
                    "user": {
                        "id": 360,
                        "username": "jaclindev99@gmail.com",
                        "last_login": null,
                        "first_name": "Tony",
                        "last_name": "A",
                        "email": "jaclindev99@gmail.com",
                        "is_superuser": false,
                        "is_staff": false,
                        "is_active": true,
                        "snippets": [],
                        "organization": {
                            "id": 304,
                            "name": "LMCCompany",
                            "user": 360
                        },
                        "avatar": null,
                        "userteam": {
                            "id": 53,
                            "name": "LMCTeam",
                            "user": 360
                        },
                        "usertitle": null,
                        "guidemode": {
                            "id": 46,
                            "name": false,
                            "user": 360
                        }
                    },
                    "team": {
                        "id": 50,
                        "name": "LMC Dev Team",
                        "project": 26
                    },
                    "shGroup": {
                        "id": 79,
                        "SHGroupName": "Internal",
                        "SHGroupAbbrev": "",
                        "responsePercent": 30,
                        "survey": 50
                    },
                    "sendInvite": true,
                    "sendEmail": false,
                    "isSuperUser": false,
                    "isCGroup1": false,
                    "isCGroup2": false,
                    "isCGroup3": false,
                    "projectOrganization": "",
                    "shType": null,
                    "projectAdmin": false,
                    "addByProjectUser": {
                        "id": 511,
                        "user": {
                            "id": 5,
                            "username": "mike.smith@projectai.com",
                            "last_login": "2021-11-09T14:21:47.055756+08:00",
                            "first_name": "Mike",
                            "last_name": "Smith",
                            "email": "mike.smith@projectai.com",
                            "is_superuser": true,
                            "is_staff": true,
                            "is_active": true,
                            "snippets": [],
                            "organization": {
                                "id": 11,
                                "name": "ProjectAI",
                                "user": 5
                            },
                            "avatar": {
                                "id": 2,
                                "name": "https://pulse.projectai.com/media/uploads/user/Mike-Smith.png",
                                "user": 5
                            },
                            "userteam": {
                                "id": 12,
                                "name": "Department",
                                "user": 5
                            },
                            "usertitle": {
                                "id": 12,
                                "name": "Job Title",
                                "user": 5
                            },
                            "guidemode": {
                                "id": 1,
                                "name": false,
                                "user": 5
                            }
                        }
                    },
                    "created_at": "2021-10-21T16:16:53.438392+08:00",
                    "updated_at": "2021-10-21T16:16:53.696267+08:00",
                    "accept_status": false,
                    "am_total": 55,
                    "am_response": [
                        4947,
                        4948,
                        4949,
                        4950,
                        4951,
                        4952,
                        4942,
                        4943,
                        4944,
                        4945,
                        4946,
                        4930,
                        4931,
                        4932,
                        4933,
                        4934,
                        4935,
                        4936,
                        4937,
                        4938,
                        4939,
                        4940,
                        4941,
                        4926,
                        4927,
                        4928,
                        4929,
                        4924,
                        4925,
                        4923,
                        4922,
                        4918,
                        4916,
                        4921,
                        4920,
                        4917,
                        4912,
                        4914,
                        4913,
                        4915,
                        4911,
                        4910,
                        4901,
                        4903,
                        4905,
                        4907,
                        4902,
                        4906,
                        4900,
                        4919,
                        4904
                    ],
                    "am_answered": 51,
                    "ao_total": 14,
                    "ao_response": [
                        847,
                        822,
                        823,
                        836,
                        848,
                        849,
                        850,
                        824,
                        829,
                        835,
                        836,
                        819,
                        820,
                        824,
                        829,
                        835,
                        816,
                        821,
                        816,
                        819,
                        820,
                        821,
                        822,
                        823,
                        824,
                        836,
                        816,
                        819,
                        820,
                        821,
                        829,
                        835
                    ],
                    "ao_answered": 32,
                    "mappedByOthers": 10
                },
                {
                    "id": 511,
                    "survey": {
                        "id": 50,
                        "projectCode": "",
                        "projectLogo": null,
                        "companyLogo": null,
                        "surveyTitle": "Liberty Mine Construction Survey",
                        "projectManager": "",
                        "isStandard": false,
                        "isActive": true,
                        "customGroup1": "",
                        "customGroup2": "",
                        "customGroup3": "",
                        "anonymityThreshold": 3,
                        "seatsPurchased": 100,
                        "created_at": "2021-10-29T16:48:05.021586+08:00",
                        "updated_at": "2021-10-29T16:48:05.071717+08:00",
                        "project": 26
                    },
                    "projectUserTitle": "CTO",
                    "projectUserRoleDesc": "",
                    "user": {
                        "id": 5,
                        "username": "mike.smith@projectai.com",
                        "last_login": "2021-11-09T14:21:47.055756+08:00",
                        "first_name": "Mike",
                        "last_name": "Smith",
                        "email": "mike.smith@projectai.com",
                        "is_superuser": true,
                        "is_staff": true,
                        "is_active": true,
                        "snippets": [],
                        "organization": {
                            "id": 11,
                            "name": "ProjectAI",
                            "user": 5
                        },
                        "avatar": {
                            "id": 2,
                            "name": "https://pulse.projectai.com/media/uploads/user/Mike-Smith.png",
                            "user": 5
                        },
                        "userteam": {
                            "id": 12,
                            "name": "Department",
                            "user": 5
                        },
                        "usertitle": {
                            "id": 12,
                            "name": "Job Title",
                            "user": 5
                        },
                        "guidemode": {
                            "id": 1,
                            "name": false,
                            "user": 5
                        }
                    },
                    "team": {
                        "id": 50,
                        "name": "LMC Dev Team",
                        "project": 26
                    },
                    "shGroup": {
                        "id": 79,
                        "SHGroupName": "Internal",
                        "SHGroupAbbrev": "",
                        "responsePercent": 30,
                        "survey": 50
                    },
                    "sendInvite": true,
                    "sendEmail": false,
                    "isSuperUser": true,
                    "isCGroup1": false,
                    "isCGroup2": false,
                    "isCGroup3": false,
                    "projectOrganization": "",
                    "shType": null,
                    "projectAdmin": true,
                    "addByProjectUser": {
                        "id": 511,
                        "user": {
                            "id": 5,
                            "username": "mike.smith@projectai.com",
                            "last_login": "2021-11-09T14:21:47.055756+08:00",
                            "first_name": "Mike",
                            "last_name": "Smith",
                            "email": "mike.smith@projectai.com",
                            "is_superuser": true,
                            "is_staff": true,
                            "is_active": true,
                            "snippets": [],
                            "organization": {
                                "id": 11,
                                "name": "ProjectAI",
                                "user": 5
                            },
                            "avatar": {
                                "id": 2,
                                "name": "https://pulse.projectai.com/media/uploads/user/Mike-Smith.png",
                                "user": 5
                            },
                            "userteam": {
                                "id": 12,
                                "name": "Department",
                                "user": 5
                            },
                            "usertitle": {
                                "id": 12,
                                "name": "Job Title",
                                "user": 5
                            },
                            "guidemode": {
                                "id": 1,
                                "name": false,
                                "user": 5
                            }
                        }
                    },
                    "created_at": "2021-10-21T16:16:53.438392+08:00",
                    "updated_at": "2021-10-21T16:16:53.696267+08:00",
                    "accept_status": true,
                    "am_total": 55,
                    "am_response": [
                        4952,
                        4951,
                        4950,
                        4949,
                        4948,
                        4947,
                        4935,
                        4903
                    ],
                    "am_answered": 8,
                    "ao_total": 14,
                    "ao_response": [
                        829,
                        835,
                        836,
                        816,
                        819,
                        820,
                        821,
                        822,
                        823,
                        824,
                        816,
                        819,
                        820,
                        821,
                        822,
                        823,
                        824,
                        829,
                        835,
                        836,
                        816,
                        819,
                        820,
                        821,
                        822,
                        823,
                        824,
                        829,
                        835,
                        836
                    ],
                    "ao_answered": 30,
                    "mappedByOthers": 5
                },
                {
                    "id": 514,
                    "survey": {
                        "id": 50,
                        "projectCode": "",
                        "projectLogo": null,
                        "companyLogo": null,
                        "surveyTitle": "Liberty Mine Construction Survey",
                        "projectManager": "",
                        "isStandard": false,
                        "isActive": true,
                        "customGroup1": "",
                        "customGroup2": "",
                        "customGroup3": "",
                        "anonymityThreshold": 3,
                        "seatsPurchased": 100,
                        "created_at": "2021-10-29T16:48:05.021586+08:00",
                        "updated_at": "2021-10-29T16:48:05.071717+08:00",
                        "project": 26
                    },
                    "projectUserTitle": "Dev3",
                    "projectUserRoleDesc": "",
                    "user": {
                        "id": 355,
                        "username": "webdev733@gmail.com",
                        "last_login": null,
                        "first_name": "Wong",
                        "last_name": "Lin1",
                        "email": "webdev733@gmail.com",
                        "is_superuser": false,
                        "is_staff": false,
                        "is_active": true,
                        "snippets": [],
                        "organization": {
                            "id": 298,
                            "name": "ProjectAI",
                            "user": 355
                        },
                        "avatar": null,
                        "userteam": null,
                        "usertitle": null,
                        "guidemode": {
                            "id": 29,
                            "name": false,
                            "user": 355
                        }
                    },
                    "team": {
                        "id": 51,
                        "name": "LMC Marketing Team",
                        "project": 26
                    },
                    "shGroup": null,
                    "sendInvite": true,
                    "sendEmail": false,
                    "isSuperUser": false,
                    "isCGroup1": false,
                    "isCGroup2": false,
                    "isCGroup3": false,
                    "projectOrganization": "",
                    "shType": null,
                    "projectAdmin": false,
                    "addByProjectUser": {
                        "id": 511,
                        "user": {
                            "id": 5,
                            "username": "mike.smith@projectai.com",
                            "last_login": "2021-11-09T14:21:47.055756+08:00",
                            "first_name": "Mike",
                            "last_name": "Smith",
                            "email": "mike.smith@projectai.com",
                            "is_superuser": true,
                            "is_staff": true,
                            "is_active": true,
                            "snippets": [],
                            "organization": {
                                "id": 11,
                                "name": "ProjectAI",
                                "user": 5
                            },
                            "avatar": {
                                "id": 2,
                                "name": "https://pulse.projectai.com/media/uploads/user/Mike-Smith.png",
                                "user": 5
                            },
                            "userteam": {
                                "id": 12,
                                "name": "Department",
                                "user": 5
                            },
                            "usertitle": {
                                "id": 12,
                                "name": "Job Title",
                                "user": 5
                            },
                            "guidemode": {
                                "id": 1,
                                "name": false,
                                "user": 5
                            }
                        }
                    },
                    "created_at": "2021-10-21T16:16:53.438392+08:00",
                    "updated_at": "2021-10-21T16:16:53.696267+08:00",
                    "accept_status": false,
                    "am_total": 55,
                    "am_response": [
                        4947,
                        4948,
                        4949,
                        4950,
                        4951,
                        4952,
                        4942,
                        4943,
                        4944,
                        4945,
                        4946,
                        4930,
                        4931,
                        4932,
                        4928,
                        4924,
                        4925,
                        4923,
                        4922,
                        4918,
                        4916,
                        4921,
                        4920,
                        4919,
                        4917,
                        4912,
                        4914,
                        4913,
                        4915,
                        4911,
                        4910,
                        4901,
                        4903,
                        4905,
                        4904,
                        4907,
                        4902,
                        4906,
                        4900,
                        4933,
                        4934,
                        4935,
                        4936,
                        4937,
                        4938,
                        4939,
                        4940,
                        4941,
                        4926,
                        4927,
                        4929
                    ],
                    "am_answered": 51,
                    "ao_total": 14,
                    "ao_response": [
                        847,
                        822,
                        823,
                        821,
                        835,
                        816,
                        819,
                        820,
                        821,
                        824,
                        829,
                        835,
                        816,
                        822,
                        823,
                        836,
                        816,
                        819,
                        820,
                        824,
                        829,
                        836,
                        848,
                        849,
                        850,
                        819,
                        820,
                        821,
                        822,
                        823,
                        824,
                        829,
                        835,
                        836
                    ],
                    "ao_answered": 34,
                    "mappedByOthers": 4
                },
                {
                    "id": 513,
                    "survey": {
                        "id": 50,
                        "projectCode": "",
                        "projectLogo": null,
                        "companyLogo": null,
                        "surveyTitle": "Liberty Mine Construction Survey",
                        "projectManager": "",
                        "isStandard": false,
                        "isActive": true,
                        "customGroup1": "",
                        "customGroup2": "",
                        "customGroup3": "",
                        "anonymityThreshold": 3,
                        "seatsPurchased": 100,
                        "created_at": "2021-10-29T16:48:05.021586+08:00",
                        "updated_at": "2021-10-29T16:48:05.071717+08:00",
                        "project": 26
                    },
                    "projectUserTitle": "Dev2",
                    "projectUserRoleDesc": "",
                    "user": {
                        "id": 359,
                        "username": "dt897867@gmail.com",
                        "last_login": null,
                        "first_name": "Chris",
                        "last_name": "Stewart",
                        "email": "dt897867@gmail.com",
                        "is_superuser": false,
                        "is_staff": false,
                        "is_active": true,
                        "snippets": [],
                        "organization": {
                            "id": 302,
                            "name": "Liberty Mine Construction Organization",
                            "user": 359
                        },
                        "avatar": {
                            "id": 20,
                            "name": "https://pulse.projectai.com/media/uploads/user/logo-mini-md.png",
                            "user": 359
                        },
                        "userteam": {
                            "id": 52,
                            "name": "Management",
                            "user": 359
                        },
                        "usertitle": {
                            "id": 48,
                            "name": "CEO",
                            "user": 359
                        },
                        "guidemode": {
                            "id": 36,
                            "name": false,
                            "user": 359
                        }
                    },
                    "team": {
                        "id": 50,
                        "name": "LMC Dev Team",
                        "project": 26
                    },
                    "shGroup": null,
                    "sendInvite": true,
                    "sendEmail": false,
                    "isSuperUser": false,
                    "isCGroup1": false,
                    "isCGroup2": false,
                    "isCGroup3": false,
                    "projectOrganization": "",
                    "shType": null,
                    "projectAdmin": false,
                    "addByProjectUser": {
                        "id": 511,
                        "user": {
                            "id": 5,
                            "username": "mike.smith@projectai.com",
                            "last_login": "2021-11-09T14:21:47.055756+08:00",
                            "first_name": "Mike",
                            "last_name": "Smith",
                            "email": "mike.smith@projectai.com",
                            "is_superuser": true,
                            "is_staff": true,
                            "is_active": true,
                            "snippets": [],
                            "organization": {
                                "id": 11,
                                "name": "ProjectAI",
                                "user": 5
                            },
                            "avatar": {
                                "id": 2,
                                "name": "https://pulse.projectai.com/media/uploads/user/Mike-Smith.png",
                                "user": 5
                            },
                            "userteam": {
                                "id": 12,
                                "name": "Department",
                                "user": 5
                            },
                            "usertitle": {
                                "id": 12,
                                "name": "Job Title",
                                "user": 5
                            },
                            "guidemode": {
                                "id": 1,
                                "name": false,
                                "user": 5
                            }
                        }
                    },
                    "created_at": "2021-10-21T16:16:53.438392+08:00",
                    "updated_at": "2021-10-21T16:16:53.696267+08:00",
                    "accept_status": false,
                    "am_total": 55,
                    "am_response": [
                        4942,
                        4943,
                        4944,
                        4945,
                        4946,
                        4930,
                        4931,
                        4932,
                        4933,
                        4934,
                        4936,
                        4937,
                        4938,
                        4939,
                        4940,
                        4941,
                        4926,
                        4927,
                        4928,
                        4923,
                        4922,
                        4918,
                        4916,
                        4921,
                        4920,
                        4919,
                        4917,
                        4912,
                        4914,
                        4913,
                        4915,
                        4911,
                        4910,
                        4901,
                        4904,
                        4905,
                        4907,
                        4902,
                        4906,
                        4900,
                        4947,
                        4948,
                        4950,
                        4951,
                        4935,
                        4903,
                        4949,
                        4952
                    ],
                    "am_answered": 48,
                    "ao_total": 14,
                    "ao_response": [
                        816,
                        819,
                        820,
                        821,
                        847,
                        822,
                        823,
                        824,
                        829,
                        835,
                        836,
                        848,
                        849,
                        850,
                        816,
                        819,
                        820,
                        821,
                        822,
                        824,
                        829,
                        835,
                        823,
                        836,
                        822,
                        823,
                        816,
                        819,
                        820,
                        847,
                        824,
                        829,
                        835,
                        836,
                        848,
                        849,
                        850,
                        821
                    ],
                    "ao_answered": 38,
                    "mappedByOthers": 6
                },
                {
                    "id": 531,
                    "survey": {
                        "id": 50,
                        "projectCode": "",
                        "projectLogo": null,
                        "companyLogo": null,
                        "surveyTitle": "Liberty Mine Construction Survey",
                        "projectManager": "",
                        "isStandard": false,
                        "isActive": true,
                        "customGroup1": "",
                        "customGroup2": "",
                        "customGroup3": "",
                        "anonymityThreshold": 3,
                        "seatsPurchased": 100,
                        "created_at": "2021-10-29T16:48:05.021586+08:00",
                        "updated_at": "2021-10-29T16:48:05.071717+08:00",
                        "project": 26
                    },
                    "projectUserTitle": "PM",
                    "projectUserRoleDesc": "",
                    "user": {
                        "id": 177,
                        "username": "ray.paulk@projectai.com",
                        "last_login": "2021-11-09T13:56:35.369347+08:00",
                        "first_name": "Ray",
                        "last_name": "Paulk",
                        "email": "ray.paulk@projectai.com",
                        "is_superuser": true,
                        "is_staff": true,
                        "is_active": true,
                        "snippets": [],
                        "organization": {
                            "id": 167,
                            "name": "ProjectAI Asia-Pacific Pty Ltd",
                            "user": 177
                        },
                        "avatar": null,
                        "userteam": {
                            "id": 13,
                            "name": "Executive",
                            "user": 177
                        },
                        "usertitle": {
                            "id": 13,
                            "name": "CEO",
                            "user": 177
                        },
                        "guidemode": {
                            "id": 37,
                            "name": false,
                            "user": 177
                        }
                    },
                    "team": {
                        "id": 50,
                        "name": "LMC Dev Team",
                        "project": 26
                    },
                    "shGroup": {
                        "id": 79,
                        "SHGroupName": "Internal",
                        "SHGroupAbbrev": "",
                        "responsePercent": 30,
                        "survey": 50
                    },
                    "sendInvite": true,
                    "sendEmail": false,
                    "isSuperUser": true,
                    "isCGroup1": false,
                    "isCGroup2": false,
                    "isCGroup3": false,
                    "projectOrganization": "",
                    "shType": null,
                    "projectAdmin": true,
                    "addByProjectUser": {
                        "id": 511,
                        "user": {
                            "id": 5,
                            "username": "mike.smith@projectai.com",
                            "last_login": "2021-11-09T14:21:47.055756+08:00",
                            "first_name": "Mike",
                            "last_name": "Smith",
                            "email": "mike.smith@projectai.com",
                            "is_superuser": true,
                            "is_staff": true,
                            "is_active": true,
                            "snippets": [],
                            "organization": {
                                "id": 11,
                                "name": "ProjectAI",
                                "user": 5
                            },
                            "avatar": {
                                "id": 2,
                                "name": "https://pulse.projectai.com/media/uploads/user/Mike-Smith.png",
                                "user": 5
                            },
                            "userteam": {
                                "id": 12,
                                "name": "Department",
                                "user": 5
                            },
                            "usertitle": {
                                "id": 12,
                                "name": "Job Title",
                                "user": 5
                            },
                            "guidemode": {
                                "id": 1,
                                "name": false,
                                "user": 5
                            }
                        }
                    },
                    "created_at": "2021-10-21T16:16:53.438392+08:00",
                    "updated_at": "2021-10-21T16:16:53.696267+08:00",
                    "accept_status": true,
                    "am_total": 55,
                    "am_response": [],
                    "am_answered": 0,
                    "ao_total": 14,
                    "ao_response": [
                        816,
                        819,
                        820,
                        821,
                        847,
                        822,
                        823,
                        824,
                        829,
                        835,
                        836,
                        848,
                        849,
                        850
                    ],
                    "ao_answered": 14,
                    "mappedByOthers": 0
                },
                {
                    "id": 594,
                    "survey": {
                        "id": 50,
                        "projectCode": "",
                        "projectLogo": null,
                        "companyLogo": null,
                        "surveyTitle": "Liberty Mine Construction Survey",
                        "projectManager": "",
                        "isStandard": false,
                        "isActive": true,
                        "customGroup1": "",
                        "customGroup2": "",
                        "customGroup3": "",
                        "anonymityThreshold": 3,
                        "seatsPurchased": 100,
                        "created_at": "2021-10-29T16:48:05.021586+08:00",
                        "updated_at": "2021-10-29T16:48:05.071717+08:00",
                        "project": 26
                    },
                    "projectUserTitle": "DanProjectTitle",
                    "projectUserRoleDesc": "",
                    "user": {
                        "id": 376,
                        "username": "dan.andjelkovic88@gmail.com",
                        "last_login": null,
                        "first_name": "da",
                        "last_name": "a",
                        "email": "dan.andjelkovic88@gmail.com",
                        "is_superuser": false,
                        "is_staff": false,
                        "is_active": true,
                        "snippets": [],
                        "organization": {
                            "id": 319,
                            "name": "test",
                            "user": 376
                        },
                        "avatar": null,
                        "userteam": null,
                        "usertitle": null,
                        "guidemode": {
                            "id": 52,
                            "name": false,
                            "user": 376
                        }
                    },
                    "team": {
                        "id": 51,
                        "name": "LMC Marketing Team",
                        "project": 26
                    },
                    "shGroup": null,
                    "sendInvite": true,
                    "sendEmail": false,
                    "isSuperUser": false,
                    "isCGroup1": false,
                    "isCGroup2": false,
                    "isCGroup3": false,
                    "projectOrganization": "",
                    "shType": null,
                    "projectAdmin": false,
                    "addByProjectUser": {
                        "id": 511,
                        "user": {
                            "id": 5,
                            "username": "mike.smith@projectai.com",
                            "last_login": "2021-11-09T14:21:47.055756+08:00",
                            "first_name": "Mike",
                            "last_name": "Smith",
                            "email": "mike.smith@projectai.com",
                            "is_superuser": true,
                            "is_staff": true,
                            "is_active": true,
                            "snippets": [],
                            "organization": {
                                "id": 11,
                                "name": "ProjectAI",
                                "user": 5
                            },
                            "avatar": {
                                "id": 2,
                                "name": "https://pulse.projectai.com/media/uploads/user/Mike-Smith.png",
                                "user": 5
                            },
                            "userteam": {
                                "id": 12,
                                "name": "Department",
                                "user": 5
                            },
                            "usertitle": {
                                "id": 12,
                                "name": "Job Title",
                                "user": 5
                            },
                            "guidemode": {
                                "id": 1,
                                "name": false,
                                "user": 5
                            }
                        }
                    },
                    "created_at": "2021-10-21T16:16:53.438392+08:00",
                    "updated_at": "2021-10-21T16:16:53.696267+08:00",
                    "accept_status": false,
                    "am_total": 55,
                    "am_response": [],
                    "am_answered": 0,
                    "ao_total": 14,
                    "ao_response": [
                        816,
                        819,
                        820,
                        821,
                        847,
                        822,
                        823,
                        824,
                        829,
                        835,
                        836,
                        848,
                        849,
                        850
                    ],
                    "ao_answered": 14,
                    "mappedByOthers": 4
                }
            ],
            "identifiedTeamMemberCnt": 0,
            "identifiedStakeholderCnt": 0,
            "invitedTeamMemberCnt": 0,
            "invitedStakeholderCnt": 0,
            "totalIdentifiedCnt": 6,
            "totalInvitedCnt": 6
        }
        expect(screen.getByText('No User')).toBeInTheDocument()
        rerender(<UserAdministration userList={mockData} />)
        expect(screen.getByText('No User')).not.toBeInTheDocument()
    })
    test('flagged response works properly', () => {
        render(<FlaggedResponses />)
        expect(screen.getByText('SELECT TO MAKE FLAGGED REPONSE VISIBLE')).toBeInTheDocument()
        expect(screen.getByText('FLAGGED BY')).toBeInTheDocument()
        expect(screen.getByText('DATE')).toBeInTheDocument()
        expect(screen.getByText('STATUS')).toBeInTheDocument()
    })
    test('flagged response works properly', () => {
        render(<Reporting />)
        expect(screen.getByText('Dashboard Threshold')).toBeInTheDocument()
    })
})