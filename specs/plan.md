# Message Input Character Counter

## Application Overview

The Multi-Agent Custom Automation Engine web app exposes a Multi-Agent Planner landing page with a "How can I help?" prompt textbox. Directly beneath the textbox is a visible character counter of the form "N/5000" that must always reflect the current length of the text in the textbox. This plan covers exactly one test that verifies the counter stays in sync with the textbox content across empty, short, longer, and cleared states.

## Test Scenarios

### 1. Message input character counter

**Seed:** `e2e/seed.spec.ts`

#### 1.1. character counter reflects typed message length

**File:** `e2e/message-input/character-counter-reflects-typed-message.spec.ts`

**Steps:**
  1. Navigate to the app root URL '/' (https://app-mv403b4qbg.azurewebsites.net/) and wait for the Multi-Agent Planner landing view to finish loading (heading 'How can I help?' visible and the team configuration progress bar gone).
    - expect: The page title is 'Multi-Agent - Custom Automation Engine'.
    - expect: The heading 'How can I help?' is visible.
    - expect: The prompt textbox with placeholder 'Tell us what needs planning, building, or connecting—we'll handle the rest.' is visible and empty.
  2. Locate the main prompt textbox via getByRole('textbox', { name: /Tell us what needs planning/i }) and locate the character counter element rendered next to it (the element whose text matches the pattern /^\\d+\\/5000$/).
    - expect: The textbox is found and has an empty value.
    - expect: The character counter element is visible and its text is exactly '0/5000'.
  3. Assert the initial state of the counter before any input, without focusing or interacting with the textbox.
    - expect: The textbox value length is 0.
    - expect: The character counter reads '0/5000', matching the textbox length.
  4. Click the textbox to focus it, then type the short string 'Hi' (2 characters) using keyboard input so the input event fires.
    - expect: The textbox value is 'Hi'.
    - expect: The character counter updates to '2/5000', matching the current textbox length.
  5. Append additional text to the textbox so it contains a longer string, e.g. type ' there, please plan my week.' after the existing content, producing a total value of 'Hi there, please plan my week.' (30 characters).
    - expect: The textbox value is 'Hi there, please plan my week.'.
    - expect: The character counter updates to '30/5000', exactly matching the textbox value length.
  6. Clear the textbox completely (e.g. select all with Ctrl+A then press Backspace, or call fill('') on the textbox) so it returns to an empty state.
    - expect: The textbox value is an empty string.
    - expect: The character counter returns to its initial value '0/5000', matching the empty textbox length.
