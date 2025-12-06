---
title: Reasoning
description: Features related to how the agent explains and visualizes its thought process
categoryKey: reasoning
---

# Reasoning

Reasoning capabilities help developers understand how and why an AI coding agent makes decisions, providing transparency into the agent's thought process.

## Explanation in Natural Language

This feature enables the agent to articulate its reasoning in plain English, explaining why it chose a particular approach, what alternatives it considered, and potential trade-offs.

**Why it matters:**
- Builds trust through transparency
- Helps developers learn from the agent's approach
- Makes it easier to spot flawed reasoning early

**Example:** Instead of just writing code, the agent might say: "I'm using a Map instead of an Object here because we need to preserve insertion order and the keys could be any type."

## Step-by-step View

A step-by-step view provides a structured breakdown of the agent's reasoning and actions, showing each decision point and the logic behind it.

**Why it matters:**
- Makes debugging easier when something goes wrong
- Helps identify exactly where the agent's logic diverged
- Useful for learning and improving prompts

**Implementation varies:** Some agents show this as a collapsible tree, others as a linear log. The best implementations allow you to inspect intermediate states and outputs at each step.

