# LiftIQ Component Standard v1

Version: 1.0

Status: Active

----------------------------------

## Philosophy

Components are products.

Pages are compositions.

Business logic must never be coupled to visual implementation.

----------------------------------

## Component hierarchy

Design Tokens

↓

Utilities

↓

Primitives

↓

Composite Components

↓

Layouts

↓

Features

↓

Application

----------------------------------

## Component rules

A component must:

- be reusable
- be stateless whenever possible
- have a predictable API
- support theming
- support accessibility
- support future responsive layouts

----------------------------------

## Folder structure

button/

    Button.tsx

    button.types.ts

    button.variants.ts

    index.ts

Same convention for every component.

----------------------------------

## Export strategy

Never:

import Button from "./Button"

Always:

import { Button } from "@/shared/primitives/button"

Future:

import { Button } from "@/shared/ui"

----------------------------------

## Naming

PascalCase:

Button

Input

Panel

Window

HudOverlay

camelCase:

buttonVariants

buttonSizes

buttonClasses

----------------------------------

## Props order

variant

size

state props

icons

children

className

native props

Example:

<Button

variant="primary"

size="md"

loading

leftIcon={...}

className="..."

>

Login

</Button>

----------------------------------

## Variants

variant

primary

secondary

ghost

danger

Future variants may be added without breaking API.

----------------------------------

## Sizes

sm

md

lg

Future:

xl

icon

----------------------------------

## State

loading

disabled

active

selected

Future:

busy

success

error

----------------------------------

## Styling

Never concatenate strings manually.

Never:

className={`${a} ${b}`}

Always:

className={cn(...)}

----------------------------------

## Variant system

Use:

class-variance-authority

Never:

nested if statements

large switch statements

----------------------------------

## Accessibility

Support:

keyboard navigation

focus visible

aria attributes

disabled state

loading state

----------------------------------

## Business logic

Business logic belongs to:

features/

Never inside shared UI components.

----------------------------------

## Icons

Icons are passed as props.

Never hardcoded.

----------------------------------

## Colors

No component may use arbitrary design values.

Always use:

design tokens

----------------------------------

## Animation

Animation belongs to component behavior.

Timing belongs to design system.

----------------------------------

## Future compatibility

Every component should be compatible with:

Desktop

Tablet

Detached Window

Floating Window

Theme changes

Future mobile client

----------------------------------

## Principle

Changing the visual identity of LiftIQ should require changing the UI Foundation, not every page.