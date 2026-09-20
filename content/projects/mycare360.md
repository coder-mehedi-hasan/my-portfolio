---
title: "MyCare360"
sub_title: "Mobile Based Patient App for EMR"
date: "2025-01-01"
icon: "fa-solid fa-heart-pulse"
description: "A mobile-first patient experience for appointments, medical records, and communication with care providers."
live_url: "https://quantumleapcorp.com/#mycare360"
sort_index: 1
tools:
  - React Native
  - Node.js
  - PostgreSQL
---

## Project Scope

MyCare360 is a mobile-first patient application designed to work alongside the QuantumLeap EMR system. It gives patients a simple way to view appointments, access their medical records, and communicate with their care providers from their phone.

The project covered the full mobile app lifecycle: requirements gathering, UI/UX design, API integration, and release management for both iOS and Android.

## My Role

I was responsible for building the patient-facing mobile experience and integrating it with the backend EMR APIs.

## Learning Curve

The biggest learning curve was working with offline-first patterns. Patients often have unstable connectivity, so I had to design local data caching and background sync that still felt instant.

- Learned how to manage sync conflict resolution between device and server.
- Got comfortable with push-notification flows for appointment reminders.
- Deepened my understanding of secure token handling for patient data.

## Challenges & Struggles

- **Data consistency:** keeping the offline cache in sync with the server without corrupting records was the hardest part.
- **Strict health-data rules:** handling PHI (protected health information) meant every API call needed to be audited and encrypted.
- **Device fragmentation:** a wide range of Android devices required careful performance testing and memory optimization.

## Key Takeaways

Shipping a healthcare app taught me how much discipline good engineering requires — from security reviews to accessibility. It also reinforced that simple, well-tested features beat a broad surface area every time.
