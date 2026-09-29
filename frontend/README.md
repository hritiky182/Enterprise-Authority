# Core Strategy Suite

Build a high-fidelity static enterprise frontend prototype for a Strategy, Performance, Governance, Risk & Compliance (GRC), Cybersecurity Risk, and Business Continuity Management (BCM) platform.

Do not use any real company, authority, organization, brand, client, or product name anywhere in the application. Use a generic product identity such as Enterprise GRC Platform.

Tech Stack

React + TypeScript

Vite

Tailwind CSS

React Router

Recharts

Lucide icons

Mock data only — no backend/API/database

Reusable, feature-based architecture

The code should be clean and easy to connect to a future MERN/REST backend.

Design

Create a premium enterprise SaaS/GRC dashboard.

Style:

Modern

Professional

Clean

Data-rich

Enterprise-grade

Responsive

Accessible

Use KPI cards, charts, tables, filters, status badges, tabs, drawers and modals.

Avoid excessive gradients, cartoon graphics and generic admin-template styling.

Main Navigation

Sidebar:

Dashboard

Strategy

Performance

Enterprise Risk

Cybersecurity & IT Risk

Governance

Compliance

Business Continuity

Action Plans

Tasks

Documents

Reports

Administration

Header:

Breadcrumbs

Global Search

Notifications

Language selector

User profile

Make the layout Arabic/RTL-ready, although English can be the default.

Executive Dashboard

Create a sophisticated executive dashboard showing:

Overall Performance

Strategic Objectives

Active Initiatives

KPI Achievement

Open Risks

Critical Risks

Compliance %

BCM Readiness

Open Actions

Include:

Performance trend chart

Objective status chart

5×5 risk heatmap

Critical risks table

Initiative progress

Compliance overview

BCM readiness

Use realistic enterprise mock data.

Strategy

Create:

Strategy Overview

Strategic Themes

Strategic Goals

Strategic Objectives

KPI Management

Strategic Initiatives

Hierarchy:

Strategy → Themes → Goals → Objectives → KPIs → Initiatives

Objective table:
Objective, Theme, Owner, KPI, Target, Actual, Achievement %, Status.

Initiative detail:
Owner, Department, Budget, Progress, Timeline, Milestones, Risks and Actions.

Performance

Create:

Performance Dashboard

Organizational Performance

Department Performance

KPI Performance

Performance Trends

Include filters for year, quarter, department and theme.

Enterprise Risk

Create:

Risk Dashboard

Risk Register

Risk Assessment

Risk Treatment

Risk Monitoring

Risk Reports

Risk fields:
ID, Risk, Category, Owner, Department, Likelihood, Impact, Inherent Risk, Residual Risk, Treatment, Status.

Create an interactive 5×5 likelihood × impact risk heatmap.

Risk detail:
Overview, Assessment, Controls, Treatment, Mitigation Actions and History.

Cybersecurity & IT Risk

Create:

Cyber Risk Dashboard

IT Risk Register

Cybersecurity Risks

Assets

Threats

Vulnerabilities

Security Controls

Assessments

Show critical vulnerabilities, high-risk assets, control effectiveness and remediation actions.

Governance

Create:

Governance Dashboard

Committees

Policies

Procedures

Roles & Responsibilities

Decisions

Meetings

Policy fields:
ID, Owner, Version, Effective Date, Review Date, Approval Status.

Compliance

Create:

Compliance Dashboard

Frameworks

Requirements

Controls

Assessments

Findings

Corrective Actions

Use generic realistic frameworks such as ISO 27001, ISO 22301, ISO 31000, NIST and COBIT.

Do not claim actual certification.

Business Continuity

Create:

BCM Dashboard

Business Impact Analysis

Critical Processes

Continuity Plans

Recovery Strategies

Crisis Management

Exercises & Tests

BIA fields:
Process, Department, Criticality, MTD, RTO, RPO, Dependencies, Recovery Priority.

Show BCM readiness, critical processes, tested plans, recovery status and open gaps.

Action Plans & Tasks

Create centralized action management across Strategy, Risk, Compliance, Governance and BCM.

Actions:
Owner, Priority, Due Date, Progress, Status.

Tasks:
To Do, In Progress, Blocked, Completed.

Include List and Kanban views.

Documents

Create document management for:

Policies

Procedures

Risk Documents

Strategy Documents

BCM Plans

Compliance Evidence

Governance Documents

Use mock data only.

Reports

Create:

Executive Reports

Strategy Reports

Performance Reports

Risk Reports

Cybersecurity Reports

Compliance Reports

Governance Reports

BCM Reports

Include report preview and mock PDF/Excel export actions.

Administration

Create:

Users

Roles

Departments

System Settings

Roles:
Administrator, Strategy Manager, Risk Manager, Compliance Manager, BCM Manager, Executive, Auditor, Viewer.

UX & Interactions

All major navigation items must work.

Implement:

Routing

Search

Filters

Sorting

Pagination

Tabs

Modals/drawers

Toast notifications

Detail pages

Demo create/edit interactions

Loading states

Empty states

Important demo flows:

Dashboard → Objective → KPI → KPI Performance

Dashboard → Critical Risk → Risk Detail → Treatment → Action

Dashboard → Compliance → Requirement → Control → Finding → Corrective Action

Dashboard → BCM → Critical Process → BIA → Continuity Plan → Test

Architecture

Use reusable components and separate mock data from UI.

Create TypeScript types for:

Risk, Objective, KPI, Initiative, Policy, Control, ComplianceRequirement, BCMPlan, Action, Task, User and Department.

Use a feature-based structure and avoid large monolithic components.

The frontend should be easy to connect to a future Node.js/Express/MongoDB backend.

Final Goal

Build a complete clickable Enterprise Strategy, Performance & GRC prototype, not a generic admin dashboard.

Prioritize:

Professional UI → Realistic Data → Excellent UX → Working Navigation → Reusable Architecture → Responsive Design

Do not include any real organization/company/client/brand names from the source requirements.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/88f78159-d9f3-4ddd-a3d1-3b4ccc936221).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
