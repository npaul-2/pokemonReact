# Checkpoint questions

## Checkpoint 0
What file is acting as your “main screen” right now?
All the content is on the index.tsx file

What is state here, and what does it control?
pokemonName is using state so the program can access the name form the state

## Checkpoint 1
What happens when fetch receives a non-200 response?
Fetch doesn’t throw errors for non-200 errors unless we check with .ok 

Why shouldn’t we assume the response JSON always has the fields we want?
It’s possible the data object the JSON is referencing is invalid/undefined

## Checkpoint 2
Where does “app truth” live right now?
It lives in the component state, not the api

What bug happens if you forget to set loading=false on failure?
The page loads forever

## Checkpoint 3
What is the difference between rendering raw JSON vs. rendering a shaped object?
The raw data is just everything from the api as a string, the shaped objects are individual fields like attributes

Which part of the file is UI responsibility vs. logic responsibility?
The main part handleSearch function handles the logic, and the return portion of the function and the stylesheet handles the UI with components like view, text, etc 

## Checkpoint 4
List 3 different responsibilities currently inside index.tsx.
Network logic like calling the API, fetch calling, and handling the JSON response
ui layout,
state mangaement/logic.

If you wanted to reuse the Pokémon API logic in another screen, what would you do?
Make another file and move logic there, or make a hook so other pages can use it

If you wanted to test the API parsing logic, how would you do it right now?
Would have to manually type pokemon names in the website simulator, cant test the function by itself
## Checkpoint 5
Why is it a win that the service doesn’t import React?
The new file doesn’t need react to work in other projects or to test its functionality 

What is the contract of the service function (inputs/outputs/errors)?
It takes and pokemon name and returns a shaped object containing what we want(type, abilities, etc) from the matching JSON data
It also throws errors appropriately(name mismatch)

## Checkpoint 7
What does a builder pattern buy you here?
More separation of components for clarity 

In what way is a model safer than raw API JSON?
We can make fix things/make changes in a single location(the builder) instead of on every instance of raw JSON being used

## Checkpoint 8
What responsibilities does the controller own?
The controller handles input validation, state logic, calling the api and storing the model

Why is the controller a better place for input validation than the view?
Helps keep things separate for ease of reading/testing/making changes

## Checkpoint 9
What props does the view need?
It needs the pokemon model, the pokemonName input, the loading and error states, the setPokemonName function and the onSearch function

What would break if the view tried to call the API directly?
The view is just for viewing results, calling the API is the controllers job. If the view called the API it could override the controller and break the output

## Checkpoint 10
Why should favorites live in the controller and not the view?
The view should only handle displaying items, not storing data

What does “derived state” mean for isFavorite?
The derived state is based on the existing state and not being stored in a useState.
Without it the favorites would desync when you search for another pokemon.

## Checkpoint 11
Why is persistence implemented as a service?
Since it's a service we just need to call it instead of setting up a storage ourselves

What is the difference between “state” and “persisted state”?
persistied state stores to hard device storage, not to working memory/ram like a normal state

## Checkpoint 12
Why does this animation belong in the view layer?
View handles visuals, animation is just visual. It makes sence to use it as part of an existing view.

What triggers the animation and why?
The useEffect hook triggers it in the view after it sees that the pokemon object has changed

