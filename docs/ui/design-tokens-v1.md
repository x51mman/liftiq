LiftIQ Design Token Specification v1
Design Philosophy

Enterprise First, Futuristic Second

A LiftIQ célja nem egy cyberpunk demó, hanem egy professzionális ERP rendszer, amely modern, futurisztikus és technikai hangulatot sugároz anélkül, hogy fárasztaná a felhasználót.

Color Tokens
Base Colors
background.primary    #0A0F14
background.secondary  #0F172A
background.tertiary   #111827

Felhasználás:

app háttér
login háttér
desktop workspace
Surface Colors
surface.primary       #111827
surface.secondary     #172030
surface.elevated      #1E293B

Felhasználás:

panelek
kártyák
floating windows
Border Colors
border.default        #243041
border.soft           #1B2433
border.active         #38BDF8
Brand Colors
brand.primary         #38BDF8
brand.secondary       #22D3EE
brand.highlight       #67E8F9
Semantic Colors
success               #22C55E
warning               #F59E0B
danger                #EF4444
info                  #38BDF8

Typography Tokens
Font Family
font.family.primary = Geist Variable
Font Weights
font.weight.light      300
font.weight.regular    400
font.weight.medium     500
font.weight.semibold   600
font.weight.bold       700
Font Sizes
font.size.xs    12px
font.size.sm    14px
font.size.md    16px
font.size.lg    20px
font.size.xl    24px
font.size.2xl   32px
HUD Typography
hud.label       12px
hud.metric      24px
hud.title       14px
hud.system      11px
Spacing Tokens

8px alapú rendszer.

space.1   4px
space.2   8px
space.3   12px
space.4   16px
space.5   20px
space.6   24px
space.8   32px
space.10  40px
space.12  48px
space.16  64px
Radius Tokens
radius.sm   8px
radius.md   12px
radius.lg   16px
radius.xl   20px
radius.2xl  24px
Border Tokens
Standard
1px solid border.default
Active
1px solid brand.primary
HUD
1px solid rgba(56,189,248,0.25)
Shadow Tokens
Soft
0 4px 12px rgba(0,0,0,0.25)
Elevated
0 8px 24px rgba(0,0,0,0.35)
Floating Window
0 16px 48px rgba(0,0,0,0.45)
Glow Tokens
Glow XS

Hover.

0 0 4px rgba(56,189,248,0.20)
Glow SM

Interactive.

0 0 8px rgba(56,189,248,0.25)
Glow MD

HUD.

0 0 16px rgba(56,189,248,0.30)

Glow LG

Critical focus.

0 0 24px rgba(56,189,248,0.40)
Motion Tokens
Timing
motion.fast      150ms
motion.normal    250ms
motion.slow      400ms
motion.xslow     600ms
Easing
ease.standard
ease.decelerate
ease.accelerate

Később Framer Motion presetek készülnek rá.

Focus Tokens

Ez ERP-nél kritikus.

Focus Ring
2px solid brand.primary
Focus Glow
0 0 12px rgba(56,189,248,0.35)
Button Tokens
Heights
button.sm   32px
button.md   40px
button.lg   48px
Variants
primary
secondary
ghost
danger
hud
Input Tokens
Height
40px
Background
surface.primary
Border
border.default
Focus
border.active
+ focus glow
Panel Tokens
Standard Panel
surface.primary
radius.lg
shadow.soft
HUD Panel
surface.secondary
border.hud
glow.sm
Window Panel
surface.elevated
shadow.floating
radius.xl
HUD Tokens
Grid Layer
opacity 0.04
size 64px
Scanner Layer
duration 24s
opacity 0.05
Coordinate Marks
opacity 0.08
font.size 11px
Corner Markers
length 16px
thickness 1px

Login Screen Tokens
Background
brightness 0.55
contrast 1.05
Overlay
linear-gradient(
  rgba(10,15,20,0.65),
  rgba(10,15,20,0.85)
)
Login Panel Width
480px
Login Panel Max Width
90vw
Responsive Strategy
Mobile
Single column
No floating windows
No side rail
Tablet
Collapsible navigation
Desktop
Full HUD
Full workspace
Future floating windows



