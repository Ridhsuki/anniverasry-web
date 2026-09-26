# Development Guidelines


## Principles

Follow:

- clean code
- reusable components
- TypeScript strict mode
- performance first


---

## Component Rules


Components must:

- have clear responsibility
- avoid duplicated logic
- avoid unnecessary state


---

## Animation Rules


Animation logic belongs in:

src/animations/


Do not place complex GSAP timelines directly inside JSX.


---

## Asset Rules


Do not hardcode:

- image paths
- text content
- animation values


Use:

constants
data files
typed configuration
