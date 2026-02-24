import express, { Request, Response } from "express";
import z from "zod";

// ==== Type Definitions, feel free to add or modify ==========================
const requiredItemSchema = z.object({
  name: z.string(),
  quantity: z.number().min(0)
});

const recipeSchema = z.object({
  type: z.literal("recipe"),
  name: z.string(),
  requiredItems: z.array(requiredItemSchema)
});

const ingredientSchema = z.object({
  type: z.literal("ingredient"),
  name: z.string(),
  cookTime: z.number().min(0, { error: "cookTime must be greater than or equal to 0" })
});

const cookbookEntrySchema = z.discriminatedUnion("type", [recipeSchema, ingredientSchema]);

const cookbookSchema = z.array(cookbookEntrySchema);
type Cookbook = z.infer<typeof cookbookSchema>;


type TextTransformer = (text: string) => string;

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: Cookbook = [];

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
  const removeExcessWhitespace = (text: string) => text.trim().replace(/\s+/g, " ")
  const capitalise = (text: string) => text.replace(/\w+/g, (word) => {
    word = word.toLocaleLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  const transformers: TextTransformer[] = [
    hyphensUnderscoresToWhitespace,
    keepLettersAndWhitespace,
    removeExcessWhitespace,
    capitalise,
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
  const parsed = cookbookEntrySchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json(z.treeifyError(parsed.error));
  }

  const data = parsed.data;

  if (cookbook.find(entry => entry.name === data.name) !== undefined) {
    res.status(400).json({ message: "Entry name already exists." });
  }

  if (data.type === "recipe") {
    const names = data.requiredItems.map(entry => entry.name);
    const namesSet = new Set(names);

    if (names.length !== namesSet.size) {
      res.status(400).json({ message: "Required items can only have one element per name" });
    }
  }

  cookbook.push(data);

  res.status(200).json({});
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
