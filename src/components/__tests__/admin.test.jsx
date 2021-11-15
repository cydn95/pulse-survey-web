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
        expect(screen.getByText('No User')).toBeInTheDocument()
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