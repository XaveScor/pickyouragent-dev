---
title: Planning
description: Features related to task planning and execution strategies
categoryKey: planning
---

# Planning

Planning capabilities allow AI coding agents to break down complex tasks into manageable steps, track progress, and adapt their approach as needed.

## Multi-step Planning

Multi-step planning enables an agent to decompose a complex coding task into smaller, sequential steps before execution. Instead of attempting to solve everything at once, the agent creates a roadmap of actions.

**Why it matters:**
- Reduces errors by tackling one piece at a time
- Provides visibility into the agent's approach
- Makes it easier to course-correct early

**Example:** When asked to "add user authentication," a multi-step planner might create steps like: 1) Create user model, 2) Set up password hashing, 3) Implement login endpoint, 4) Add session management.

## Plan Editing

Plan editing allows users to modify the agent's proposed plan before or during execution. This gives developers control over the approach while still leveraging AI assistance.

**Why it matters:**
- Ensures the agent follows your preferred architecture
- Allows skipping unnecessary steps
- Enables adding custom requirements

**How it works:** After the agent presents its plan, you can add, remove, or reorder steps. Some agents also allow editing individual step descriptions.

## Plan Execution

Plan execution refers to the agent's ability to systematically work through a defined plan, executing each step and tracking completion status.

**Why it matters:**
- Maintains focus on the overall goal
- Provides clear progress indicators
- Enables pause/resume workflows

**Key aspects:** Good plan execution includes handling failures gracefully, updating the plan when blockers are encountered, and providing status updates as work progresses.

