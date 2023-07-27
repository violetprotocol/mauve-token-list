import { schema } from "@uniswap/token-lists";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import mainnetsTokenList from "./mauve.tokenlist.mainnets.json";
import testnetsTokenList from "./mauve.tokenlist.testnets.json";

async function validate(tokenList) {
  const ajv = new Ajv({ allErrors: true, verbose: true });
  addFormats(ajv);
  const validator = ajv.compile(schema);
  const valid = validator(tokenList);
  if (valid) {
    return valid;
  }
  if (validator.errors) {
    throw validator.errors.map((error) => {
      delete error.data;
      return error;
    });
  }
}

validate(mainnetsTokenList)
  .then(console.log("Valid List."))
  .catch(console.error);
validate(testnetsTokenList)
  .then(console.log("Valid List."))
  .catch(console.error);
