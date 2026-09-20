---
title: "QuantumLeap EMR"
sub_title: "Electronic Medical Record Software"
date: "2024-10-01"
icon: "fa-solid fa-stethoscope"
description: "A web-based electronic medical record system for clinical workflows, patient charts, and reporting."
live_url: "http://emr.quantumleapcorp.com"
sort_index: 2
tools:
  - React.js
  - NestJS
  - PostgreSQL
---

## Project Scope

QuantumLeap EMR is a web-based electronic medical record system that digitizes patient charts, clinical workflows, and reporting for healthcare providers. The application handles appointment scheduling, prescription management, and clinical documentation in a single dashboard.

## My Role

I worked across the frontend and backend — building the clinical dashboard UI and the REST APIs that power it.

## Learning Curve

Working in a regulated domain pushed me to think carefully about data modeling and auditability.

- Designed normalized database schemas that could handle complex clinical relationships.
- Learned how to structure long-running background jobs for report generation.
- Got hands-on with role-based access control across dozens of user roles.

## Challenges & Struggles

- **Complex UI state:** clinical dashboards have many interconnected widgets; keeping state predictable took a lot of iteration.
- **Performance:** large patient datasets made naive queries unusable, so I learned indexing and pagination the hard way.
- **Uptime expectations:** medical staff depend on the system daily, so deployment had to be smooth and reversible.

## Key Takeaways

Building an EMR gave me real respect for boring, reliable engineering. The most valuable skills I took away were careful schema design, disciplined API versioning, and the ability to debug performance problems in production.
