Objective: Develop a robust, highly-animated proof-of-concept for a number summation puzzle game using React Native and TypeScript, designed for a 3-4 day sprint.1. Core Functionality (The Sprint Focus)
Implement Core Loop: Create a functional, interactive grid where users can select contiguous numbers to form a target sum.
Contiguous Selection: Must strictly enforce and visually manage horizontal/vertical adjacency for all selected cells.
Validation & State: On a successful match, selected cells must be removed/locked, allowing the game to progress.
2. Architectural Requirements (Reusability & Scalability)
Modular Design: All primary UI elements (Grid, Cell, Target Display) must be built as reusable components using typed props (TypeScript).
Scalability Proof: The core grid component must demonstrate the ability to render any size puzzle ($N \times N$) without internal code changes, ensuring future difficulty growth (via increased size) is straightforward.
3. High-Impact Animation (Skill Test)


The assignment requires the implementation of advanced, highly-polished animations for immediate user feedback.
Selection and Input Feedback: Implement smooth, non-instantaneous transitions and visual pulses for cell selection and deselection.
Successful Match: Execute a dramatic, synchronized sequence on all matched cells—such as an exaggerated "pop and vanish" effect—to visually communicate success and removal.
Error/Invalid State: Implement an immediate, brief visual signal (e.g., a "wiggle" or "shake" animation on the selected cells) to indicate an invalid selection or failed sum check.

Game reference https://play.google.com/store/apps/details?id=com.easybrain.number.sums.puzzle

Deadline to submit - 5days
