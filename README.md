# Assigment

---

## Installation

- Install needed dependencies with `npm i`
- Run `npm run start` to compile and run the code
- View the result logged to the console with `app.printOrg()` (assumed the created app instance named `app`)

---

In the source (`index.ts`), i already put the result after each action.

**Summary**:

- Initailly:

```
-Mark Zuckerberg
  -Sarah Donald
    -Cassandra Reynolds
      -Mary Blue
      -Bob Saget
        -Tina Teff
          -Will Turner
  -Tyler Simpson
    -Harry Tobs
      -Thomas Brown
    -George Carrey
    -Gary Styles
  -Bruce Willis
  -Georgina Flangy
    -Sophie Turner
```

- Move `Bob Saget` &rarr; `Tyler Simpson`: All the subordinates of `Bob Saget` will be carried over to the current supervisor of `Bob Saget` (which is `Cassandra Reynolds`), and `Bob Saget` become one of the subordinates of `Tyler Simpson`

```
-Mark Zuckerberg
  -Sarah Donald
    -Cassandra Reynolds
      -Mary Blue
      -Bob Saget
      -Tina Teff
        -Will Turner
  -Tyler Simpson
    -Harry Tobs
      -Thomas Brown
    -George Carrey
    -Gary Styles
    -Bob Saget
  -Bruce Willis
  -Georgina Flangy
    -Sophie Turner
```

- Oops, didn't mean that? Undo this action

```
-Mark Zuckerberg
  -Sarah Donald
    -Cassandra Reynolds
      -Mary Blue
      -Bob Saget
        -Tina Teff
          -Will Turner
  -Tyler Simpson
    -Harry Tobs
      -Thomas Brown
    -George Carrey
    -Gary Styles
  -Bruce Willis
  -Georgina Flangy
    -Sophie Turner
```

- Wait, actually, that was correct. Redo the action then

```
-Mark Zuckerberg
  -Sarah Donald
    -Cassandra Reynolds
      -Mary Blue
      -Bob Saget
      -Tina Teff
        -Will Turner
  -Tyler Simpson
    -Harry Tobs
      -Thomas Brown
    -George Carrey
    -Gary Styles
    -Bob Saget
  -Bruce Willis
  -Georgina Flangy
    -Sophie Turner
```
