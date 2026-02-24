import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

type TextTransformer = (text: string) => string;

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: any = null;

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  const hyphensUnderscoresToWhitespace = (text: string) => text.replace(/[\-_]/g, " ");
  const keepLettersAndWhitespace = (text: string) => text.replace(/[^a-zA-Z ]/g, "")
  const capitalise = (text: string) => 
    text.split(" ")
        .map(word => {
          word = word.toLocaleLowerCase();
          return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(" ")
  const removeExcessWhitespace = (text: string) =>
    text.split(" ")
        .filter(word => word.length !== 0)
        .join(" ")

  const transformers: TextTransformer[] = [
    hyphensUnderscoresToWhitespace,
    keepLettersAndWhitespace,
    capitalise,
    removeExcessWhitespace
  ];

  recipeName = transformers.reduce((text, transformer) => transformer(text), recipeName);

  if (recipeName.length > 0) {
    return recipeName;
  }
  
  return null;
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  // TODO: implement me
  res.status(500).send("not yet implemented!")

});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  // TODO: implement me
  res.status(500).send("not yet implemented!")

});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
