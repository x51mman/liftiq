# LiftIQ Login Screen Specification v1

Version: 1.0
Status: Draft

---

# Purpose

The Login Screen is the first user interaction with LiftIQ.

The objective is not to create a generic login page.

The objective is to communicate:

- security
- professionalism
- operational control
- enterprise reliability

Visual language:

Enterprise ERP
+
Technical Control System
+
Futuristic HUD

Not:

Cyberpunk
Gaming UI
Marketing Landing Page

---

# Viewport Strategy

The Login Screen occupies the entire viewport.

Width: 100vw
Height: 100vh

Overflow: hidden

No page scrolling.

---

# Layer Architecture

The Login Screen consists of five layers.

Layer 5
Login Content

Layer 4
HUD Overlay

Layer 3
Gradient Overlay

Layer 2
Video Layer

Layer 1
Background Layer

---

# Layer 1: Background Layer

Purpose:

Fallback visual system.

Visible when:

- video unavailable
- reduced motion enabled
- loading state

Content:

Static background image.

Recommended themes:

- industrial systems
- control rooms
- machinery
- infrastructure
- technical environments

Not:

- cityscapes
- people
- stock office photos

Position:

fixed

Inset:

0

z-index:

0

---

# Layer 2: Video Layer

Purpose:

Subtle atmosphere.

Position:

fixed

Inset:

0

z-index:

1

Object Fit:

cover

Brightness:

55%

Playback:

autoplay
muted
loop

Future Asset:

LiftIQ cinematic loop

Motion must remain subtle.

No fast cuts.

No dramatic transitions.

---

# Layer 3: Gradient Overlay

Purpose:

Content readability.

Position:

fixed

Inset:

0

z-index:

2

Gradient:

Top:
rgba(10,15,20,0.65)

Bottom:
rgba(10,15,20,0.85)

---

# Layer 4: HUD Overlay

Purpose:

Create LiftIQ identity.

Pointer Events:

none

Position:

fixed

Inset:

0

z-index:

3

---

# HUD Grid

Opacity:

4%

Grid Size:

64px

Behavior:

static

No movement.

---

# Corner Markers

Locations:

top-left
top-right
bottom-left
bottom-right

Length:

16px

Thickness:

1px

Color:

brand.primary

Opacity:

20%

---

# Technical Labels

Examples:

AUTH
SECURE
NODE-01
ONLINE
SYS

Font:

11px

Opacity:

8%

Position:

screen edges only

---

# Coordinate Marks

Examples:

X:001
Y:064

Opacity:

5%

Decorative only.

---

# Scanner Line

Optional.

Version:

v1.1

Not required in v1.

---

# Layer 5: Login Content

Purpose:

Authentication interaction.

Position:

relative

z-index:

4

Display:

flex

Align:

center

Justify:

center

Height:

100%

---

# Login Panel

Panel Type:

Glass HUD Panel

Width:

480px

Max Width:

90vw

Min Width:

320px

Padding:

32px

Border Radius:

16px

Border:

1px solid HUD Border

Shadow:

Elevated

---

# Panel Structure

LiftIQ Logo

System Title

System Subtitle

Spacing

Username Input

Password Input

Primary Login Button

System Status Footer

---

# Logo Area

Height:

64px

Margin Bottom:

24px

Alignment:

center

---

# Title

Text:

LiftIQ

Size:

32px

Weight:

700

Alignment:

center

---

# Subtitle

Examples:

Operational Intelligence Platform

or

Enterprise Control System

Size:

14px

Weight:

400

Opacity:

70%

Alignment:

center

---

# Input Fields

Height:

40px

Spacing:

16px

Variants:

standard

Future:

password reveal

---

# Login Button

Height:

48px

Variant:

primary

Full Width:

true

Margin Top:

24px

---

# System Footer

Examples:

SECURE CONNECTION

AUTH NODE ONLINE

API CONNECTED

Font:

12px

Opacity:

60%

Alignment:

center

Margin Top:

24px

---

# Responsive Behavior

Desktop

>= 1280px

Full HUD

Full Grid

Video Enabled

---

Tablet

768px - 1279px

Reduced HUD Density

Video Optional

---

Mobile

< 768px

No Video Layer

Reduced Grid

Smaller Corner Markers

Panel Width:

95vw

---

# Motion Specification

Panel Entrance

Duration:

400ms

Animation:

fade + slight upward motion

Initial:

opacity 0
y 16

Animate:

opacity 1
y 0

---

Button Hover

Duration:

150ms

Effect:

glow-xs

---

Input Focus

Duration:

150ms

Effect:

border.active
focus-glow

---

HUD Animation

Maximum:

one active motion element

Avoid visual noise.

---

# Accessibility

Keyboard Navigable

Focus Visible

Contrast AA Minimum

Reduced Motion Support

Screen Reader Labels Required

---

# Future Extensions

MFA Screen

Forgot Password

SSO

Passkeys

Biometric Authentication

The layout should support these without redesign.

---

# Success Criteria

The Login Screen should feel:

Secure
Professional
Modern
Operational

The user should feel that they are entering
a control platform, not a generic web application.