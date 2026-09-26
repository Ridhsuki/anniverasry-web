# Animation System Specification


## Philosophy

Animation should communicate emotion.

Style:

- slow
- cinematic
- organic
- elegant


---

# Animation Categories


## Entrance Animation

Used when:

- scene appears
- object enters


Properties:

opacity
transform
scale


---

## Floating Animation

Used for:

- particles
- flowers
- decorations


Rules:

- infinite loop
- subtle movement
- low frequency


---

## Reveal Animation

Used for:

- letters
- photographs
- cards


Behavior:

- gradual appearance
- physical object feeling



---

# Technical Rules


Preferred:

- transform
- opacity


Avoid:

- layout changes
- expensive repaint


GSAP is the primary animation engine.
