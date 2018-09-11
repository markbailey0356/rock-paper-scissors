# rock-paper-scissors

## Console solution

* I wanted to see if I could implement the final game() function with the playRound() function still
  returning a string. Turns out you can, but the result is just lots of case statements.
* I couldn't resist using a for loop to run the 5 rounds, even though I'm not supposed to know them yet. I just couldn't bring myself to copy and
  paste that much code. Admittedly, it wouldn't be that much code if I didn't force myself to use
  the case statement to parse the string output from the playRound() function.
* I don't see much advantage at this point in doing a new version with more sensible return values
  and functions. I may do this when we revisit this code after we are supposed to know loops.

## UI Solution

I definitely spent longer on this than I intended to but the result is quite nice. The underlying JS code still has a
lot of messy logic and needs to be refactored with some sort of object scope to make tally variables non-global.
However, the website works and it's probably time to move on. I wanted to see what I could do with the aesthetics of the
UI, and I'm definitely pleased with the results.  

The challenging points were mainly in the UI and were as follows:

* Achieving the rounded white border around the outside to extend the height of the screen. Had to learn about how
  `height: 100%` really worked and how to get it to size the content including the border (`box-sizing: border-box`).
* Getting the new DOM messages to fade in was interesting. I just used the CSS3 `transition` property and to linearly
  change the new elements `opacity` property. I then made the element transparent (`opacity: 0`) by default, then added
  a class called `.show` to make the element opaque (`opacity: 1`). The issue was that this class needed to be added
  after the element had already been displayed by the browser in the default transparent state. Therefore, the `.show`
  class needed to be added after a short delay using a `setTimeout` call-back.
* I wanted the game frame to have a max-width and we placed with a small left margin, but I wanted it to be centered
  (`margin: 0 auto`) when the window's width got too small. I found that this could be done by setting the `min-width`
  property of the body accordingly and then setting the frame to be `margin: 0 auto`.

While reading through the chapter on [*The Document Object Model* in **Eloquent
Javascript**](http://eloquentjavascript.net/14_dom.html), I came up with an idea to get the game frame to stretch to fit
the messages as they appear. Oddly enough, this is almost the default behaviour where the element is sized to fit its
children. However, I wanted to animate the frame to gradually change the height using the CSS3 `transition` property, so
that meant that I had to set the frame's `height` property to the right value. I also wanted to dynamically determine
that property instead of hardcoding anything, so I needed to use the `offsetHeight` property of the relevent DOM
elements.

I needed to use a pretty awkward nested callback: the first to add the text element after the frame stretches, and the
second was to apply the `.show` class as described in the second point above. Seperation of concerns was important and I
wanted the `transition-duration` property in the CSS file to determine the duration; this meant that the JS had to fetch
and parse the value of that property using `window.getComputedStyle()` for calculation purposes.
