README
# 1.What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
getElementById("id") ==> Selects one element by id.

getElementsByClassName("class") ==> Selects multiple elements by the same className.

querySelector("selector") ==> Selects the first matching element by the tag, class or idName.

querySelectorAll("selector") ==> Selects all matching elements by tag, class or idName.

# 2.How do you create and insert a new element into the DOM?
Step-1 ==> Get the parent element

Step-2 ==> Create a child element

Step-3 ==> Add text or html into the child element (innerText/innerHTML)

Step-4 ==> Append the child element to the parent element

# 3.What is Event Bubbling? And how does it work?
Event Bubbling means if I click or start an event it starts from the target element and then its parent and like this it moves to the body and html.

# 4.What is Event Delegation in JavaScript? Why is it useful?
Event Delegation means to add an event listener to a parent element instead of multiple child elements. Thus, we can get multiple elements by using one event. It uses event bubbling technique.

It is useful Because:

=> It reduces memory usage => Reduces memory leaks => Improves Performance => Makes the code cleaner and shorter

# 5.What is the difference between preventDefault() and stopPropagation() methods?
preventDefault() ==> It stops the browser's default behavior for an event Example: Form submit, Link open.

stopPropagation() ==> Stops target event from moving to parent. It is used to stop event bubbling.