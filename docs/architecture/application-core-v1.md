# LiftIQ Application Architecture v1

Version: 1.0
Status: Draft
Architecture Style: Shell-Based Modular ERP

---

# Vision

LiftIQ is not a traditional page-based ERP.

LiftIQ is a workspace-driven enterprise platform where modules operate
inside a unified application shell and share a common runtime.

The user should experience LiftIQ as a professional operational workspace,
not as a collection of unrelated pages.

---

# Core Principles

1. One Application

The system is a single application.

Users
Audit
Sessions
Roles
Dashboard

are modules inside the same runtime.

---

2. Workspace First

The primary navigation concept is a workspace.

Pages exist only for:

- routing
- deep linking
- bookmarking
- browser navigation

The main user experience is workspace-oriented.

---

3. Shared Runtime

All modules use the same:

- authentication
- permissions
- websocket connection
- event bus
- notification system
- theme system

Modules must not create their own runtime infrastructure.

---

4. Modular Architecture

Business domains are isolated.

Examples:

Users Module
Audit Module
Sessions Module
Roles Module

Modules can be developed independently.

---

5. Enterprise UX

The application prioritizes:

- clarity
- speed
- consistency
- accessibility

Visual effects support the workflow and never dominate it.

---

# High Level Architecture

LiftIQ
│
├── App Shell
├── Core Runtime
├── Workspace Engine
├── Module System
├── Event Bus
├── Realtime Layer
└── Feature Modules

---

# App Shell

The App Shell is always active.

Responsibilities:

- background layer
- HUD layer
- navigation
- command center
- notification layer
- workspace host

The shell never contains business logic.

The shell does not know how Users or Audit works.

The shell only hosts modules.

---

# Core Runtime

The Core Runtime provides shared infrastructure.

Responsibilities:

- authentication
- permissions
- API client
- websocket client
- theme management
- notifications
- command center
- runtime configuration

All modules consume services from the runtime.

---

# Workspace Engine

The Workspace Engine controls visual workspaces.

Responsibilities:

- open panel
- close panel
- focus panel
- move panel
- resize panel
- persist layout
- restore layout

Future support:

- detachable windows
- multi-monitor workflows

The Workspace Engine never contains business logic.

---

# Module System

Every business domain is implemented as a module.

Examples:

Users
Audit
Sessions
Roles
Dashboard

Modules expose:

- routes
- permissions
- navigation items
- commands
- panels
- widgets

Modules do not directly communicate with each other.

---

# Event Bus

Cross-module communication occurs through events.

Example:

USER_CREATED
USER_UPDATED
SESSION_REVOKED
ROLE_UPDATED

Benefits:

- loose coupling
- easier testing
- future extensibility

Modules publish and subscribe to events.

Modules never directly manipulate another module's state.

---

# Realtime Layer

Realtime communication is centralized.

Architecture:

WebSocket
↓
Realtime Engine
↓
Event Bus
↓
Modules

Examples:

New Audit Entry
Session Revoked
User Updated

The realtime layer converts server messages into domain events.

---

# Authentication

Authentication belongs to Core Runtime.

Responsibilities:

- login
- logout
- refresh token rotation
- MFA verification
- session management
- permission resolution

Modules never implement authentication logic.

---

# Authorization

Authorization is permission-based.

Route access
Menu visibility
Commands
Actions

must all use the same permission source.

Single source of truth.

---

# Navigation System

Navigation is module-driven.

Modules register:

- menu items
- command center actions
- routes

The shell renders navigation dynamically.

---

# Command Center

Global application command palette.

Shortcut:

CTRL + K

Capabilities:

- open modules
- navigate routes
- execute commands
- search entities

The command center is managed by Core Runtime.

---

# Notification System

Centralized.

Supports:

- info
- success
- warning
- error

Notifications can originate from:

- modules
- websocket events
- system services

---

# Detached Window Strategy

Future capability.

Default behavior:

All content opens inside the application workspace.

Advanced behavior:

Specific panels can detach into separate windows.

Examples:

Audit Monitor
Live Dashboard
Realtime Session Monitor

Detached windows remain connected to:

- authentication
- event bus
- websocket
- shared runtime

Principle:

One Application
Multiple Views

Not:

Multiple Applications

---

# State Management Strategy

Global State

- auth store
- workspace store
- notification store
- theme store
- realtime store

Module State

Each module owns its state.

Examples:

users/store
audit/store
sessions/store

Business state must never be placed into global stores.

---

# API Strategy

Single API client.

Responsibilities:

- token attachment
- refresh handling
- error normalization

Modules consume domain-specific APIs.

Example:

users/api
audit/api
sessions/api

---

# UI Strategy

Design Tokens
↓
UI Primitives
↓
HUD Components
↓
Layouts
↓
Modules

Business modules must use shared UI components.

No custom design systems per module.

---

# Future Extensions

Planned:

- detachable windows
- workspace presets
- plugin marketplace
- multi-monitor support
- collaborative sessions
- advanced realtime dashboards

Architecture decisions should preserve compatibility
with these future extensions.

---

# Architecture Summary

Shell-Based
Workspace-Driven
Module-Oriented
Realtime-Ready
Enterprise-Focused

One Runtime
One Event System
One Permission System
One Workspace
Many Modules